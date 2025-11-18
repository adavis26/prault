# 🚀 Development

Welcome, fellow developer! 👋 This guide will help you contribute to Prault.

## 🛠️ Development Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/prault.git
   cd prault
   ```

2. **Install dependencies**
   ```bash
   # Deno handles dependencies automatically
   deno --version # Make sure you have Deno installed
   ```

## 🏗️ Building

### Generate Type-Safe Prompts

After adding/modifying prompt files in `prompts/`:

```bash
deno task generate
```

This creates `prompts.gen.ts` with type-safe methods for each prompt file.

### Build for npm

To create the Node.js compatible package:

```bash
deno task build-npm
```

This generates the `./npm` directory with:
- ESM and CommonJS builds
- TypeScript declarations
- Proper package.json for npm publishing

### Test Everything

```bash
# Run tests
deno task test

# Run all checks
deno task build
```

## 📁 Project Structure

```
prault/
├── mod.ts              # Main public API
├── prompts.gen.ts      # Auto-generated prompt loader (gitignored)
├── generate-prompts.ts # Generator script
├── build_npm.ts        # npm build script
├── prompts/            # Example prompts (gitignored)
├── tests/              # Unit tests
├── npm/                # Generated npm package (gitignored)
├── deno.json           # Deno configuration
└── deno.lock           # Dependency lock file
```

## 🔄 Development Workflow

1. **Make changes** to source files
2. **Add/update prompts** in `prompts/` directory
3. **Regenerate types**: `deno task generate`
4. **Run tests**: `deno task test`
5. **Build npm package**: `deno task build-npm`
6. **Test npm package** in a separate project

## 📦 Publishing

### To deno.land/x

```bash
# Tag a release
git tag v1.0.0
git push origin v1.0.0
```

### To npm

```bash
cd npm
npm publish
```

## 🧪 Testing

We use Deno's built-in test runner:

```bash
# Run all tests
deno test --allow-read tests/

# Watch mode
deno test --allow-read --watch tests/
```

## 🤝 Contributing Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Keep the API simple and intuitive
- Make sure builds pass before submitting PRs

## 📋 Available Tasks

Check `deno.json` for all available tasks:

- `deno task generate` - Generate prompt types
- `deno task test` - Run tests
- `deno task build` - Full build and lint
- `deno task build-npm` - Build npm package

Happy coding! 🎉