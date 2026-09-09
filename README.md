# NDC's Scott Allen Memorial Tournament

Static one-page site with registration for the Scott Allen Memorial golf tournament
at Drøbak Golfklubb — Friday 25 September 2026.

Plain HTML / CSS / JS, no build step. Hosted on GitHub Pages.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole page: hero, day schedule, format & Stableford scoring, MatchPlay note, course + hole-by-hole carousel, banquet, registration form |
| `styles.css` | Bold modern tournament styling (NDC green + light grey, Barlow Condensed / Barlow) |
| `script.js` | Builds the 18-hole carousel and handles the registration form via Formspree AJAX |
| `assets/drobak-golf.webp` | Hero photograph (stone footbridge at Drøbak Golfklubb). Replace this file to change the hero image — keep the name. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Registration form

Submissions go to **Formspree** form `mljeoywo`
(endpoint `https://formspree.io/f/mljeoywo`), set as the `action` on `#regForm`
in `index.html`. `script.js` submits it over `fetch` and shows an inline
confirmation; if JS is unavailable the form still POSTs normally to Formspree.

Collected fields: **Name, Email, Golfbox ID, HCP, Playing partner (optional),
Banquet (checkbox)**. A hidden `_gotcha` honeypot filters bots.

To change where mail lands, or to upgrade the plan (free tier = 50 submissions/month),
manage the form at <https://formspree.io>. To point at a different form, replace the
`action` URL on `#regForm`.

## Editing content

- **Hole data / notes** — the `HOLES` array at the top of `script.js`. The static
  scorecard table lower in `index.html` mirrors it; update both if pars change.
- **Schedule, fee, format text** — in `index.html`, sections `#day` / `#format`.
- **Scoring app link** — `https://matchplay.bradford.no`, in `#scoring` and the footer.
- **Hero image** — replace `assets/drobak-golf.webp` (landscape, ~1600px wide).
  The green duotone treatment is CSS (`.hero-tint` / `.hero-scrim` in `styles.css`).
- **Layout note** — the design was authored in Claude Design as
  `Scott Allen Memorial.dc.html`; this repo is the plain static port of it.

## Local preview

No server needed — open `index.html` — or:

```bash
python3 -m http.server 8000
```

then visit <http://localhost:8000>.

## Deploy (GitHub Pages)

Pages is served from the `main` branch root. Push to `main` and it publishes:

```bash
git add -A && git commit -m "Update site" && git push
```

## Custom domain

Add a `CNAME` file containing the bare domain (e.g. `scottallenmemorial.no`),
set an `ALIAS`/`ANAME` or `A` records at the registrar to GitHub Pages, then set
the domain under **Settings → Pages** and enable *Enforce HTTPS*.

### Domain name ideas

Norwegian `.no` needs a registered Norwegian org; `.golf`, `.com`, `.no` shown for range.

- `scottallenmemorial.no` / `.com`
- `scottallencup.com`
- `thescottallen.golf`
- `scottallenmemorial.golf`
- `sammtournament.com` (Scott Allen Memorial)
- `drobakmemorial.com`
- `ndcgolf.no` / `ndcgolf.com`
- `ndcmemorialcup.com`
- `allenmemorialgolf.com`
- `fourballmemorial.com`
