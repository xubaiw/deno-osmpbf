# deno-osmpbf

OpenStreetMap PBF parser in deno, backed with [`pbkit`](https://github.com/pbkit/pbkit).

## Example 

This example count elements in a Planet PBF file.

```js
import { read } from "https://denopkg.com/xubaiw/deno-osmpbf/mod.ts";

const path = <path to osm pbf file>
const rdr = await read(path);

const counts = {
  nodes: 0,
  ways: 0,
  relations: 0,
};

for await (const block of rdr.blocks) {
  if ("primitivegroup" in block) {
    for (const g of block.primitivegroup) {
      counts.nodes += g.nodes.length;
      counts.nodes += g.dense?.id.length ?? 0;
      counts.ways += g.ways.length;
      counts.relations += g.relations.length;
    }
  }
}

console.log(counts)

```
