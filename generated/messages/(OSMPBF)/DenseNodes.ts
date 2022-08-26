import {
  decodeBinary as decodeBinary_1,
  decodeJson as decodeJson_1,
  encodeBinary as encodeBinary_1,
  encodeJson as encodeJson_1,
  Type as DenseInfo,
} from "./DenseInfo.ts";
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
import { default as deserialize } from "../../runtime/wire/deserialize.ts";

export declare namespace $.OSMPBF {
  export type DenseNodes = {
    id: string[];
    denseinfo?: DenseInfo;
    lat: string[];
    lon: string[];
    keysVals: number[];
  };
}
export type Type = $.OSMPBF.DenseNodes;

export function getDefaultValue(): $.OSMPBF.DenseNodes {
  return {
    id: [],
    denseinfo: undefined,
    lat: [],
    lon: [],
    keysVals: [],
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.DenseNodes>,
): $.OSMPBF.DenseNodes {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.DenseNodes): unknown {
  const result: any = {};
  result.id = value.id.map((value) => tsValueToJsonValueFns.sint64(value));
  if (value.denseinfo !== undefined) {
    result.denseinfo = encodeJson_1(value.denseinfo);
  }
  result.lat = value.lat.map((value) => tsValueToJsonValueFns.sint64(value));
  result.lon = value.lon.map((value) => tsValueToJsonValueFns.sint64(value));
  result.keysVals = value.keysVals.map((value) =>
    tsValueToJsonValueFns.int32(value)
  );
  return result;
}

export function decodeJson(value: any): $.OSMPBF.DenseNodes {
  const result = getDefaultValue();
  result.id =
    value.id?.map((value: any) => jsonValueToTsValueFns.sint64(value)) ?? [];
  if (value.denseinfo !== undefined) {
    result.denseinfo = decodeJson_1(value.denseinfo);
  }
  result.lat =
    value.lat?.map((value: any) => jsonValueToTsValueFns.sint64(value)) ?? [];
  result.lon =
    value.lon?.map((value: any) => jsonValueToTsValueFns.sint64(value)) ?? [];
  result.keysVals =
    value.keysVals?.map((value: any) => jsonValueToTsValueFns.int32(value)) ??
      [];
  return result;
}

export function encodeBinary(value: $.OSMPBF.DenseNodes): Uint8Array {
  const result: WireMessage = [];
  for (const tsValue of value.id) {
    result.push(
      [1, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  if (value.denseinfo !== undefined) {
    const tsValue = value.denseinfo;
    result.push(
      [5, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_1(tsValue),
      }],
    );
  }
  for (const tsValue of value.lat) {
    result.push(
      [8, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  for (const tsValue of value.lon) {
    result.push(
      [9, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  for (const tsValue of value.keysVals) {
    result.push(
      [10, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.DenseNodes {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 1)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.sint64(wireValues));
    if (!value.length) break collection;
    result.id = value as any;
  }
  field: {
    const wireValue = wireFields.get(5);
    if (wireValue === undefined) break field;
    const value = wireValue.type === WireType.LengthDelimited
      ? decodeBinary_1(wireValue.value)
      : undefined;
    if (value === undefined) break field;
    result.denseinfo = value;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 8)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.sint64(wireValues));
    if (!value.length) break collection;
    result.lat = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 9)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.sint64(wireValues));
    if (!value.length) break collection;
    result.lon = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 10)
      .map(([, wireValue]) => wireValue);
    const value = Array.from(unpackFns.int32(wireValues));
    if (!value.length) break collection;
    result.keysVals = value as any;
  }
  return result;
}
