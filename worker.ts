/// <reference lib="webworker" />

import {
  decodeBinary as decodeHeaderBlock,
} from "./generated/messages/(OSMPBF)/HeaderBlock.ts";
import {
  decodeBinary as decodePrimitiveBlock,
} from "./generated/messages/(OSMPBF)/PrimitiveBlock.ts";
import { OsmBlob, OsmBlock, mkBlobTransfer } from "./shared.ts";
import { unzlib } from "./unzlib.ts"

// handle postMessage
self.onmessage = (e: MessageEvent<OsmBlob>) => {
  const block = decodeBlob(e.data);
  self.postMessage(block, mkBlobTransfer(e.data));
};

/** Decode blob buffer into block structure. */
function decodeBlob(blob: OsmBlob): OsmBlock | null {
  let data = blob.body.data?.value;
  if (!data) return null;
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
