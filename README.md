# deno-osmpbf

OpenStreetMap PBF parser in deno.

## Example 

```js
import { Reader } from "https://deno.land/x/osmpbf@v0.1.0/mod.ts";

const reader = await Reader.fromPath("planet-latest.osm.pbf");

for await (const blob of reader) {
  console.log(blob.block);
}
```