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
  export type HeaderBBox = {
    left: string;
    right: string;
    top: string;
    bottom: string;
  };
}
export type Type = $.OSMPBF.HeaderBBox;

export function getDefaultValue(): $.OSMPBF.HeaderBBox {
  return {
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.HeaderBBox>,
): $.OSMPBF.HeaderBBox {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.HeaderBBox): unknown {
  const result: any = {};
  if (value.left !== undefined) {
    result.left = tsValueToJsonValueFns.sint64(value.left);
  }
  if (value.right !== undefined) {
    result.right = tsValueToJsonValueFns.sint64(value.right);
  }
  if (value.top !== undefined) {
    result.top = tsValueToJsonValueFns.sint64(value.top);
  }
  if (value.bottom !== undefined) {
    result.bottom = tsValueToJsonValueFns.sint64(value.bottom);
  }
  return result;
}

export function decodeJson(value: any): $.OSMPBF.HeaderBBox {
  const result = getDefaultValue();
  if (value.left !== undefined) {
    result.left = jsonValueToTsValueFns.sint64(value.left);
  }
  if (value.right !== undefined) {
    result.right = jsonValueToTsValueFns.sint64(value.right);
  }
  if (value.top !== undefined) {
    result.top = jsonValueToTsValueFns.sint64(value.top);
  }
  if (value.bottom !== undefined) {
    result.bottom = jsonValueToTsValueFns.sint64(value.bottom);
  }
  return result;
}

export function encodeBinary(value: $.OSMPBF.HeaderBBox): Uint8Array {
  const result: WireMessage = [];
  if (value.left !== undefined) {
    const tsValue = value.left;
    result.push(
      [1, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  if (value.right !== undefined) {
    const tsValue = value.right;
    result.push(
      [2, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  if (value.top !== undefined) {
    const tsValue = value.top;
    result.push(
      [3, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  if (value.bottom !== undefined) {
    const tsValue = value.bottom;
    result.push(
      [4, tsValueToWireValueFns.sint64(tsValue)],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.HeaderBBox {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  field: {
    const wireValue = wireFields.get(1);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.sint64(wireValue);
    if (value === undefined) break field;
    result.left = value;
  }
  field: {
    const wireValue = wireFields.get(2);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.sint64(wireValue);
    if (value === undefined) break field;
    result.right = value;
  }
  field: {
    const wireValue = wireFields.get(3);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.sint64(wireValue);
    if (value === undefined) break field;
    result.top = value;
  }
  field: {
    const wireValue = wireFields.get(4);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.sint64(wireValue);
    if (value === undefined) break field;
    result.bottom = value;
  }
  return result;
}
