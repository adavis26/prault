# Prault

A TypeScript library for managing and templating prompts from Markdown or text files.

## Features

- Type-safe prompt access with auto-completion
- Template replacement in prompts using `{{{KEY}}}` placeholders
- Support for both Deno and Node.js
- Synchronous file reading for easy usage

## Installation

### Deno

```bash
import { initPrault } from "https://deno.land/x/prault/mod.ts";
```

### npm

```bash
npm install prault
```

```typescript
import { initPrault } from "prault";
```

## Usage

1. Create a `prompts` directory with your prompt files (`.md` or `.txt`).

2. Run the generator to create type-safe access:
   ```bash
   deno run --allow-read --allow-write https://deno.land/x/prault/generate-prompts.ts
   ```

3. Use in your code:

```typescript
import { initPrault } from "prault";

const prault = initPrault({ promptsDir: "./prompts" });

// Get a prompt
const prompt = prault.example();

// With template replacement
const personalized = prault.greeting({ "NAME": "World" });
```

## Prompt Files

Prompts are Markdown or text files. Use `{{{KEY}}}` for placeholders:

```markdown
# Greeting

Hello {{{NAME}}}!

Welcome to our app.
```

## API

### `initPrault(config?: PraultConfig): Prault`

Initializes the prompt loader.

- `config.promptsDir`: Path to the prompts directory (default: `"prompts"`)

Returns a `Prault` instance with methods for each prompt file.

### Prompt Methods

Each prompt file becomes a method on the `Prault` instance:

- `prault.filename(replacements?: Record<string, string>): string`

## Building for npm

To build the npm package:

```bash
deno task build-npm
```

This generates a `./npm` directory with the Node.js compatible code.

## License

MIT