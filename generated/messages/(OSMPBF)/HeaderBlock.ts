import {
  decodeBinary as decodeBinary_1,
  decodeJson as decodeJson_1,
  encodeBinary as encodeBinary_1,
  encodeJson as encodeJson_1,
  Type as HeaderBBox,
} from "./HeaderBBox.ts";
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
  export type HeaderBlock = {
    bbox?: HeaderBBox;
    requiredFeatures: string[];
    optionalFeatures: string[];
    writingprogram?: string;
    source?: string;
    osmosisReplicationTimestamp?: string;
    osmosisReplicationSequenceNumber?: string;
    osmosisReplicationBaseUrl?: string;
  };
}
export type Type = $.OSMPBF.HeaderBlock;

export function getDefaultValue(): $.OSMPBF.HeaderBlock {
  return {
    bbox: undefined,
    requiredFeatures: [],
    optionalFeatures: [],
    writingprogram: "",
    source: "",
    osmosisReplicationTimestamp: "0",
    osmosisReplicationSequenceNumber: "0",
    osmosisReplicationBaseUrl: "",
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.HeaderBlock>,
): $.OSMPBF.HeaderBlock {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.HeaderBlock): unknown {
  const result: any = {};
  if (value.bbox !== undefined) result.bbox = encodeJson_1(value.bbox);
  result.requiredFeatures = value.requiredFeatures.map((value) =>
    tsValueToJsonValueFns.string(value)
  );
  result.optionalFeatures = value.optionalFeatures.map((value) =>
    tsValueToJsonValueFns.string(value)
  );
  if (value.writingprogram !== undefined) {
    result.writingprogram = tsValueToJsonValueFns.string(value.writingprogram);
  }
  if (value.source !== undefined) {
    result.source = tsValueToJsonValueFns.string(value.source);
  }
  if (value.osmosisReplicationTimestamp !== undefined) {
    result.osmosisReplicationTimestamp = tsValueToJsonValueFns.int64(
      value.osmosisReplicationTimestamp,
    );
  }
  if (value.osmosisReplicationSequenceNumber !== undefined) {
    result.osmosisReplicationSequenceNumber = tsValueToJsonValueFns.int64(
      value.osmosisReplicationSequenceNumber,
    );
  }
  if (value.osmosisReplicationBaseUrl !== undefined) {
    result.osmosisReplicationBaseUrl = tsValueToJsonValueFns.string(
      value.osmosisReplicationBaseUrl,
    );
  }
  return result;
}

export function decodeJson(value: any): $.OSMPBF.HeaderBlock {
  const result = getDefaultValue();
  if (value.bbox !== undefined) result.bbox = decodeJson_1(value.bbox);
  result.requiredFeatures =
    value.requiredFeatures?.map((value: any) =>
      jsonValueToTsValueFns.string(value)
    ) ?? [];
  result.optionalFeatures =
    value.optionalFeatures?.map((value: any) =>
      jsonValueToTsValueFns.string(value)
    ) ?? [];
  if (value.writingprogram !== undefined) {
    result.writingprogram = jsonValueToTsValueFns.string(value.writingprogram);
  }
  if (value.source !== undefined) {
    result.source = jsonValueToTsValueFns.string(value.source);
  }
  if (value.osmosisReplicationTimestamp !== undefined) {
    result.osmosisReplicationTimestamp = jsonValueToTsValueFns.int64(
      value.osmosisReplicationTimestamp,
    );
  }
  if (value.osmosisReplicationSequenceNumber !== undefined) {
    result.osmosisReplicationSequenceNumber = jsonValueToTsValueFns.int64(
      value.osmosisReplicationSequenceNumber,
    );
  }
  if (value.osmosisReplicationBaseUrl !== undefined) {
    result.osmosisReplicationBaseUrl = jsonValueToTsValueFns.string(
      value.osmosisReplicationBaseUrl,
    );
  }
  return result;
}

export function encodeBinary(value: $.OSMPBF.HeaderBlock): Uint8Array {
  const result: WireMessage = [];
  if (value.bbox !== undefined) {
    const tsValue = value.bbox;
    result.push(
      [1, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_1(tsValue),
      }],
    );
  }
  for (const tsValue of value.requiredFeatures) {
    result.push(
      [4, tsValueToWireValueFns.string(tsValue)],
    );
  }
  for (const tsValue of value.optionalFeatures) {
    result.push(
      [5, tsValueToWireValueFns.string(tsValue)],
    );
  }
  if (value.writingprogram !== undefined) {
    const tsValue = value.writingprogram;
    result.push(
      [16, tsValueToWireValueFns.string(tsValue)],
    );
  }
  if (value.source !== undefined) {
    const tsValue = value.source;
    result.push(
      [17, tsValueToWireValueFns.string(tsValue)],
    );
  }
  if (value.osmosisReplicationTimestamp !== undefined) {
    const tsValue = value.osmosisReplicationTimestamp;
    result.push(
      [32, tsValueToWireValueFns.int64(tsValue)],
    );
  }
  if (value.osmosisReplicationSequenceNumber !== undefined) {
    const tsValue = value.osmosisReplicationSequenceNumber;
    result.push(
      [33, tsValueToWireValueFns.int64(tsValue)],
    );
  }
  if (value.osmosisReplicationBaseUrl !== undefined) {
    const tsValue = value.osmosisReplicationBaseUrl;
    result.push(
      [34, tsValueToWireValueFns.string(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.HeaderBlock {
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
    result.bbox = value;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 4)
      .map(([, wireValue]) => wireValue);
    const value = wireValues.map((wireValue) =>
      wireValueToTsValueFns.string(wireValue)
    ).filter((x) => x !== undefined);
    if (!value.length) break collection;
    result.requiredFeatures = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 5)
      .map(([, wireValue]) => wireValue);
    const value = wireValues.map((wireValue) =>
      wireValueToTsValueFns.string(wireValue)
    ).filter((x) => x !== undefined);
    if (!value.length) break collection;
    result.optionalFeatures = value as any;
  }
  field: {
    const wireValue = wireFields.get(16);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.string(wireValue);
    if (value === undefined) break field;
    result.writingprogram = value;
  }
  field: {
    const wireValue = wireFields.get(17);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.string(wireValue);
    if (value === undefined) break field;
    result.source = value;
  }
  field: {
    const wireValue = wireFields.get(32);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int64(wireValue);
    if (value === undefined) break field;
    result.osmosisReplicationTimestamp = value;
  }
  field: {
    const wireValue = wireFields.get(33);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int64(wireValue);
    if (value === undefined) break field;
    result.osmosisReplicationSequenceNumber = value;
  }
  field: {
    const wireValue = wireFields.get(34);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.string(wireValue);
    if (value === undefined) break field;
    result.osmosisReplicationBaseUrl = value;
  }
  return result;
}
