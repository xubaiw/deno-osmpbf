#!/usr/bin/env -S deno run -A

import { read } from "../mod.ts";

if (import.meta.main) {
  const path = Deno.args.at(0);
  if (path) {
    const counts = await countElement(path);
    console.log(counts);
  } else {
    console.log(`usage: ./count.ts <path>`);
    Deno.exit(1);
  }
}

async function countElement(path: string) {
  const nBlock = await countBlob(path);
  const counts = {
    nodes: 0,
    ways: 0,
    relations: 0,
    block: 0,
  };
  // show info
  Deno.addSignalListener("SIGINFO", () =>
    console.log({
      ...counts,
      percent: counts.block / nBlock,
    }));
  console.log("press Ctrl-T to show progress");
  const rdr = await read(path);
  for await (const block of rdr.blocks) {
    counts.block += 1;
    if ("primitivegroup" in block) {
      for (const g of block.primitivegroup) {
        counts.nodes += g.nodes.length;
        counts.nodes += g.dense?.id.length ?? 0;
        counts.ways += g.ways.length;
        counts.relations += g.relations.length;
      }
    }
  }
  return counts;
}

async function countBlob(path: string) {
  let count = 0;
  const handleInfo = () => console.log({ phase: "blob", count });
  Deno.addSignalListener("SIGINFO", handleInfo);
  const rdr = await read(path);
  for await (const _ of rdr.blobs) {
    count += 1;
  }
  Deno.removeSignalListener("SIGINFO", handleInfo);
  return count;
}
