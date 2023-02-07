# favicons

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@andresmarpz/favicons">
    <img alt="npm shield displaying the current package version" src="https://img.shields.io/npm/v/@andresmarpz/favicons" />
  </a>
</p>

Utility package to get favicons from the web. I don't know why, but it's so damn hard to get favicons *just right*. 
You may get different sizes, quality, background and other variables that make it a pain to work with.

## Roadmap

- [Usage](#usage)
- [getFavicons](#getfavicons) 

## Usage

Warning: this is a library meant to be run on Node.js (server-side)
First, install the package:
```bash
npm install @andresmarpz/favicons
```

## getFavicons

The most common one is <code>getFavicons</code>. This probably is the import you are looking for.

```ts
import { getFavicons } from '@andresmarpz/favicons';

..
const favicons = await getFavicons('nextjs.org');
..
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
