# 🎭 Prault

**Prompt management made delightful!** ✨

Transform your Markdown and text files into type-safe, templated prompts with zero ceremony. Perfect for AI apps, chatbots, content generation, and anything that needs organized prompt management.

## ✨ Features

- 🎯 **Type-safe prompt access** - Auto-completion for all your prompts
- 🔄 **Template magic** - Replace `{{{KEY}}}` placeholders at runtime
- 🚀 **Cross-platform** - Works in Deno and Node.js
- ⚡ **Synchronous** - No async/await headaches for file reading
- 📁 **Directory-based** - Organize prompts however you like

## 📦 Installation

### For Deno 🦕
```bash
import { initPrault } from "https://deno.land/x/prault/mod.ts";
```

### For Node.js 🟢
```bash
npm install prault
```

```typescript
import { initPrault } from "prault";
```

## 🎉 Quick Start

1. **Create your prompts directory**
   ```bash
   mkdir prompts
   ```

2. **Add some prompt files**
   ```markdown
   <!-- prompts/greeting.md -->
   # Welcome!

   Hello {{{NAME}}}! 👋

   Welcome to our awesome app!
   ```

   ```markdown
   <!-- prompts/code-review.md -->
   # Code Review Guidelines

   Please review this {{{LANGUAGE}}} code for:
   - Security issues
   - Performance optimizations
   - Code style consistency
   ```

3. **Use in your code**
   ```typescript
   import { initPrault } from "prault";

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