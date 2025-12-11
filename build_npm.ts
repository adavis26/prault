#!/usr/bin/env -S deno run --allow-all

import { build, emptyDir } from "dnt";

// Read package configuration from deno.json
const denoConfig = JSON.parse(Deno.readTextFileSync("deno.json"));

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  package: {
    // package.json properties from deno.json
    name: 'prault',
    version: denoConfig.version,
    description: denoConfig.description,
    license: denoConfig.license,
    bin: {
      "prault": "bin/prault"
    },
    repository: denoConfig.repository,
    bugs: denoConfig.bugs,
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
    
    // Create bin directory and wrapper script
    Deno.mkdirSync("npm/bin", { recursive: true });
    const binScript = `#!/usr/bin/env node

const { main } = require("../esm/mod.js");

main();
`;
    Deno.writeTextFileSync("npm/bin/prault", binScript);
    
    // Make the bin script executable
    const binPath = "./npm/bin/prault";
    const binPathFull = new URL(binPath, import.meta.url).pathname;
    const chmodCmd = new Deno.Command("chmod", { args: ["+x", binPathFull] });
    chmodCmd.outputSync();
  },
});