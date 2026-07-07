# Portfolio Website

Personal portfolio of Mohammed Nayeem — Senior React.js Developer. A single-page,
dark-themed site with About, Experience, Skills, Projects, and Contact sections.

Live: https://portfolio-2-0-itsmohammednayeem.vercel.app/

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/), built with [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling, [Framer Motion](https://www.framer.com/motion/) for animations
- [Sanity](https://www.sanity.io/) as the content backend — content is fetched at build time
  into a static JSON snapshot, so the deployed site is fully static (no server, no runtime CMS calls)
- Deployed on [Vercel](https://vercel.com/) as a static build

## Getting started

```sh
git clone https://github.com/itsMohammedNayeem/porfolio-2.0.git
cd porfolio-2.0
npm install
npm run dev
```

`npm run dev` (and `npm run build`) first runs `scripts/fetch-content.mjs`, which pulls
the latest content from Sanity into `src/data/content.json`. No environment variables
are required — see `.env.example`.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | fetch content + start the Vite dev server |
| `npm run build` | fetch content + type-check + production build to `dist/` |
| `npm run preview` | serve the production build locally |
| `npm run lint` | ESLint |
| `npm run fmt` | Prettier |

## Content management (Sanity Studio)

The Sanity Studio lives in [`sanity/`](sanity/) as a standalone project
(schemas: `pageInfo`, `experience`, `skill`, `project`, `social`):

```sh
cd sanity
npm install
npm run dev   # local studio on http://localhost:3333
```

Content changes appear on the site after the next deploy (the build re-fetches content).
