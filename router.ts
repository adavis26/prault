// File-based prompt router for Deno
// Scans the prompts directory and provides typesafe access to prompt files

import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

const PROMPTS_DIR = join(Deno.cwd(), "prompts");

// Recursively get all prompt file names (without extension, relative to prompts/)
export async function getPromptNames(dir: string = PROMPTS_DIR, prefix = ""): Promise<string[]> {
    const names: string[] = [];
    for await (const entry of Deno.readDir(dir)) {
        if (entry.isFile && entry.name.match(/\.(prompt|txt)$/)) {
            names.push(prefix + entry.name.replace(/\.[^.]+$/, ""));
        } else if (entry.isDirectory) {
            const subNames = await getPromptNames(join(dir, entry.name), prefix + entry.name + "/");
            names.push(...subNames);
        }
    }
    return names;
}

// Typesafe prompt name (populated at runtime)
export type PromptName = string;

// Typesafe loader for prompt files
export async function getPrompt(name: PromptName): Promise<string> {
  // Support nested paths
  const filePath = join(PROMPTS_DIR, name + ".md"); // Adjust extension as needed
  return await Deno.readTextFile(filePath);
}

// For static type safety, you can generate PromptName as a union type if you want to predefine prompt files.
// For now, this is dynamic and will work as soon as you add files to the prompts folder.