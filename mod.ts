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
  Type as HeaderBlock
} from "./generated/messages/(OSMPBF)/HeaderBlock.ts";
import {
  decodeBinary as decodePrimitiveBlock,
  Type as PrimitiveBlock
} from "./generated/messages/(OSMPBF)/PrimitiveBlock.ts"
import { unzlib } from "https://deno.land/x/denoflate@1.2.1/mod.ts";

export class Blob {
  header: BlobHeader;
  body: BlobBody;
  constructor(header: BlobHeader, body: BlobBody) {
    this.header = header;
    this.body = body;
  }
  get block(): HeaderBlock | PrimitiveBlock {
    let data = this.body.data?.value;
    if (!data) throw new Error("No data");
    // uncompress
    switch (this.body.data?.field) {
      case "raw":
        break;
      case "zlibData":
        data = unzlib(data);
        break;
      default:
        throw new Error(`Unimplemented compress type \`${this.body.data?.field}\``);
    }
    switch (this.header.type) {
      case "OSMHeader":
        return decodeHeaderBlock(data);
      case "OSMData":
        return decodePrimitiveBlock(data);
      default:
        throw new Error(`Unexpected blob type \`${this.header.type}\``);
    }
  }
}

export class Reader {
  file: Deno.FsFile;
  private constructor(file: Deno.FsFile) {
    this.file = file;
  }
  static async fromPath(path: string | URL) {
    const file = await Deno.open(path);
    return new Reader(file);
  }
  async *[Symbol.asyncIterator]() {
    while (true) {
      const blob = await this.readBlob();
      if (!blob) break;
      yield blob;      
    }
  }
  private async readBytes(size: number): Promise<Uint8Array | null> {
    const array8 = new Uint8Array(size);
    const n = await this.file.read(array8);
    if (!n) return null;
    return array8;
  }
  private async readHeaderSize(): Promise<number | null> {
    const array8 = await this.readBytes(4);
    if (!array8) return null;
    const view = new DataView(array8.buffer);
    const size = view.getUint32(0, false);
    return size;
  }
  private async readHeader(): Promise<BlobHeader | null> {
    const size = await this.readHeaderSize();
    if (!size) return null;
    const array8 = await this.readBytes(size);
    if (!array8) return null;
    const header = decodeBlobHeader(array8);
    return header;
  }
  private async readBlob(): Promise<Blob | null> {
    const header = await this.readHeader();
    if (!header) return null;
    const array8 = await this.readBytes(header.datasize);
    if (!array8) return null;
    const body = decodeBlobBody(array8);
    return new Blob(header, body);
  }
}

