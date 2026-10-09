# Portfolio

React + Vite + TypeScript + Tailwind CSS. No backend.

## Run locally
    npm install
    npm run dev

## Edit content
Open the site and press **Edit site** (top right). Text and images are editable in place.
Use the **Manage** tab for colors, renaming/reordering/hiding tabs, adding pages, and backup.

## Make edits permanent for all visitors
Edits live in your browser (localStorage). In Manage, click **Download backup**, save the file as
`public/site-data.json`, commit, and redeploy. Visitors with no saved edits will load it.

## Deploy on Render (Static Site)
1. Push this folder to a GitHub repo.
2. Render dashboard > New > Blueprint (uses render.yaml), or New > Static Site with:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Rewrite rule: `/*` to `/index.html`
