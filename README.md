# deno-osmpbf

OpenStreetMap PBF parser in deno, backed with [`pbkit`](https://github.com/pbkit/pbkit).

## Example 

Count elements in Planet PBF file.

```js
import { Reader } from "https://deno.land/x/osmpbf@v0.1.2/mod.ts";

const reader = await Reader.fromPath("planet-latest.osm.pbf");

const counts = {
  nodes: 0,
  ways: 0,
  relations: 0
};

for await (const blob of reader) {
  const block = blob.decodeBlock();
  if (!("primitivegroup" in block)) continue;  // skip header blocks
  const groups = block.primitivegroup;
  for (const g of groups) {
    counts.nodes += g.nodes.length;
    counts.nodes += g.dense?.id.length ?? 0;
    counts.ways += g.ways.length;
    counts.relations += g.relations.length;
  }
}

console.log(counts);
```