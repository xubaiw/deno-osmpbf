import {
  jsonValueToTsValueFns,
  tsValueToJsonValueFns,
} from "../../runtime/json/scalar.ts";
import { Field, WireMessage } from "../../runtime/wire/index.ts";
import { default as serialize } from "../../runtime/wire/serialize.ts";
import {
  tsValueToWireValueFns,
  wireValueToTsValueFns,
} from "../../runtime/wire/scalar.ts";
import { default as deserialize } from "../../runtime/wire/deserialize.ts";

export declare namespace $.OSMPBF {
  export type Blob = {
    rawSize?: number;
    data?:
      | { field: "raw"; value: Uint8Array }
      | { field: "zlibData"; value: Uint8Array }
      | { field: "lzmaData"; value: Uint8Array }
      | { field: "OBSOLETEBzip2Data"; value: Uint8Array }
      | { field: "lz4Data"; value: Uint8Array }
      | { field: "zstdData"; value: Uint8Array };
  };
}
export type Type = $.OSMPBF.Blob;

export function getDefaultValue(): $.OSMPBF.Blob {
  return {
    rawSize: 0,
    data: undefined,
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.Blob>,
): $.OSMPBF.Blob {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.Blob): unknown {
  const result: any = {};
  if (value.rawSize !== undefined) {
    result.rawSize = tsValueToJsonValueFns.int32(value.rawSize);
  }
  switch (value.data?.field) {
    case "raw": {
      result.raw = tsValueToJsonValueFns.bytes(value.data.value);
      break;
    }
    case "zlibData": {
      result.zlibData = tsValueToJsonValueFns.bytes(value.data.value);
      break;
    }
    case "lzmaData": {
      result.lzmaData = tsValueToJsonValueFns.bytes(value.data.value);
      break;
    }
    case "OBSOLETEBzip2Data": {
      result.OBSOLETEBzip2Data = tsValueToJsonValueFns.bytes(value.data.value);
      break;
    }
    case "lz4Data": {
      result.lz4Data = tsValueToJsonValueFns.bytes(value.data.value);
      break;
    }
    case "zstdData": {
      result.zstdData = tsValueToJsonValueFns.bytes(value.data.value);
      break;
    }
  }
  return result;
}

export function decodeJson(value: any): $.OSMPBF.Blob {
  const result = getDefaultValue();
  if (value.rawSize !== undefined) {
    result.rawSize = jsonValueToTsValueFns.int32(value.rawSize);
  }
  if (value.raw !== undefined) {
    result.data = {
      field: "raw",
      value: jsonValueToTsValueFns.bytes(value.raw),
    };
  }
  if (value.zlibData !== undefined) {
    result.data = {
      field: "zlibData",
      value: jsonValueToTsValueFns.bytes(value.zlibData),
    };
  }
  if (value.lzmaData !== undefined) {
    result.data = {
      field: "lzmaData",
      value: jsonValueToTsValueFns.bytes(value.lzmaData),
    };
  }
  if (value.OBSOLETEBzip2Data !== undefined) {
    result.data = {
      field: "OBSOLETEBzip2Data",
      value: jsonValueToTsValueFns.bytes(value.OBSOLETEBzip2Data),
    };
  }
  if (value.lz4Data !== undefined) {
    result.data = {
      field: "lz4Data",
      value: jsonValueToTsValueFns.bytes(value.lz4Data),
    };
  }
  if (value.zstdData !== undefined) {
    result.data = {
      field: "zstdData",
      value: jsonValueToTsValueFns.bytes(value.zstdData),
    };
  }
  return result;
}

export function encodeBinary(value: $.OSMPBF.Blob): Uint8Array {
  const result: WireMessage = [];
  if (value.rawSize !== undefined) {
    const tsValue = value.rawSize;
    result.push(
      [2, tsValueToWireValueFns.int32(tsValue)],
    );
  }
  switch (value.data?.field) {
    case "raw": {
      const tsValue = value.data.value;
      result.push(
        [1, tsValueToWireValueFns.bytes(tsValue)],
      );
      break;
    }
    case "zlibData": {
      const tsValue = value.data.value;
      result.push(
        [3, tsValueToWireValueFns.bytes(tsValue)],
      );
      break;
    }
    case "lzmaData": {
      const tsValue = value.data.value;
      result.push(
        [4, tsValueToWireValueFns.bytes(tsValue)],
      );
      break;
    }
    case "OBSOLETEBzip2Data": {
      const tsValue = value.data.value;
      result.push(
        [5, tsValueToWireValueFns.bytes(tsValue)],
      );
      break;
    }
    case "lz4Data": {
      const tsValue = value.data.value;
      result.push(
        [6, tsValueToWireValueFns.bytes(tsValue)],
      );
      break;
    }
    case "zstdData": {
      const tsValue = value.data.value;
      result.push(
        [7, tsValueToWireValueFns.bytes(tsValue)],
      );
      break;
    }
  }
  return serialize(result);
}

const fieldNames: Map<number, string> = new Map([
  [1, "raw"],
  [2, "rawSize"],
  [3, "zlibData"],
  [4, "lzmaData"],
  [5, "OBSOLETEBzip2Data"],
  [6, "lz4Data"],
  [7, "zstdData"],
]);
const oneofFieldNumbersMap: { [oneof: string]: Set<number> } = {
  data: new Set([1, 3, 4, 5, 6, 7]),
};
const oneofFieldNamesMap = {
  data: new Map([
    [1, "raw" as const],
    [3, "zlibData" as const],
    [4, "lzmaData" as const],
    [5, "OBSOLETEBzip2Data" as const],
    [6, "lz4Data" as const],
    [7, "zstdData" as const],
  ]),
};
export function decodeBinary(binary: Uint8Array): $.OSMPBF.Blob {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  const wireFieldNumbers = Array.from(wireFields.keys()).reverse();
  field: {
    const wireValue = wireFields.get(2);
    if (wireValue === undefined) break field;
    const value = wireValueToTsValueFns.int32(wireValue);
    if (value === undefined) break field;
    result.rawSize = value;
  }
  oneof: {
    const oneofFieldNumbers = oneofFieldNumbersMap.data;
    const oneofFieldNames = oneofFieldNamesMap.data;
    const fieldNumber = wireFieldNumbers.find((v) => oneofFieldNumbers.has(v));
    if (fieldNumber == null) break oneof;
    const wireValue = wireFields.get(fieldNumber);
    const wireValueToTsValueMap = {
      [1](wireValue: Field) {
        return wireValueToTsValueFns.bytes(wireValue);
      },
      [3](wireValue: Field) {
        return wireValueToTsValueFns.bytes(wireValue);
      },
      [4](wireValue: Field) {
        return wireValueToTsValueFns.bytes(wireValue);
      },
      [5](wireValue: Field) {
        return wireValueToTsValueFns.bytes(wireValue);
      },
      [6](wireValue: Field) {
        return wireValueToTsValueFns.bytes(wireValue);
      },
      [7](wireValue: Field) {
        return wireValueToTsValueFns.bytes(wireValue);
      },
    };
    const value = (wireValueToTsValueMap[
      fieldNumber as keyof typeof wireValueToTsValueMap
    ] as any)?.(wireValue!);
    if (value === undefined) break oneof;
    result.data = {
      field: oneofFieldNames.get(fieldNumber)!,
      value: value as any,
    };
  }
  return result;
}
