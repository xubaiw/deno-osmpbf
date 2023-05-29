import {
  Type as OsmHeaderBlock,
} from "./generated/messages/(OSMPBF)/HeaderBlock.ts";
import {
  Type as OsmPrimitiveBlock,
} from "./generated/messages/(OSMPBF)/PrimitiveBlock.ts";
import {
  Type as OsmBlobHeader,
} from "./generated/messages/(OSMPBF)/BlobHeader.ts";
import { Type as OsmBlobBody } from "./generated/messages/(OSMPBF)/Blob.ts";

export type OsmBlob = {
  header: OsmBlobHeader;
  body: OsmBlobBody;
};

export type OsmBlock = OsmPrimitiveBlock | OsmHeaderBlock;

/**
 * HACK: deno's SharedArrayBuffer support is incomplete
 * <https://github.com/denoland/deno/issues/14988> and
 * <https://github.com/denoland/deno/issues/12678>
 */
export function mkBlobTransfer(blob: OsmBlob): Transferable[] {
  const buf = blob.body.data?.value.buffer;
  if (buf && buf.byteLength > 0) {
    return [buf];
  }
  return [];
}
