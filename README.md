![create-cookie Banner](https://raw.githubusercontent.com/jp-coffee/create-cookie/main/media/create-cookie-banner.png)

**Effortless Cookie Management for React**
Easily get, set, and sync cookies across components with a simple API.

[![npm version](https://img.shields.io/npm/v/create-cookie.svg)](https://www.npmjs.com/package/create-cookie)
[![npm downloads](https://img.shields.io/npm/dt/create-cookie.svg)](https://www.npmjs.com/package/create-cookie)
[![License](https://img.shields.io/github/license/jp-coffee/create-cookie)](LICENSE)
[![Tests Status](https://img.shields.io/github/actions/workflow/status/jp-coffee/create-cookie/lint-and-test.yml?branch=main)](https://github.com/jp-coffee/create-cookie/actions)

## 🚀 Features

- 🍪 **Simplified Cookie Handling** – Manage cookies without manually dealing with `document.cookie`.
- 🔄 **Real-time Updates** – React to cookie changes instantly.
- ⚡ **Lightweight & Dependency-Free** – Minimal impact on your bundle size.
- 🛠 **Easy API** – Get, set, reset, and check cookies effortlessly.
- 📡 **Automatic Expiry Handling** – Set expiration dates and paths with ease.

## 📦 Installation

Install via your preferred package manager:

```sh
# npm
npm install create-cookie

# yarn
yarn add create-cookie

# pnpm
pnpm add create-cookie

# bun
bun add create-cookie
```

## 🔍 Basic Usage

```tsx
"use client";

import { createCookie } from "create-cookie";

const Page: React.FC = () => {
  const theme = createCookie("theme", "light");

  return (
    <div>
      <h1>Theme: {theme.get()}</h1>
      <button onClick={() => theme.set("dark")}>Set Dark Theme</button>
      <button onClick={() => theme.reset()}>Reset Theme</button>
    </div>
  );
};

export default Page;
```

## 🔍 API Reference

### `createCookie<T>(key: string, initialValue?: T, options?: CookieOptions)`

A React hook for reading and updating cookies easily.

#### Parameters

- `key` (string): The key under which the value is stored in cookies.
- `initialValue` (T, optional): The initial value to set if the key does not exist.
- `options` (CookieOptions, optional): Additional settings like `expires` and `path`.

#### Returns

- An object with the following methods:
  - `get()`: Retrieve the current cookie value.
  - `set(value: T, options?: CookieOptions)`: Update the cookie value.
  - `reset()`: Clear the cookie.
  - `hasValue()`: Check if the cookie exists.

## 💡 Examples

### Storing User Preferences

```tsx
"use client";

import { createCookie } from "create-cookie";

const Page: React.FC = () => {
  const language = createCookie("language", "en");

  return (
    <div>
      <h1>Language: {language.get()}</h1>
      <button onClick={() => language.set("fr")}>Set to French</button>
    </div>
  );
};

export default Page;
```

### Using Expiry Dates

```tsx
"use client";

import { createCookie } from "create-cookie";

const Page: React.FC = () => {
  const sessionToken = createCookie("session", "", { expires: 7 });

  return (
    <div>
      <h1>Session Token: {sessionToken.get()}</h1>
      <button onClick={() => sessionToken.set("abc123", { expires: 7 })}>
        Set Token (Expires in 7 days)
      </button>
    </div>
  );
};

export default Page;
```

## 🔒 Security & Provenance

This package is published with NPM package provenance, which provides supply chain security by cryptographically linking the published package to its source code and build process.

### Verifying Package Provenance

You can verify that this package was built from the source code in this repository:

```bash
# Install the package
npm install create-cookie

# Verify the provenance
npm audit signatures

# Or use the provided verification script
npm run verify-provenance
```

### What This Provides

- **Supply Chain Security**: Prevents malicious package injection
- **Trust**: Verify package authenticity and origin
- **Transparency**: Links packages to source code and build process
- **Compliance**: Meets security requirements for many organizations

For more information about NPM package provenance, see the [official documentation](https://docs.npmjs.com/generating-provenance-statements).

## 🛠 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Created By

This package is developed and maintained by [JP.Coffee](https://github.com/jp-coffee). Feel free to reach out or open an issue for any questions or suggestions!
