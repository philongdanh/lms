# LMS Documentation

Documentation site for LMS (Learning Management System) - Contains
specifications, guides, API docs, and design system documentation.

This repository uses Docusaurus to provide a beautiful documentation experience.

## Prerequisites

- Node.js 18 or newer
- npm (bundled with Node.js)

## Install

```bash
npm install
```

## Run locally

```bash
npm start
```

Then open http://localhost:3000 to view the site. Docs are served under `/docs`.

## Build for production

```bash
npm run build
```

Static assets are emitted to the `build` directory. You can preview the
production build locally with:

```bash
npm run serve
```

## Structure

- Docusaurus config: `docusaurus.config.js`
- Docs content source: `docs/vi`
- Auto-generated sidebar: `sidebars.js`
- Homepage: `src/pages/index.mdx`
- Custom styles: `src/css/custom.css`
- Static assets: `static/`
