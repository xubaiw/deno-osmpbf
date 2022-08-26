import {
  decodeBinary as decodeBinary_1,
  decodeJson as decodeJson_1,
  encodeBinary as encodeBinary_1,
  encodeJson as encodeJson_1,
  Type as StringTable,
} from "./StringTable.ts";
import {
  decodeBinary as decodeBinary_2,
  decodeJson as decodeJson_2,
  encodeBinary as encodeBinary_2,
  encodeJson as encodeJson_2,
  Type as PrimitiveGroup,
} from "./PrimitiveGroup.ts";
import {
  jsonValueToTsValueFns,
  tsValueToJsonValueFns,
} from "../../runtime/json/scalar.ts";
import { WireMessage, WireType } from "../../runtime/wire/index.ts";
import { default as serialize } from "../../runtime/wire/serialize.ts";
import {
  tsValueToWireValueFns,
  wireValueToTsValueFns,
} from "../../runtime/wire/scalar.ts";
import { default as deserialize } from "../../runtime/wire/deserialize.ts";

export declare namespace $.OSMPBF {
  export type PrimitiveBlock = {
    stringtable?: StringTable;
    primitivegroup: PrimitiveGroup[];
    granularity?: number;
    dateGranularity?: number;
    latOffset?: string;
    lonOffset?: string;
  };
}
export type Type = $.OSMPBF.PrimitiveBlock;

export function getDefaultValue(): $.OSMPBF.PrimitiveBlock {
  return {
    stringtable: undefined,
    primitivegroup: [],
    granularity: 0,
    dateGranularity: 0,
    latOffset: "0",
    lonOffset: "0",
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.PrimitiveBlock>,
): $.OSMPBF.PrimitiveBlock {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.PrimitiveBlock): unknown {
  const result: any = {};
  if (value.stringtable !== undefined) {
    result.stringtable = encodeJson_1(value.stringtable);
  }
  result.primitivegroup = value.primitivegroup.map((value) =>
    encodeJson_2(value)
  );
  if (value.granularity !== undefined) {
    result.granularity = tsValueToJsonValueFns.int32(value.granularity);
  }
  if (value.dateGranularity !== undefined) {
    result.dateGranularity = tsValueToJsonValueFns.int32(value.dateGranularity);
  }
  if (value.latOffset !== undefined) {
    result.latOffset = tsValueToJsonValueFns.int64(value.latOffset);
  }
  if (value.lonOffset !== undefined) {
    result.lonOffset = tsValueToJsonValueFns.int64(value.lonOffset);
  }
  return result;
}

export function decodeJson(value: any): $.OSMPBF.PrimitiveBlock {
  const result = getDefaultValue();
  if (value.stringtable !== undefined) {
    result.stringtable = decodeJson_1(value.stringtable);
  }
  result.primitivegroup =
    value.primitivegroup?.map((value: any) => decodeJson_2(value)) ?? [];
  if (value.granularity !== undefined) {
    result.granularity = jsonValueToTsValueFns.int32(value.granularity);
  }
  if (value.dateGranularity !== undefined) {
    result.dateGranularity = jsonValueToTsValueFns.int32(value.dateGranularity);
  }
  if (value.latOffset !== undefined) {
    result.latOffset = jsonValueToTsValueFns.int64(value.latOffset);
  }
  if (value.lonOffset !== undefined) {
    result.lonOffset = jsonValueToTsValueFns.int64(value.lonOffset);
  }
  return result;
}

export function encodeBinary(value: $.OSMPBF.PrimitiveBlock): Uint8Array {
  const result: WireMessage = [];
  if (value.stringtable !== undefined) {
    const tsValue = value.stringtable;
    result.push(
      [1, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_1(tsValue),
      }],
    );
  }
  for (const tsValue of value.primitivegroup) {
    result.push(
      [2, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_2(tsValue),
      }],
    );
  }
  if (value.granularity !== undefined) {
    const tsValue = value.granularity;
    result.push(
      [17, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  if (value.dateGranularity !== undefined) {
    const tsValue = value.dateGranularity;
    result.push(
      [18, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  if (value.latOffset !== undefined) {
    const tsValue = value.latOffset;
    result.push(
      [19, tsValueToWireValueFns.int64(tsValue)],
    );
  }
  if (value.lonOffset !== undefined) {
    const tsValue = value.lonOffset;
    result.push(
      [20, tsValueToWireValueFns.int64(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.PrimitiveBlock {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  field: {
    const wireValue = wireFields.get(1);
    if (wireValue === undefined) break field;
    const value = wireValue.type === WireType.LengthDelimited
      ? decodeBinary_1(wireValue.value)
      : undefined;
    if (value === undefined) break field;
    result.stringtable = value;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 2)
      .map(([, wireValue]) => wireValue);
    const value = wireValues.map((wireValue) =>
      wireValue.type === WireType.LengthDelimited
        ? decodeBinary_2(wireValue.value)
        : undefined
    ).filter((x) => x !== undefined);
    if (!value.length) break collection;
    result.primitivegroup = value as any;
  }
  field: {
    const wireValue = wireFields.get(17);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int32(wireValue);
    if (value === undefined) break field;
    result.granularity = value;
  }
  field: {
    const wireValue = wireFields.get(18);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int32(wireValue);
    if (value === undefined) break field;
    result.dateGranularity = value;
  }
  field: {
    const wireValue = wireFields.get(19);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int64(wireValue);
    if (value === undefined) break field;
    result.latOffset = value;
  }
  field: {
    const wireValue = wireFields.get(20);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int64(wireValue);
    if (value === undefined) break field;
    result.lonOffset = value;
  }
  return result;
}
