# NDC's Scott Allen Memorial Tournament

Static two-page site with registration for the Scott Allen Memorial golf tournament
at Drøbak Golfklubb — Friday 25 September 2026.

Plain HTML / CSS / JS, no build step. Hosted on GitHub Pages.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Tournament page: hero, day schedule, format & Stableford scoring, Golf Match note, course + hole-by-hole flyover films, banquet, registration form |
| `about.html` | About Scott page: in memoriam, how he came back to golf, and why the tournament is played ("Why we play"). Shares the header, footer and stylesheet with `index.html` |
| `styles.css` | Bold modern tournament styling (NDC green + light grey, Barlow Condensed / Barlow) — shared by both pages |
| `script.js` | Builds the 18-hole flyover-film selector and handles the registration form (open/closed toggle + Formspree AJAX). Loaded by `index.html` only |
| `assets/drobak-golf.webp` | Hero photograph (stone footbridge at Drøbak Golfklubb). Replace this file to change the hero image — keep the name. |
| `assets/scott-portrait.jpg`, `florida-tee.jpg`, `pair-driver.jpg` | Photos on `about.html`. Pre-compressed / resized — regenerate at similar dimensions if replaced. |
| `assets/brand/` | Golf Match logo assets (marks, lockups, favicon) + `brand/README.md` spec |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Registration form

Submissions go to **Formspree** form `mljeoywo`
(endpoint `https://formspree.io/f/mljeoywo`), set as the `action` on `#regForm`
in `index.html`. `script.js` submits it over `fetch` and swaps the form for an
inline confirmation; if JS is unavailable the form still POSTs normally to Formspree.

Collected fields: **Name, Email, Phone, Golfbox ID, HCP, Playing partner (optional),
Banquet (checkbox, checked by default)**. A hidden `_gotcha` honeypot filters bots.
Required fields use the browser's native validation — no custom indicator or error styling.

To close entries, set `REGISTRATION_OPEN = false` near the top of `script.js` — the
form is replaced by the "entries closed" panel (`#regClosedPanel`).

To change where mail lands, or to upgrade the plan (free tier = 50 submissions/month),
manage the form at <https://formspree.io>. To point at a different form, replace the
`action` URL on `#regForm`.

## Editing content

- **Hole data** — the `HOLES` array at the top of `script.js` (par / stroke index /
  metres / YouTube video id per hole). The flyover-film selector in `#course` is
  built from it; there is no separate scorecard table to keep in sync.
- **Flyover stills** are hotlinked from `img.youtube.com` (`maxresdefault`, falling
  back to `hqdefault`). Cache them under `assets/` if you'd rather not depend on that.
- **Schedule, fee, format text** — in `index.html`, sections `#day` / `#format`.
- **Scoring app link** — `https://matchplay.bradford.no`, in `#scoring` and the footer.
  (The product is branded "Golf Match"; the domain is still `matchplay.bradford.no`.)
- **About Scott copy** — `about.html`. The "Why we play" text is first-person in
  Jakob Bradford's voice.
- **Hero image** — replace `assets/drobak-golf.webp` (landscape, ~1600px wide).
  The green duotone treatment is CSS (`.hero-tint` / `.hero-scrim` in `styles.css`).
- **Nav** — the header menu is duplicated in `index.html` and `about.html` and must
  stay identical. On `about.html` the "About Scott" item is a non-link `<span class="nav-current">`
  and the other items point at `index.html#…`. There is no mobile nav yet — below
  ~720px the non-button links are hidden.
- **Layout note** — the design was authored in Claude Design as
  `Scott Allen Memorial.dc.html` / `About Scott.dc.html`; this repo is the plain
  static port of it.

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
