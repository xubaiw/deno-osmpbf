/// <reference lib="webworker" />

import { Foras, unzlib } from "https://deno.land/x/foras@2.0.8/src/deno/mod.ts";
import {
  decodeBinary as decodeHeaderBlock,
} from "./generated/messages/(OSMPBF)/HeaderBlock.ts";
import {
  decodeBinary as decodePrimitiveBlock,
} from "./generated/messages/(OSMPBF)/PrimitiveBlock.ts";
import { OsmBlob, OsmBlock, Req } from "./types.ts";

// init foras wasm
await Foras.initBundledOnce();

// handle postMessage
self.onmessage = (e: MessageEvent<Req>) => {
  const data = e.data;
  switch (data.type) {
    case "close":
      self.postMessage({ type: "close" });
      break;
    case "blob": {
      const block = decodeBlob(data.blob);
      self.postMessage({ type: "block", block });
    }
  }
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
