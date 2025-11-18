// This script generates a TypeScript module for type-safe prompt access
// Run with: deno run --allow-read --allow-write generate-prompts.ts

import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

const PROMPTS_DIR = join(Deno.cwd(), "prompts");
const OUTPUT_FILE = join(Deno.cwd(), "prompts.gen.ts");

async function scanDir(dir: string, base = ""): Promise<Record<string, unknown>> {
  const result: Record<string, unknown> = {};
  for await (const entry of Deno.readDir(dir)) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory) {
      result[entry.name] = await scanDir(fullPath, join(base, entry.name));
    } else if (entry.isFile && (entry.name.endsWith('.md') || entry.name.endsWith('.txt'))) {
      const name = entry.name.replace(/\.(md|txt)$/, '');
      result[name] = fullPath;
    }
  }
  return result;
}

function collectPromptNames(obj: Record<string, unknown>, prefix = ""): string[] {
  const names: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string") {
      names.push((prefix ? prefix + "/" : "") + k);
    } else {
      names.push(...collectPromptNames(v as Record<string, unknown>, (prefix ? prefix + "/" : "") + k));
    }
  }
  return names;
}

function collectPromptEntries(
  obj: Record<string, unknown>,
  prefix = "",
): Array<{ method: string; path: string[] }> {
  const entries: Array<{ method: string; path: string[] }> = [];
  for (const [k, v] of Object.entries(obj)) {
    const newPrefix = prefix ? `${prefix}_${k}` : k;
    if (typeof v === "string") {
      entries.push({
        method: newPrefix,
        path: (prefix ? prefix.split("_") : []).concat(k),
      });
    } else {
      entries.push(
        ...collectPromptEntries(v as Record<string, unknown>, newPrefix),
      );
    }
  }
  return entries;
}

async function main() {
  const tree = await scanDir(PROMPTS_DIR);
  const promptNames = collectPromptNames(tree);
  const promptNameType = `export type PromptName = ${
    promptNames.map((n) => `\"${n}\"`).join(" | ")
  };\n`;
  const promptEntries = collectPromptEntries(tree);
  const methods = promptEntries.map(({ method, path }) =>
    `  ${method}(replacements?: Record<string, string>): string {\n    return this._getPrompt([${
      path.map((p) => `'${p}'`).join(", ")
    }], replacements);\n  }`
  )
    .join("\n\n");
  const praultClass =
    `export class Prault {\n  constructor(private _promptsDir: string = 'prompts') {}\n  private _getPrompt(path: string[], replacements?: Record<string, string>): string {\n    const joined = path.join('/');\n    const basePath = join(this._promptsDir, joined);\n    let content;\n    try {\n      content = Deno.readTextFileSync(basePath + '.md');\n    } catch {\n      content = Deno.readTextFileSync(basePath + '.txt');\n    }\n    if (replacements) {\n      for (const [key, value] of Object.entries(replacements)) {\n        content = content.replaceAll('{{{' + key + '}}}', value);\n      }\n    }\n    return content;\n  }\n${methods}\n}\n`;
  const code =
    `// AUTO-GENERATED FILE. DO NOT EDIT.\n\nimport { join } from \"https://deno.land/std@0.224.0/path/mod.ts\";\n\n${promptNameType}${praultClass}`;
  await Deno.writeTextFile(OUTPUT_FILE, code);
  console.log(`Generated ${OUTPUT_FILE}`);
}

if (import.meta.main) {
  main();
}
