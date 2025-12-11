# Prault

**Prompt Vault** | A simple, typesafe, file router based prompt management tool.

[![CI/CD](https://github.com/adavis26/prault/actions/workflows/ci.yml/badge.svg)](https://github.com/adavis26/prault/actions/workflows/ci.yml)
[![JSR](https://jsr.io/badges/@adavis26/prault)](https://jsr.io/@adavis26/prault)
[![npm](https://img.shields.io/npm/v/prault)](https://www.npmjs.com/package/prault)

Transform your Markdown and text files into type-safe, templated prompts with zero ceremony. Perfect for AI apps, chatbots, content generation, and anything that needs organized prompt management.
## Overview
```
> npx prault
Generated prompts.gen.ts

// main.ts
import { initPrault } from 'prault';

const prompts = initPrault()

prompts.test()
// I am a test prompt!

prompts.hello({NAME: "adam"})
// Hello adam
```

## ✨ Features

- **Type-safe prompt access** - Auto-completion for all your prompts
- **Router Based File Detection** - No configuration needed
- **Template Variables** - Replace `{{{KEY}}}` placeholders at runtime
- **Cross-platform** - Works in Deno and Node.js
- **Synchronous** - No async/await headaches for file reading

## 📦 Installation

### For Deno
```bash
import { initPrault } from "./prompts.gen.ts";
```

### For Node.js
```bash
# After generating prompts.gen.ts
import { initPrault } from "./prompts.gen.js";
```

## 🎉 Quick Start

1. **Install the package** (contains the code generator)

2. **Create your prompts directory**
   ```bash
   mkdir prompts
   ```

3. **Add some prompt files**
   ```markdown
   <!-- prompts/greeting.md -->
   # Welcome!

   Hello {{{NAME}}}! 👋

   Welcome to our awesome app!
   ```

4. **Generate your type-safe code**
   ```bash
   # If using the published npm package
   npx prault

   # Or if using Deno directly
   deno run --allow-read --allow-write npm:prault
   ```

5. **Use in your code**
   ```typescript
   import { initPrault } from "./prompts.gen.ts";

   const prompts = initPrault();

   // Get a prompt
   const greeting = prompts.greeting();
   console.log(greeting);
   // "Hello {{{NAME}}}! 👋\n\nWelcome to our awesome app!"

   // With template replacement
   const personalized = prompts.greeting({ NAME: "Alice" });
   console.log(personalized);
   // "Hello Alice! 👋\n\nWelcome to our awesome app!"

   // Type-safe auto-completion for all your prompts!
   const review = prompts.codeReview({ LANGUAGE: "TypeScript" });
   ```

## 🎨 Prompt Files

Prault works with `.md` and `.txt` files. Use `{{{KEY}}}` for dynamic content:

```markdown
# My Amazing Prompt

This is some static content.

Here's the dynamic part: {{{USER_INPUT}}}

And here's another: {{{CONTEXT}}}
```

**File naming becomes method names:**
- `greeting.md` → `prompts.greeting()`
- `code-review.md` → `prompts.codeReview()`
- `nested/deep/thought.md` → `prompts.nestedDeepThought()`

## 🔧 API

### `initPrault(config?: PraultConfig)`

Creates your prompt loader instance.

```typescript
const prompts = initPrault({
  promptsDir: "./my-prompts" // defaults to "./prompts"
});
```

### Prompt Methods

Each `.md`/`.txt` file becomes a method:

```typescript
// Synchronous string return
const content: string = prompts.yourPromptName();

// With replacements
const content: string = prompts.yourPromptName({
  KEY: "value",
  ANOTHER_KEY: "another value"
});
```

## 🤝 Contributing

Want to help make Prault even better? Check out our [development docs](./DEVELOPMENT.md) for build instructions, testing, and contribution guidelines!

## 📄 License

MIT - Go build something awesome! 🚀