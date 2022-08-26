import {
  decodeBinary as decodeBinary_1,
  decodeJson as decodeJson_1,
  encodeBinary as encodeBinary_1,
  encodeJson as encodeJson_1,
  Type as Node,
} from "./Node.ts";
import {
  decodeBinary as decodeBinary_2,
  decodeJson as decodeJson_2,
  encodeBinary as encodeBinary_2,
  encodeJson as encodeJson_2,
  Type as DenseNodes,
} from "./DenseNodes.ts";
import {
  decodeBinary as decodeBinary_3,
  decodeJson as decodeJson_3,
  encodeBinary as encodeBinary_3,
  encodeJson as encodeJson_3,
  Type as Way,
} from "./Way.ts";
import {
  decodeBinary as decodeBinary_4,
  decodeJson as decodeJson_4,
  encodeBinary as encodeBinary_4,
  encodeJson as encodeJson_4,
  Type as Relation,
} from "./Relation.ts";
import {
  decodeBinary as decodeBinary_5,
  decodeJson as decodeJson_5,
  encodeBinary as encodeBinary_5,
  encodeJson as encodeJson_5,
  Type as ChangeSet,
} from "./ChangeSet.ts";
import { jsonValueToTsValueFns } from "../../runtime/json/scalar.ts";
import { WireMessage, WireType } from "../../runtime/wire/index.ts";
import { default as serialize } from "../../runtime/wire/serialize.ts";
import { default as deserialize } from "../../runtime/wire/deserialize.ts";

export declare namespace $.OSMPBF {
  export type PrimitiveGroup = {
    nodes: Node[];
    dense?: DenseNodes;
    ways: Way[];
    relations: Relation[];
    changesets: ChangeSet[];
  };
}
export type Type = $.OSMPBF.PrimitiveGroup;

export function getDefaultValue(): $.OSMPBF.PrimitiveGroup {
  return {
    nodes: [],
    dense: undefined,
    ways: [],
    relations: [],
    changesets: [],
  };
}

export function createValue(
  partialValue: Partial<$.OSMPBF.PrimitiveGroup>,
): $.OSMPBF.PrimitiveGroup {
  return {
    ...getDefaultValue(),
    ...partialValue,
  };
}

export function encodeJson(value: $.OSMPBF.PrimitiveGroup): unknown {
  const result: any = {};
  result.nodes = value.nodes.map((value) => encodeJson_1(value));
  if (value.dense !== undefined) result.dense = encodeJson_2(value.dense);
  result.ways = value.ways.map((value) => encodeJson_3(value));
  result.relations = value.relations.map((value) => encodeJson_4(value));
  result.changesets = value.changesets.map((value) => encodeJson_5(value));
  return result;
}

export function decodeJson(value: any): $.OSMPBF.PrimitiveGroup {
  const result = getDefaultValue();
  result.nodes = value.nodes?.map((value: any) => decodeJson_1(value)) ?? [];
  if (value.dense !== undefined) result.dense = decodeJson_2(value.dense);
  result.ways = value.ways?.map((value: any) => decodeJson_3(value)) ?? [];
  result.relations =
    value.relations?.map((value: any) => decodeJson_4(value)) ?? [];
  result.changesets =
    value.changesets?.map((value: any) => decodeJson_5(value)) ?? [];
  return result;
}

export function encodeBinary(value: $.OSMPBF.PrimitiveGroup): Uint8Array {
  const result: WireMessage = [];
  for (const tsValue of value.nodes) {
    result.push(
      [1, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_1(tsValue),
      }],
    );
  }
  if (value.dense !== undefined) {
    const tsValue = value.dense;
    result.push(
      [2, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_2(tsValue),
      }],
    );
  }
  for (const tsValue of value.ways) {
    result.push(
      [3, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_3(tsValue),
      }],
    );
  }
  for (const tsValue of value.relations) {
    result.push(
      [4, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_4(tsValue),
      }],
    );
  }
  for (const tsValue of value.changesets) {
    result.push(
      [5, {
        type: WireType.LengthDelimited as const,
        value: encodeBinary_5(tsValue),
      }],
    );
  }
  return serialize(result);
}

export function decodeBinary(binary: Uint8Array): $.OSMPBF.PrimitiveGroup {
  const result = getDefaultValue();
  const wireMessage = deserialize(binary);
  const wireFields = new Map(wireMessage);
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 1)
      .map(([, wireValue]) => wireValue);
    const value = wireValues.map((wireValue) =>
      wireValue.type === WireType.LengthDelimited
        ? decodeBinary_1(wireValue.value)
        : undefined
    ).filter((x) => x !== undefined);
    if (!value.length) break collection;
    result.nodes = value as any;
  }
  field: {
    const wireValue = wireFields.get(2);
    if (wireValue === undefined) break field;
    const value = wireValue.type === WireType.LengthDelimited
      ? decodeBinary_2(wireValue.value)
      : undefined;
    if (value === undefined) break field;
    result.dense = value;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 3)
      .map(([, wireValue]) => wireValue);
    const value = wireValues.map((wireValue) =>
      wireValue.type === WireType.LengthDelimited
        ? decodeBinary_3(wireValue.value)
        : undefined
    ).filter((x) => x !== undefined);
    if (!value.length) break collection;
    result.ways = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 4)
      .map(([, wireValue]) => wireValue);
    const value = wireValues.map((wireValue) =>
      wireValue.type === WireType.LengthDelimited
        ? decodeBinary_4(wireValue.value)
        : undefined
    ).filter((x) => x !== undefined);
    if (!value.length) break collection;
    result.relations = value as any;
  }
  collection: {
    const wireValues = wireMessage.filter(([fieldNumber]) => fieldNumber === 5)
      .map(([, wireValue]) => wireValue);
    const value = wireValues.map((wireValue) =>
      wireValue.type === WireType.LengthDelimited
        ? decodeBinary_5(wireValue.value)
        : undefined
    ).filter((x) => x !== undefined);
    if (!value.length) break collection;
    result.changesets = value as any;
  }
  return result;
}
