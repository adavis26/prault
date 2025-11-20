#!/usr/bin/env -S deno run --allow-all

import { build, emptyDir } from "dnt";

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
    // package.json properties
    name: "prault",
    version: "1.0.0",
    description: "A TypeScript library for managing and templating prompts from files.",
    license: "MIT",
    bin: {
      "prault": "./esm/mod.js"
    },
    repository: {
      type: "git",
      url: "git+https://github.com/yourusername/prault.git",
    },
    bugs: {
      url: "https://github.com/yourusername/prault/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});