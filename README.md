# Database Valuation Calculator

A lead-magnet calculator for real estate agents. An agent enters the size of their
dormant lead database, their average commission, and where those leads came from;
the calculator shows the commission sitting unrecovered in the archive and points
them at a discovery call for the $997 Reactivation Pilot.

## Two builds, one model

| File | What it is | Use it for |
|---|---|---|
| `App.tsx` + `components/` | The React/Vite app. **Canonical.** | Development, and the standalone hosted page. |
| `calculator_embed.html` | Single-file port — React 18 UMD + Babel from CDN, no build step. | Dropping into a page you don't control (Webflow, WordPress, a landing page builder). |

The embed is a **port, not a source of truth**. It duplicates the model, the copy
and the styling so it can run from one `<script>` tag with no bundler. If you
change rates, math, copy or the CTA in the React app, mirror it into
`calculator_embed.html` in the same commit — otherwise the two will quote
different numbers for the same inputs.

React 18 UMD in the embed is deliberate: React 19 no longer ships UMD builds, and
the embed has to run without a bundler.

## Before you ship

`BOOKING_URL` is a placeholder. Replace it in **both** places:

- `config.ts` — the React app
- the `--- CONFIG ---` block in `calculator_embed.html`

The CTA appends the prospect's figures to that URL as query params
(`leads`, `commission`, `lead_source`, `est_deals`, `est_value`, plus
`utm_source=database-valuation-calculator`) so the call opens with their numbers.
Note that this puts those figures in the booking tool's URLs and referrer logs.

## Run locally

Requires Node.js.

```bash
npm install
npm run dev      # dev server on http://localhost:3000
npm run build    # production bundle into dist/
npm run preview  # serve the built bundle
```

For the embed, open `calculator_embed.html` in a browser — no install needed, but
it does need network access for the Tailwind, React and Babel CDNs.

## The model

Defined in `types.ts` (`LEAD_SOURCES`) and computed in `App.tsx`:

```
recoverableDeals = floor(leads × recoveryRate)
pipelineValue    = recoverableDeals × commission
```

Recovery rate comes from the selected lead source:

| Lead source | Rate |
|---|---|
| Mostly Internet/Facebook Leads | 1.5% |
| Mixed / Data Scrapes | 2.5% |
| Referrals / Direct Mail | 4.0% |

The guarantee in `GuaranteeCard` is separate: one booked appointment per 100
leads, capped at 5.

To change a rate, edit `types.ts` and mirror it into the `LEAD_SOURCES` array in
`calculator_embed.html`.

## Layout

```
App.tsx                    state + the valuation math
config.ts                  BOOKING_URL and the CTA URL builder
types.ts                   LeadSourceType, LEAD_SOURCES and the rates
utils.ts                   currency/number formatting
components/
  InputSlider.tsx          database size, slider + number field
  CurrencyInput.tsx        average commission
  LeadSourceSelect.tsx     lead source, which picks the recovery rate
  ValuationDisplay.tsx     the headline loss figure and the CTA
  GuaranteeCard.tsx        the "Pilot" promise and refund terms
calculator_embed.html      single-file port of all of the above
```

This project was scaffolded from AI Studio:
https://ai.studio/apps/drive/1mlV6N6e0pGPnDyRNf3fo-D8LgZXEcDFE
