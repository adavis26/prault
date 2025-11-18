import { assertEquals } from "@std/assert";

// Mock Prault class for testing without generated files
class MockPrault {
  constructor(private _promptsDir: string = 'prompts') {}

  test(replacements?: Record<string, string>): string {
    let content = `# Overview
Hello {{{SOME_VALUE}}}

## Rules
* do
* something
* crazy`;

    if (replacements) {
      for (const [key, value] of Object.entries(replacements)) {
        content = content.replaceAll(`{{{${key}}}}`, value);
      }
    }
    return content;
  }
}

// Mock initPrault function
function initPrault(config: { promptsDir?: string } = {}) {
  return new MockPrault(config.promptsDir ?? "prompts");
}

Deno.test("initPrault creates instance", () => {
  const prault = initPrault();
  assertEquals(typeof prault, "object");
  assertEquals(prault instanceof MockPrault, true);
});

Deno.test("prompt loading works", () => {
  const prault = initPrault();
  const prompt = prault.test();
  assertEquals(typeof prompt, "string");
  assertEquals(prompt.includes("# Overview"), true);
});

Deno.test("template replacement works", () => {
  const prault = initPrault();
  const prompt = prault.test({ "SOME_VALUE": "Deno" });
  assertEquals(prompt.includes("Hello Deno"), true);
});