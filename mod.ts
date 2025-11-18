// mod.ts
// Public API for the package

import { Prault } from "./prompts.gen.ts";

export interface PraultConfig {
  promptsDir?: string;
}

/**
 * Initialize the prault package with a custom config.
 * Returns a type-safe prompt loader instance.
 * @param config {PraultConfig} - Optional configuration object
 */
export function initPrault(config: PraultConfig = {}) {
  return new Prault(config.promptsDir ?? "prompts");
}
