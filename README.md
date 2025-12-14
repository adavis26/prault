# Prault

**Prompt Vault** | A simple, typesafe, file router based prompt management tool.

[![CI/CD](https://github.com/adavis26/prault/actions/workflows/ci.yml/badge.svg)](https://github.com/adavis26/prault/actions/workflows/ci.yml)
[![JSR](https://jsr.io/badges/@adavisdev/prault)](https://jsr.io/@adavis26/prault)
[![npm](https://img.shields.io/npm/v/prault)](https://www.npmjs.com/package/prault)

Keep prompts organized in files. Get full TypeScript support. Replace messy strings with easy auto completion.

## Quick Start
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

## Features

- **Type-safe prompt access** - Auto-completion for all your prompts
- **Router Based File Detection** - No configuration needed
- **Template Variables** - Replace `{{{KEY}}}` placeholders at runtime
- **Cross-platform** - Works in Deno and Node.js
- **Synchronous** - No async/await headaches for file reading

## Installation

```bash
# NPM
npm install -g prault

# Deno
deno add jsr:@adavisdev/prault
```

## Generate `promt.gen.ts`
```bash
# cli
prault

# npx
npx prault

# deno
deno run -R -W jsr:@adavisdev/prault
```

## Usage

1. Create a `prompts` directory with `.md` or `.txt` files
   ```
   prompts/
   ├── greeting.md
   ├── code-review.md
   └── chat/
       └── welcome-message.md
   ```
2. Run `npx prault` to generate `prompts.gen.ts`
3. Use the generated code in your project

```typescript
import { initPrault } from "./prompts.gen.ts";

const prompts = initPrault();

// Get prompts
const greeting = prompts.greeting();
const personalized = prompts.greeting({ NAME: "Alice" });
```

## File Structure

- `prompts/greeting.md` → `prompts.greeting()`
- `prompts/code/review.md` → `prompts.codeReview()`
- Use `{{{KEY}}}` for template variables

## License

MIT