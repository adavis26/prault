import { assertEquals } from "@std/assert";
import { initPrault } from "../mod.ts";

Deno.test("initPrault creates instance", () => {
  const prault = initPrault();
  assertEquals(typeof prault, "object");
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