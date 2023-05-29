import { Foras } from "https://deno.land/x/foras@2.0.8/src/deno/mod.ts";

let INIT = false;

export function unzlib(buf: Uint8Array): Uint8Array {
  if (!INIT) {
    Foras.initSyncBundledOnce();
    INIT = true;
  }
  return Foras.unzlib(buf);
}
