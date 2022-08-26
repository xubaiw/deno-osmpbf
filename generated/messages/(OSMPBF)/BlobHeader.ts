import {
  jsonValueToTsValueFns,
  tsValueToJsonValueFns,
} from "../../runtime/json/scalar.ts";
import { WireMessage } from "../../runtime/wire/index.ts";
import { default as serialize } from "../../runtime/wire/serialize.ts";
import {
  tsValueToWireValueFns,
  wireValueToTsValueFns,
} from "../../runtime/wire/scalar.ts";
import { default as deserialize } from "../../runtime/wire/deserialize.ts";

export declare namespace $.OSMPBF {
  export type BlobHeader = {
    type: string;
    indexdata?: Uint8Array;
    datasize: number;
  };
}
export type Type = $.OSMPBF.BlobHeader;

export function getDefaultValue(): $.OSMPBF.BlobHeader {
  return {
    type: "",
    indexdata: new Uint8Array(),
    datasize: 0,
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.BlobHeader>,
): $.OSMPBF.BlobHeader {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.BlobHeader): unknown {
  const result: any = {};
  if (value.type !== undefined) {
    result.type = tsValueToJsonValueFns.string(value.type);
  }
  if (value.indexdata !== undefined) {
    result.indexdata = tsValueToJsonValueFns.bytes(value.indexdata);
  }
  if (value.datasize !== undefined) {
    result.datasize = tsValueToJsonValueFns.int32(value.datasize);
  }
  return result;
}

export function decodeJson(value: any): $.OSMPBF.BlobHeader {
  const result = getDefaultValue();
  if (value.type !== undefined) {
    result.type = jsonValueToTsValueFns.string(value.type);
  }
  if (value.indexdata !== undefined) {
    result.indexdata = jsonValueToTsValueFns.bytes(value.indexdata);
  }
  if (value.datasize !== undefined) {
    result.datasize = jsonValueToTsValueFns.int32(value.datasize);
  }
  return result;
}

export function encodeBinary(value: $.OSMPBF.BlobHeader): Uint8Array {
  const result: WireMessage = [];
  if (value.type !== undefined) {
    const tsValue = value.type;
    result.push(
      [1, tsValueToWireValueFns.string(tsValue)],
    );
  }
  if (value.indexdata !== undefined) {
    const tsValue = value.indexdata;
    result.push(
      [2, tsValueToWireValueFns.bytes(tsValue)],
    );
  }
  if (value.datasize !== undefined) {
    const tsValue = value.datasize;
    result.push(
      [3, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.BlobHeader {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  field: {
    const wireValue = wireFields.get(1);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.string(wireValue);
    if (value === undefined) break field;
    result.type = value;
  }
  field: {
    const wireValue = wireFields.get(2);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.bytes(wireValue);
    if (value === undefined) break field;
    result.indexdata = value;
  }
  field: {
    const wireValue = wireFields.get(3);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int32(wireValue);
    if (value === undefined) break field;
    result.datasize = value;
  }
  return result;
}
