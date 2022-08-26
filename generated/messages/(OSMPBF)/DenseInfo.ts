import {
  jsonValueToTsValueFns,
  tsValueToJsonValueFns,
} from "../../runtime/json/scalar.ts";
import { WireMessage } from "../../runtime/wire/index.ts";
import { default as serialize } from "../../runtime/wire/serialize.ts";
import {
  tsValueToWireValueFns,
  unpackFns,
  wireValueToTsValueFns,
} from "../../runtime/wire/scalar.ts";
import { default as deserialize } from "../../runtime/wire/deserialize.ts";

export declare namespace $.OSMPBF {
  export type DenseInfo = {
    version: number[];
    timestamp: string[];
    changeset: string[];
    uid: number[];
    userSid: number[];
    visible: boolean[];
  };
}
export type Type = $.OSMPBF.DenseInfo;

export function getDefaultValue(): $.OSMPBF.DenseInfo {
  return {
    version: [],
    timestamp: [],
    changeset: [],
    uid: [],
    userSid: [],
    visible: [],
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.DenseInfo>,
): $.OSMPBF.DenseInfo {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.DenseInfo): unknown {
  const result: any = {};
  result.version = value.version.map((value) =>
    tsValueToJsonValueFns.int32(value)
  );
  result.timestamp = value.timestamp.map((value) =>
    tsValueToJsonValueFns.sint64(value)
  );
  result.changeset = value.changeset.map((value) =>
    tsValueToJsonValueFns.sint64(value)
  );
  result.uid = value.uid.map((value) => tsValueToJsonValueFns.sint32(value));
  result.userSid = value.userSid.map((value) =>
    tsValueToJsonValueFns.sint32(value)
  );
  result.visible = value.visible.map((value) =>
    tsValueToJsonValueFns.bool(value)
  );
  return result;
}

export function decodeJson(value: any): $.OSMPBF.DenseInfo {
  const result = getDefaultValue();
  result.version =
    value.version?.map((value: any) => jsonValueToTsValueFns.int32(value)) ??
      [];
  result.timestamp =
    value.timestamp?.map((value: any) => jsonValueToTsValueFns.sint64(value)) ??
      [];
  result.changeset =
    value.changeset?.map((value: any) => jsonValueToTsValueFns.sint64(value)) ??
      [];
  result.uid =
    value.uid?.map((value: any) => jsonValueToTsValueFns.sint32(value)) ?? [];
  result.userSid =
    value.userSid?.map((value: any) => jsonValueToTsValueFns.sint32(value)) ??
      [];
  result.visible =
    value.visible?.map((value: any) => jsonValueToTsValueFns.bool(value)) ?? [];
  return result;
}

export function encodeBinary(value: $.OSMPBF.DenseInfo): Uint8Array {
  const result: WireMessage = [];
  for (const tsValue of value.version) {
    result.push(
      [1, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  for (const tsValue of value.timestamp) {
    result.push(
      [2, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  for (const tsValue of value.changeset) {
    result.push(
      [3, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  for (const tsValue of value.uid) {
    result.push(
      [4, tsValueToWireValueFns.sint32(tsValue)],
    );
  }
  for (const tsValue of value.userSid) {
    result.push(
      [5, tsValueToWireValueFns.sint32(tsValue)],
    );
  }
  for (const tsValue of value.visible) {
    result.push(
      [6, tsValueToWireValueFns.bool(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.DenseInfo {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 1)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.int32(wireValues));
    if (!value.length) break collection;
    result.version = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 2)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.sint64(wireValues));
    if (!value.length) break collection;
    result.timestamp = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 3)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.sint64(wireValues));
    if (!value.length) break collection;
    result.changeset = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 4)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.sint32(wireValues));
    if (!value.length) break collection;
    result.uid = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 5)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.sint32(wireValues));
    if (!value.length) break collection;
    result.userSid = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 6)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.bool(wireValues));
    if (!value.length) break collection;
    result.visible = value as any;
  }
  return result;
}
