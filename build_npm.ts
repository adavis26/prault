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
    name: denoConfig.name,
    version: denoConfig.version,
    description: denoConfig.description,
    license: denoConfig.license,
    bin: {
      "prault": "./script/mod.js"
    },
    repository: denoConfig.repository,
    bugs: denoConfig.bugs,
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
    
    // Add shebang to the CLI script and make it executable
    const scriptPath = "./npm/script/mod.js";
    const content = Deno.readTextFileSync(scriptPath);
    if (!content.startsWith("#!/usr/bin/env node")) {
      Deno.writeTextFileSync(scriptPath, "#!/usr/bin/env node\n" + content);
    }
    
    // Make the script executable
    const scriptPathFull = new URL(scriptPath, import.meta.url).pathname;
    const chmodCmd = new Deno.Command("chmod", { args: ["+x", scriptPathFull] });
    chmodCmd.outputSync();
  },
});