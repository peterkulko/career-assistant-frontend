# Career Assistant — Frontend

Web client for tracking job applications. Built with [Next.js](https://nextjs.org) (App Router), React 19, Tailwind CSS 4, shadcn/ui (Base UI), React Hook Form and Zod.

## Backend

This app talks to the REST API in the companion repository:
**[career-assistant-backend](https://github.com/peterkulko/career-assistant-backend)**

Run the backend first and make sure it is reachable at the URL you set in `API_BASE_URL`.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root:

   ```bash
   API_BASE_URL=http://localhost:4000
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Script              | Description                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| `npm run dev`       | Start the dev server                                                                                |
| `npm run build`     | Create a production build                                                                           |
| `npm run start`     | Run the production build                                                                            |
| `npm run lint`      | Lint with ESLint                                                                                    |
| `npm run typecheck` | Type-check with `tsc`                                                                               |
| `npm run format`    | Format with Prettier                                                                                |
| `npm run gen:types` | Regenerate `src/types/api.d.ts` from the backend OpenAPI schema (`http://localhost:4000/docs-json`) |

## Project Structure

```
src/
├── app/          # Routes (App Router): pages, layouts, server actions
├── components/   # Shared components and shadcn/ui primitives
├── lib/          # Utilities and API helpers
└── types/        # Generated API types
```
