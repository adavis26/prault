import { assertEquals } from "@std/assert";
import { initPrault } from "../mod.ts";

// Mock file system for unit tests
const mockPrompts = {
  "test.md": `# Overview
Hello {{{SOME_VALUE}}}

## Rules
* do
* something
* crazy`
};

// Mock Deno.readTextFileSync
const originalReadTextFileSync = Deno.readTextFileSync;

function setupMockFileSystem() {
  // @ts-ignore - mocking for tests
  Deno.readTextFileSync = (path: string | URL) => {
    const pathStr = typeof path === 'string' ? path : path.pathname;
    if (pathStr.endsWith('test.md')) {
      return mockPrompts["test.md"];
    }
    throw new Error(`File not found: ${pathStr}`);
  };
}

function teardownMockFileSystem() {
  Deno.readTextFileSync = originalReadTextFileSync;
}

Deno.test("initPrault creates instance", () => {
  const prault = initPrault();
  assertEquals(typeof prault, "object");
});

Deno.test("prompt loading works", () => {
  setupMockFileSystem();
  try {
    const prault = initPrault();
    const prompt = prault.test();
    assertEquals(typeof prompt, "string");
    assertEquals(prompt.includes("# Overview"), true);
  } finally {
    teardownMockFileSystem();
  }
});

Deno.test("template replacement works", () => {
  setupMockFileSystem();
  try {
    const prault = initPrault();
    const prompt = prault.test({ "SOME_VALUE": "Deno" });
    assertEquals(prompt.includes("Hello Deno"), true);
  } finally {
    teardownMockFileSystem();
  }
});