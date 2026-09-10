# GOLF MATCH — logo assets

The mark: two hole-strip bars rising into a flagstick — the same shape that carries match state on every scoring screen.

## Geometry (100-unit box)
Bars: width 9.5, radius w/3, heights 26 and 37.6, sitting on a baseline at y=80.
Flagstick: width 5.9, height 52, radius w/2. Pennant: 17 x 13.5 from the stick, points (0 0) (100% 44%) (0 88%), overlapping the stick by 45% of its width so the rounded cap shows no notch.
Gap between elements 5.5. The SVGs' viewBox is cropped to this bounding box — pad it yourself when placing.

## Colour
| Role | Hex |
| --- | --- |
| Green — pin, brand | `#00a651` |
| Green deep — type under 24px, hover | `#00803f` |
| Ink | `#0e1a13` |
| Bars on white | `#0e1a13` |
| Bars on green | `#0e5c33` |
| Pin + MATCH on dark | `#3ecf7a` |
| Bars on dark | `#4a5a50` |
| Bars, one-colour ink version | `#9aa8a0` |

Wordmark: Inter 600, caps, stacked, line-height .98, letter-spacing .02em. GOLF ink, MATCH `#00a651` at 24px and up, `#00803f` below that for contrast. On a green ground both words are white.

## Files
**SVG is the master** — use it anywhere vectors are accepted (the raster lockups substitute the system sans if Inter is absent).

Marks, transparent: `mark-green.svg`, `mark-white.svg`, `mark-mint.svg`, `mark-ink.svg` (+ `mark-*-512.png`)
App icon: `app-icon-ink.svg`, `app-icon-light.svg`, `app-icon-ink-{1024,512,180,152,120}.png`, `app-icon-light-{1024,512,180}.png`
Favicon: `favicon.svg`, `favicon-dark.svg`, `favicon-{16,32,48,64,256}.png`, `favicon-dark-{32,64}.png`
Lockups: `lockup-primary`, `lockup-on-green`, `lockup-on-dark`, `lockup-ink` (.svg + .png)

## HTML
```html
<link rel="icon" href="/brand/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/brand/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/brand/app-icon-ink-180.png">
```

## Clear space and minimum size
Clear space on all sides = the width of one bar (0.095 of the mark's height). Minimum mark size 16px; minimum lockup height 20px. Don't recolour outside the table above, don't outline it, don't set the wordmark in another face.
