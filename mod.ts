import {
  decodeBinary as decodeBlobHeader,
} from "./generated/messages/(OSMPBF)/BlobHeader.ts";
import {
  decodeBinary as decodeBlobBody,
} from "./generated/messages/(OSMPBF)/Blob.ts";
import { AsyncQueue } from "https://deno.land/x/for_awaitable_queue@1.0.0/mod.ts";
import { OsmBlob, OsmBlock, Res } from "./types.ts";

/** The buffer to reuse for reading blob header size (4 byte). */
const SIZE_BUF = new Uint8Array(4);

/** The entry function of this module. */
export async function read(path: string): Promise<Reader> {
  const file = await Deno.open(path);
  const blobs = {
    async *[Symbol.asyncIterator]() {
      while (true) {
        const blob = await readBlob(file);
        if (!blob) break;
        yield blob;
      }
    },
  };
  return {
    file,
    blobs,
    blocks: {
      async *[Symbol.asyncIterator]() {
        // init queues
        const qBlob = new AsyncQueue<OsmBlob>();
        const qBlock = new AsyncQueue<OsmBlock | null>();
        const qWorker = new AsyncQueue<Worker>();
        // init web workers
        for (let i = 0; i < navigator.hardwareConcurrency - 1; i++) {
          const worker = new Worker(import.meta.resolve("./worker.ts"), {
            type: "module",
          });
          worker.onmessage = (e: MessageEvent<Res>) => {
            switch (e.data.type) {
              case "close":
                // end of block
                qBlock.close();
                break;
              case "block":
                qBlock.push(e.data.block);
            }
            // requeue self
            qWorker.push(worker);
          };
          // initial queue
          qWorker.push(worker);
        }
        const push = async () => {
          for await (const blob of blobs) {
            qBlob.push(blob);
          }
          // on push end, close blob
          qBlob.close();
        };
        push();
        const schedule = async () => {
          w:
          for await (const worker of qWorker) {
            for await (const blob of qBlob) {
              // transfer for better performance
              const transfer: Transferable[] = [];
              if (blob.header.indexdata) {
                transfer.push(blob.header.indexdata.buffer);
              }
              if (blob.body.data?.value) {
                transfer.push(blob.body.data.value.buffer);
              }
              worker.postMessage({ type: "blob", blob }, transfer);
              // wait for new worker
              continue w;
            }
            // no more blob, terminate workers
            worker.terminate();
          }
        };
        schedule();
        // handle block
        for await (const block of qBlock) {
          if (!block) continue;
          if ("primitivegroup" in block) yield block;
        }
      },
    },
  };
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
