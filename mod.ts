import {
  decodeBinary as decodeBlobHeader,
  Type as BlobHeader,
} from "./generated/messages/(OSMPBF)/BlobHeader.ts";
import {
  decodeBinary as decodeBlobBody,
  Type as BlobBody,
} from "./generated/messages/(OSMPBF)/Blob.ts";
import {
  decodeBinary as decodeHeaderBlock,
  Type as HeaderBlock,
} from "./generated/messages/(OSMPBF)/HeaderBlock.ts";
import {
  decodeBinary as decodePrimitiveBlock,
  Type as PrimitiveBlock,
} from "./generated/messages/(OSMPBF)/PrimitiveBlock.ts";
import { Foras, unzlib } from "https://deno.land/x/foras@2.0.8/src/deno/mod.ts";

await Foras.initBundledOnce();

const SIZE_BUF = new Uint8Array(4);

export async function read(path: string): Promise<Reader> {
  const file = await Deno.open(path);
  return {
    file,
    blobs: {
      async *[Symbol.asyncIterator]() {
        while (true) {
          const blob = await readBlob(file);
          if (!blob) break;
          yield blob;
        }
      },
    },
  };
}

type Reader = {
  file: Deno.FsFile;
  blobs: AsyncIterable<Blob>;
};

async function readBlobHeaderSize(f: Deno.FsFile) {
  const n = await f.read(SIZE_BUF);
  if (!n) return null;
  const view = new DataView(SIZE_BUF.buffer);
  const size = view.getInt32(0, false);
  return size;
}

async function readBlobHeader(f: Deno.FsFile) {
  const size = await readBlobHeaderSize(f);
  if (!size) return null;
  const buf = new Uint8Array(size);
  await f.read(buf);
  const header = decodeBlobHeader(buf);
  return header;
}

async function readBlob(f: Deno.FsFile): Promise<Blob | null> {
  const header = await readBlobHeader(f);
  if (!header) return null;
  const buf = new Uint8Array(header.datasize);
  await f.read(buf);
  const body = decodeBlobBody(buf);
  return { header, body };
}

type Blob = { header: BlobHeader; body: BlobBody };

export function decodeBlob(blob: Blob): HeaderBlock | PrimitiveBlock | null {
  let data = blob.body.data?.value;
  if (!data) throw new Error("No data");
  // uncompress
  switch (blob.body.data?.field) {
    case "raw":
      break;
    case "zlibData":
      data = unzlib(data);
      break;
    default:
      return null;
  }
  switch (blob.header.type) {
    case "OSMHeader":
      return decodeHeaderBlock(data);
    case "OSMData":
      return decodePrimitiveBlock(data);
    default:
      return null;
  }
}
