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
  export type ChangeSet = {
    id: string;
  };
}
export type Type = $.OSMPBF.ChangeSet;

export function getDefaultValue(): $.OSMPBF.ChangeSet {
  return {
    id: "0",
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.ChangeSet>,
): $.OSMPBF.ChangeSet {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.ChangeSet): unknown {
  const result: any = {};
  if (value.id !== undefined) result.id = tsValueToJsonValueFns.int64(value.id);
  return result;
}

export function decodeJson(value: any): $.OSMPBF.ChangeSet {
  const result = getDefaultValue();
  if (value.id !== undefined) result.id = jsonValueToTsValueFns.int64(value.id);
  return result;
}

export function encodeBinary(value: $.OSMPBF.ChangeSet): Uint8Array {
  const result: WireMessage = [];
  if (value.id !== undefined) {
    const tsValue = value.id;
    result.push(
      [1, tsValueToWireValueFns.int64(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.ChangeSet {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  field: {
    const wireValue = wireFields.get(1);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int64(wireValue);
    if (value === undefined) break field;
    result.id = value;
  }
  return result;
}
