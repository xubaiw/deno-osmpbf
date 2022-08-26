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
  export type StringTable = {
    s: Uint8Array[];
  };
}
export type Type = $.OSMPBF.StringTable;

export function getDefaultValue(): $.OSMPBF.StringTable {
  return {
    s: [],
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.StringTable>,
): $.OSMPBF.StringTable {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.StringTable): unknown {
  const result: any = {};
  result.s = value.s.map((value) => tsValueToJsonValueFns.bytes(value));
  return result;
}

export function decodeJson(value: any): $.OSMPBF.StringTable {
  const result = getDefaultValue();
  result.s = value.s?.map((value: any) => jsonValueToTsValueFns.bytes(value)) ??
    [];
  return result;
}

export function encodeBinary(value: $.OSMPBF.StringTable): Uint8Array {
  const result: WireMessage = [];
  for (const tsValue of value.s) {
    result.push(
      [1, tsValueToWireValueFns.bytes(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.StringTable {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 1)
      .map(([, wireValue]) => wireValue);
    const value = wireValues.map((wireValue) =>
      wireValueToTsValueFns.bytes(wireValue)
    ).filter((x) => x !== undefined);
    if (!value.length) break collection;
    result.s = value as any;
  }
  return result;
}
