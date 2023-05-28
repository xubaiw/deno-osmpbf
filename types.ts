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

export type Req =
  | { type: "close" }
  | { type: "blob"; blob: OsmBlob }

export type Res =
  | { type: "close" }
  | { type: "block"; block: OsmBlock };

export type OsmBlob = {
  header: OsmBlobHeader;
  body: OsmBlobBody;
};

export type OsmBlock = OsmPrimitiveBlock | OsmHeaderBlock;
