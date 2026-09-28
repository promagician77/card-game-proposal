# Card game production proposal

Static site (HTML, CSS, JS). No build step, no dependencies.

## Tabs
- **Live demo** - card layout system (print file with bleed and crop marks, cut card, fanned hand, layout zones, colorblind and grayscale tests, table-distance view) and a tuck box that sizes itself from card size, card stock, and card count, with a 3D preview and a flat dieline.
- **Production specs** - print file standards and playability checks.
- **Delivery** - three-week plan, deliverables, and the opening question for the client.

The sample game "Lantern Market" and all its artwork are original and drawn in code.

## Run locally
```
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel
CLI: `npm run deploy`, log in, accept the defaults.

GitHub: push this folder, then in Vercel choose Add New > Project, import the repo, pick "Other" as the framework, and leave build settings empty.

## Before sending
- Rename the Vercel project so the URL looks professional, e.g. `josinaldo-card-game.vercel.app`.
- No email, phone, or booking links - Upwork does not allow contact details before a contract.
- Direct links: `/#spec` opens Production specs, `/#plan` opens Delivery.
