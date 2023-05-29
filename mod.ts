import {
  decodeBinary as decodeBlobHeader,
} from "./generated/messages/(OSMPBF)/BlobHeader.ts";
import {
  decodeBinary as decodeBlobBody,
} from "./generated/messages/(OSMPBF)/Blob.ts";
import { AsyncQueue } from "https://deno.land/x/for_awaitable_queue@1.0.0/mod.ts";
import { mkBlobTransfer, OsmBlob, OsmBlock } from "./shared.ts";

/** The buffer to reuse for reading blob header size (4 byte). */
const SIZE_BUF = new Uint8Array(4);

/** The entry function of this module. */
export async function read(path: string): Promise<Reader> {
  const file = await Deno.open(path);
  const blobs = generateBlobs(file);
  const blocks = generateBlocks(blobs);
  return { file, blobs, blocks };
}

async function* generateBlobs(file: Deno.FsFile) {
  while (true) {
    const blob = await readBlob(file);
    if (!blob) break;
    yield blob;
  }
}

async function* generateBlocks(blobs: AsyncIterable<OsmBlob>) {
  // init queues
  const qBlock = new AsyncQueue<OsmBlock>();
  const qWorker = new AsyncQueue<Worker>();
  let blobFinished = false;
  const scheduleMap = new Map<Worker, boolean>();
  // init web workers
  for (let i = 0; i < navigator.hardwareConcurrency - 1; i++) {
    const worker = new Worker(import.meta.resolve("./worker.ts"), {
      type: "module",
    });
    scheduleMap.set(worker, false);
    worker.onmessage = (e: MessageEvent<OsmBlock | null>) => {
      // queue worker result
      if (e.data) qBlock.push(e.data);
      scheduleMap.set(worker, false);
      // requeue self
      qWorker.push(worker);
      // when no more blob and no worker in schedule => all block is done
      if (blobFinished && mapValueAll(scheduleMap, false)) qBlock.close();
    };
    // initial queue
    qWorker.push(worker);
  }
  // schedule
  const schedule = async () => {
    for await (const worker of qWorker) {
      const blobResult = await blobs[Symbol.asyncIterator]().next();
      if (blobResult.done) {
        // no more blob, set finish flag and terminate workers
        blobFinished = true;
        worker.terminate();
      } else {
        // send data to worker
        scheduleMap.set(worker, true);
        const blob = blobResult.value;
        worker.postMessage(blob, mkBlobTransfer(blob));
      }
    }
  };
  schedule();
  // redirect qBlock
  yield* qBlock;
}

type Reader = {
  file: Deno.FsFile;
  blobs: AsyncIterable<OsmBlob>;
  blocks: AsyncIterable<OsmBlock>;
};

/** Utility function for reading blob header size. */
async function readBlobHeaderSize(f: Deno.FsFile) {
  const n = await f.read(SIZE_BUF);
  if (!n) return null;
  const view = new DataView(SIZE_BUF.buffer);
  const size = view.getInt32(0, false);
  return size;
}

/** Utility function for reading blob header. */
async function readBlobHeader(f: Deno.FsFile) {
  const size = await readBlobHeaderSize(f);
  if (!size) return null;
  const buf = new Uint8Array(size);
  await f.read(buf);
  const header = decodeBlobHeader(buf);
  return header;
}

/** Utility function for reading blob header and body. */
async function readBlob(f: Deno.FsFile): Promise<OsmBlob | null> {
  const header = await readBlobHeader(f);
  if (!header) return null;
  const buf = new Uint8Array(header.datasize);
  await f.read(buf);
  const body = decodeBlobBody(buf);
  return { header, body };
}

function mapValueAll<T>(map: Map<unknown, T>, value: T) {
  for (const x of map.values()) {
    if (x !== value) return false;
  }
  return true;
}
