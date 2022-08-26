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
  export type Info = {
    version?: number;
    timestamp?: string;
    changeset?: string;
    uid?: number;
    userSid?: number;
    visible?: boolean;
  };
}
export type Type = $.OSMPBF.Info;

export function getDefaultValue(): $.OSMPBF.Info {
  return {
    version: 0,
    timestamp: "0",
    changeset: "0",
    uid: 0,
    userSid: 0,
    visible: false,
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.Info>,
): $.OSMPBF.Info {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.Info): unknown {
  const result: any = {};
  if (value.version !== undefined) {
    result.version = tsValueToJsonValueFns.int32(value.version);
  }
  if (value.timestamp !== undefined) {
    result.timestamp = tsValueToJsonValueFns.int64(value.timestamp);
  }
  if (value.changeset !== undefined) {
    result.changeset = tsValueToJsonValueFns.int64(value.changeset);
  }
  if (value.uid !== undefined) {
    result.uid = tsValueToJsonValueFns.int32(value.uid);
  }
  if (value.userSid !== undefined) {
    result.userSid = tsValueToJsonValueFns.uint32(value.userSid);
  }
  if (value.visible !== undefined) {
    result.visible = tsValueToJsonValueFns.bool(value.visible);
  }
  return result;
}

export function decodeJson(value: any): $.OSMPBF.Info {
  const result = getDefaultValue();
  if (value.version !== undefined) {
    result.version = jsonValueToTsValueFns.int32(value.version);
  }
  if (value.timestamp !== undefined) {
    result.timestamp = jsonValueToTsValueFns.int64(value.timestamp);
  }
  if (value.changeset !== undefined) {
    result.changeset = jsonValueToTsValueFns.int64(value.changeset);
  }
  if (value.uid !== undefined) {
    result.uid = jsonValueToTsValueFns.int32(value.uid);
  }
  if (value.userSid !== undefined) {
    result.userSid = jsonValueToTsValueFns.uint32(value.userSid);
  }
  if (value.visible !== undefined) {
    result.visible = jsonValueToTsValueFns.bool(value.visible);
  }
  return result;
}

export function encodeBinary(value: $.OSMPBF.Info): Uint8Array {
  const result: WireMessage = [];
  if (value.version !== undefined) {
    const tsValue = value.version;
    result.push(
      [1, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  if (value.timestamp !== undefined) {
    const tsValue = value.timestamp;
    result.push(
      [2, tsValueToWireValueFns.int64(tsValue)],
    );
  }
  if (value.changeset !== undefined) {
    const tsValue = value.changeset;
    result.push(
      [3, tsValueToWireValueFns.int64(tsValue)],
    );
  }
  if (value.uid !== undefined) {
    const tsValue = value.uid;
    result.push(
      [4, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  if (value.userSid !== undefined) {
    const tsValue = value.userSid;
    result.push(
      [5, tsValueToWireValueFns.uint32(tsValue)],
    );
  }
  if (value.visible !== undefined) {
    const tsValue = value.visible;
    result.push(
      [6, tsValueToWireValueFns.bool(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.Info {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  field: {
    const wireValue = wireFields.get(1);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int32(wireValue);
    if (value === undefined) break field;
    result.version = value;
  }
  field: {
    const wireValue = wireFields.get(2);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int64(wireValue);
    if (value === undefined) break field;
    result.timestamp = value;
  }
  field: {
    const wireValue = wireFields.get(3);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int64(wireValue);
    if (value === undefined) break field;
    result.changeset = value;
  }
  field: {
    const wireValue = wireFields.get(4);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int32(wireValue);
    if (value === undefined) break field;
    result.uid = value;
  }
  field: {
    const wireValue = wireFields.get(5);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.uint32(wireValue);
    if (value === undefined) break field;
    result.userSid = value;
  }
  field: {
    const wireValue = wireFields.get(6);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.bool(wireValue);
    if (value === undefined) break field;
    result.visible = value;
  }
  return result;
}
