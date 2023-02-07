# favicons

<p align="center" gap="16">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@andresmarpz/favicons">
    <img alt="npm shield displaying the current package version" src="https://img.shields.io/npm/v/@andresmarpz/favicons" />
  </a>
  
  <img alt="typescript shield" src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat" />
</p>

Utility package to get favicons from the web. I don't know why, but it's so damn hard to get favicons *just right*. 
You may get different sizes, quality, background and other variables that make it a pain to work with.

## Roadmap

- [Usage](#usage)
- [Favicon](#favicon)
- [getFavicons](#getfavicons)
- [getFavicon](#getfavicon)
- [extractFavicons](#extractfavicons)
- [getFaviconFrom](#getfaviconfrom)
- [getFaviconsFrom](#getfaviconsfrom)

## Usage

Warning: this is a library meant to be run on Node.js (server-side).<br/>
First, install the package:
```bash
npm install @andresmarpz/favicons
```

## Favicon

The Favicon object has the following structure
```ts
interface Favicon {
  url: string;
  size: number; // in bytes
  extension: "ico" | "png" | "gif" | "jpg" | "jpeg" | "svg";
}
```

## getFavicons

This is the most common import, so it's probably what you are looking for.

```ts
import { getFavicons } from '@andresmarpz/favicons';

..
const favicons = await getFavicons('nextjs.org');
..
```

## getFavicon

Function to return only the biggest favicon from an URL.

```ts
import { getFavicon } from '@andresmarpz/favicons';

..
const favicon = await getFavicon('nextjs.org');
..
```

# extractFavicons

Method used to extract favicon hrefs from a html string or head element string. Returns a string[] with urls.

```ts
import { extractFavicons } from '@andresmarpz/favicons';

..
const request = await fetch('nextjs.org');
const html = await request.text();
const favicons = extractFavicons(html);
..
```

# getFaviconFrom

Get the Favicon object from the given URL.

```ts
import { getFaviconFrom } from "favicons";

const favicon = await getFaviconFrom("https://nextjs.com/favicon.ico");
```

# getFaviconsFrom

Get a Favicon[] from a string[] of favicon urls.

```ts
import { requestFavicons } from "favicons";

const favicons = await requestFavicons(["https://nextjs.com/favicon.ico", "https://nextjs.com/favicon.png"]);
```


## Project structure

This repo uses [turborepo](https://turborepo.org) to manage apps and packages in a monorepo setup.

| Codebase | Description |
|:----------|:---------------:|
| [apps/web](apps/web) | Next.js landing |
| [packages/npm](packages/npm) | npm package |
| [packages/local](packages/local) | Local testing |

## Running locally

```bash
$ git clone https://github.com/andresmarpz/favicons.git
$ cd favicons
$ npm i
```
