# Table Menu

## Requirement
- Node 20
- Cloudflare Account

## Develop
- Duplicate `wrangler.sample.jsonc` to `wrangler.jsonc`
- Edit `<D1_NAME>` and `<D1_DATABASE_ID>` to match D1 database created on Cloudflare
- run `npm install`
- run `npx wrangler d1 migrations apply table-order` to create local SQLite database
- run `npm run dev`

## Deployment
- run `npm run deploy`
- run `npx wrangler d1 migrations apply table-order --remote` to apply dabase change on Cloudflare
