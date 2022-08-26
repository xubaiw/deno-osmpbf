import {
  decodeBinary as decodeBinary_1,
  decodeJson as decodeJson_1,
  encodeBinary as encodeBinary_1,
  encodeJson as encodeJson_1,
  Type as Info,
} from "./Info.ts";
import {
  name2num,
  num2name,
  Type as MemberType,
} from "./(Relation)/MemberType.ts";
import {
  jsonValueToTsValueFns,
  tsValueToJsonValueFns,
} from "../../runtime/json/scalar.ts";
import { WireMessage, WireType } from "../../runtime/wire/index.ts";
import { default as serialize } from "../../runtime/wire/serialize.ts";
import {
  tsValueToWireValueFns,
  unpackFns,
  wireValueToTsValueFns,
} from "../../runtime/wire/scalar.ts";
import { default as Long } from "../../runtime/Long.ts";
import { default as deserialize } from "../../runtime/wire/deserialize.ts";

export declare namespace $.OSMPBF {
  export type Relation = {
    id: string;
    keys: number[];
    vals: number[];
    info?: Info;
    rolesSid: number[];
    memids: string[];
    types: MemberType[];
  };
}
export type Type = $.OSMPBF.Relation;

export function getDefaultValue(): $.OSMPBF.Relation {
  return {
    id: "0",
    keys: [],
    vals: [],
    info: undefined,
    rolesSid: [],
    memids: [],
    types: [],
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.Relation>,
): $.OSMPBF.Relation {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.Relation): unknown {
  const result: any = {};
  if (value.id !== undefined) result.id = tsValueToJsonValueFns.int64(value.id);
  result.keys = value.keys.map((value) => tsValueToJsonValueFns.uint32(value));
  result.vals = value.vals.map((value) => tsValueToJsonValueFns.uint32(value));
  if (value.info !== undefined) result.info = encodeJson_1(value.info);
  result.rolesSid = value.rolesSid.map((value) =>
    tsValueToJsonValueFns.int32(value)
  );
  result.memids = value.memids.map((value) =>
    tsValueToJsonValueFns.sint64(value)
  );
  result.types = value.types.map((value) => tsValueToJsonValueFns.enum(value));
  return result;
}

export function decodeJson(value: any): $.OSMPBF.Relation {
  const result = getDefaultValue();
  if (value.id !== undefined) result.id = jsonValueToTsValueFns.int64(value.id);
  result.keys =
    value.keys?.map((value: any) => jsonValueToTsValueFns.uint32(value)) ?? [];
  result.vals =
    value.vals?.map((value: any) => jsonValueToTsValueFns.uint32(value)) ?? [];
  if (value.info !== undefined) result.info = decodeJson_1(value.info);
  result.rolesSid =
    value.rolesSid?.map((value: any) => jsonValueToTsValueFns.int32(value)) ??
      [];
  result.memids =
    value.memids?.map((value: any) => jsonValueToTsValueFns.sint64(value)) ??
      [];
  result.types =
    value.types?.map((value: any) =>
      jsonValueToTsValueFns.enum(value) as MemberType
    ) ?? [];
  return result;
}

export function encodeBinary(value: $.OSMPBF.Relation): Uint8Array {
  const result: WireMessage = [];
  if (value.id !== undefined) {
    const tsValue = value.id;
    result.push(
      [1, tsValueToWireValueFns.int64(tsValue)],
    );
  }
  for (const tsValue of value.keys) {
    result.push(
      [2, tsValueToWireValueFns.uint32(tsValue)],
    );
  }
  for (const tsValue of value.vals) {
    result.push(
      [3, tsValueToWireValueFns.uint32(tsValue)],
    );
  }
  if (value.info !== undefined) {
    const tsValue = value.info;
    result.push(
      [4, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_1(tsValue),
      }],
    );
  }
  for (const tsValue of value.rolesSid) {
    result.push(
      [8, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  for (const tsValue of value.memids) {
    result.push(
      [9, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  for (const tsValue of value.types) {
    result.push(
      [10, {
        type: WireType.Varint as const,
        value: new Long(name2num[tsValue as keyof typeof name2num]),
      }],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.Relation {
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
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 2)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.uint32(wireValues));
    if (!value.length) break collection;
    result.keys = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 3)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.uint32(wireValues));
    if (!value.length) break collection;
    result.vals = value as any;
  }
  field: {
    const wireValue = wireFields.get(4);
    if (wireValue === undefined) break field;
    const value = wireValue.type === WireType.LengthDelimited
      ? decodeBinary_1(wireValue.value)
      : undefined;
    if (value === undefined) break field;
    result.info = value;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 8)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.int32(wireValues));
    if (!value.length) break collection;
    result.rolesSid = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 9)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.sint64(wireValues));
    if (!value.length) break collection;
    result.memids = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 10)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.int32(wireValues)).map((num) =>
      num2name[num as keyof typeof num2name]
    );
    if (!value.length) break collection;
    result.types = value as any;
  }
  return result;
}
