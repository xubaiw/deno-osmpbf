export declare namespace $.OSMPBF.Relation {
  export type MemberType =
    | "NODE"
    | "WAY"
    | "RELATION";
}
export type Type = $.OSMPBF.Relation.MemberType;

export const num2name = {
  0: "NODE",
  1: "WAY",
  2: "RELATION",
} as const;

export const name2num = {
  NODE: 0,
  WAY: 1,
  RELATION: 2,
} as const;
