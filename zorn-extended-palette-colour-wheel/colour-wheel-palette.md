# Zorn Colour Harmony Studio — Colour Wheel Palette

## Overview

A 24-pigment extended colour wheel built on a traditional oil painting palette vocabulary, with 19 tonal rings per colour interpolated between two anchor extremes — **Titanium White** (`#F5F5EF`) and **Ivory Black** (`#231F1A`).

The system is designed for UI colour harmony work: selecting a tint or shade on the wheel propagates consistently across harmony rules, 60–30–10 role assignments, and WCAG contrast checking.

---

## Anchor Colours

| Token | Hex | Role |
|---|---|---|
| `titanium-white` | `#F5F5EF` | Warm off-white — tint mixing target |
| `ivory-black` | `#231F1A` | Deep warm black — shade mixing target |

All 19 tonal rings are computed by linear interpolation in sRGB between each base pigment colour and the two anchors.

---

## Tonal Ring System

Each colour has **19 rings** labelled from lightest to darkest:

| Ring | Label | Direction |
|---|---|---|
| `t100` | T100 | Lightest tint (≈95% Titanium White) |
| `t200` | T200 | |
| `t300` | T300 | |
| `t400` | T400 | |
| `t500` | T500 | |
| `t600` | T600 | |
| `t700` | T700 | |
| `t800` | T800 | |
| `t900` | T900 | Darkest tint (≈10% Titanium White) |
| `base` | Base | The named pigment colour |
| `s100` | S100 | Lightest shade (≈10% Ivory Black) |
| `s200` | S200 | |
| `s300` | S300 | |
| `s400` | S400 | |
| `s500` | S500 | |
| `s600` | S600 | |
| `s700` | S700 | |
| `s800` | S800 | |
| `s900` | S900 | Deepest shade (≈95% Ivory Black) |

Tints blend toward Titanium White; shades blend toward Ivory Black. Both anchors are warm-shifted, which gives the tonal scale a cohesive warm undertone throughout.

---

## The 24 Pigments

### Tier System

| Tier | Count | Purpose |
|---|---|---|
| **Primary** | 3 | Structural hue anchors — maximum separation (120° apart) |
| **Secondary** | 3 | Midpoints between primaries (60° apart) |
| **Tertiary** | 18 | Intermediate hues at 15° intervals |

### Full Pigment Table

| # | Name | Slug | Angle | Tier | Warm | Base Hex |
|---|---|---|---|---|---|---|
| 0 | Cadmium Red | `cadmium-red` | 0° | Primary | ✓ | `#C8392B` |
| 1 | Vermilion | `vermilion` | 15° | Tertiary | ✓ | `#B63C2E` |
| 2 | Venetian Red | `venetian-red` | 30° | Tertiary | ✓ | `#A34030` |
| 3 | Terra Rosa | `terra-rosa` | 45° | Tertiary | ✓ | `#974526` |
| 4 | Burnt Sienna | `burnt-sienna` | 60° | Secondary | ✓ | `#8B4A1C` |
| 5 | Raw Sienna | `raw-sienna` | 75° | Tertiary | ✓ | `#A8702B` |
| 6 | Yellow Ochre | `yellow-ochre` | 90° | Tertiary | ✓ | `#C4973A` |
| 7 | Aureolin | `aureolin` | 105° | Tertiary | ✓ | `#CCA855` |
| 8 | Naples Yellow | `naples-yellow` | 120° | Primary | ✓ | `#D4B870` |
| 9 | Olive Earth | `olive-earth` | 135° | Tertiary | ✓ | `#A7A268` |
| 10 | Terre Verte | `terre-verte` | 150° | Tertiary | — | `#7A8B60` |
| 11 | Sage | `sage` | 165° | Tertiary | — | `#648264` |
| 12 | Oxide Green | `oxide-green` | 180° | Secondary | — | `#4E7A68` |
| 13 | Viridian | `viridian` | 195° | Tertiary | — | `#4E7275` |
| 14 | Cerulean Grey | `cerulean-grey` | 210° | Tertiary | — | `#4E6B82` |
| 15 | Slate | `slate` | 225° | Tertiary | — | `#3D5A75` |
| 16 | Prussian Blue | `prussian-blue` | 240° | Primary | — | `#2C4868` |
| 17 | Indigo | `indigo` | 255° | Tertiary | — | `#344870` |
| 18 | Ultramarine | `ultramarine` | 270° | Tertiary | — | `#3C4878` |
| 19 | Dioxazine | `dioxazine` | 285° | Tertiary | — | `#534268` |
| 20 | Mars Violet | `mars-violet` | 300° | Secondary | — | `#6A3D58` |
| 21 | Purple Madder | `purple-madder` | 315° | Tertiary | — | `#7A3C4D` |
| 22 | Caput Mortuum | `caput-mortuum` | 330° | Tertiary | ✓ | `#8A3A42` |
| 23 | Alizarin | `alizarin` | 345° | Tertiary | ✓ | `#A93A36` |

---

## Harmony Rules

The studio supports 7 harmony types derived from the primary colour's wheel position. All take a **spread** parameter (1–4×, i.e. 15°–60° per step):

| ID | Name | Description | 5-slot formula |
|---|---|---|---|
| `cp` | Complementary | Opposite + flanks | `[ci−s, ci, ci+s, ci+12−s, ci+12+s]` |
| `sp` | Split-comp | Near-complement split | `[ci−s, ci, ci+s, ci+12−2s, ci+12+2s]` |
| `an` | Analogous | Adjacent hues | `[ci−2s, ci−s, ci, ci+s, ci+2s]` |
| `tr` | Triadic | Three equidistant + flanks | `[ci, ci+8−s, ci+8, ci+8+s, ci+16]` |
| `te` | Tetradic | Four 90° + spread extra | `[ci, ci+6, ci+12, ci+18, ci+s]` |
| `mo` | Monochromatic | Single hue, five tonal depths | Ring set varies by spread (see below) |
| `cu` | Custom | Free assignment | — |

### Monochromatic ring sets by spread

| Spread | Rings |
|---|---|
| 1× (15°) | T300, T600, Base, S400, S700 |
| 2× (30°) | T200, T500, Base, S500, S800 |
| 3× (45°) | T100, T400, Base, S600, S900 |
| 4× (60°) | T100, T300, Base, S700, S900 |

---

## Token Naming Convention

```
color.<slug>.<ring>
```

Examples:
- `color.prussian-blue.base` → `#2C4868`
- `color.cadmium-red.t300` → `#E8BDB4`
- `color.yellow-ochre.s500` → `#634F27`
- `color.anchor.titanium-white` → `#F5F5EF`

DTCG alias syntax: `{color.prussian-blue.s200}` resolves to `#293A4E`.

---

## CSS Usage

```css
/* Direct token reference */
background: var(--color-prussian-blue-base);   /* #2C4868 */
color:      var(--color-titanium-white);        /* #F5F5EF */

/* Zorn warm palette semantic alias */
background: var(--zorn-warm-vermilion);         /* #B63C2E */

/* Theme token */
background: var(--theme-bg);
color:      var(--theme-text-primary);
```

---

## WCAG Compliance Notes

- Dark theme text (`#F2EDE8`) on background (`#18161A`): **15.5:1** — AAA ✓
- Light theme text (`#18161A`) on background (`#F8F5F0`): **16.5:1** — AAA ✓
- Tints T100–T400 are generally suitable as light-mode surfaces; S600–S900 for dark-mode surfaces.
- The studio auto-suggests the nearest AA/AAA ring pair for each role colour.
