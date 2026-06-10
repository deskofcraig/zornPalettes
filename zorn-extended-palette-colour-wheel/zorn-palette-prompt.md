# Zorn Extended Colour Wheel — Prompt & Base Colour Selections

## Prompt

You are a traditional artist and art historian. You are tasked with creating a 12 base colour colour wheel that is based on the Zorn colour palette. It should contain both a warm and cool curated selection of colours that would feel appropriate with the Zorn palette methodology and extend to the mood and tone of the original Zorn palette.

The wheel should be made of rings with 12 sections in each ring. `baseColors` should mix with `ivory black` to the outside and `titanium white` to the inside.

Ring should have 12 sections. Rings sections from the wheel centre stepping outwards are to be `titanium white`:`{baseColour}`:`ivory black`:

`{baseColor}` + `tint`

| Step | Ratio (W:B:K) |
|------|--------------|
| 100  | 9:1:0        |
| 200  | 4:1:0        |
| 300  | 7:3:0        |
| 400  | 3:2:0        |
| 500  | 1:1:0        |
| 600  | 2:3:0        |
| 700  | 3:7:0        |
| 800  | 2:4:0        |
| 900  | 1:9:0        |

`{baseColor}` — pure — `0:1:0`

`{baseColor}` + `shade`

| Step | Ratio (W:B:K) |
|------|--------------|
| 100  | 0:9:1        |
| 200  | 0:4:2        |
| 300  | 0:7:3        |
| 400  | 0:3:2        |
| 500  | 0:1:1        |
| 600  | 0:2:3        |
| 700  | 0:3:7        |
| 800  | 0:2:4        |
| 900  | 0:1:9        |

---

## Anchor Colours

| Name | Hex | Role |
|---|---|---|
| Titanium White | `#F5F5EF` | Inner anchor — inner rings blend toward this |
| Ivory Black | `#231F1A` | Outer anchor — outer rings blend toward this |

---

## Base Colour Selections

Twelve colours curated to honour the Zorn palette's earthy, luminous temperament — six warm pigments drawn directly from the old-master tradition, six cool counterparts that could have sat alongside Zorn's cadmium red and yellow ochre without disrupting the harmony.

| # | Name | Hex | Temperature | Wheel Position | Pigment Lineage |
|---|---|---|---|---|---|
| 1 | Cadmium Red | `#C8392B` | 🟠 Warm | 0° | Direct Zorn primary — a saturated, slightly orange-leaning red |
| 2 | Venetian Red | `#A34030` | 🟠 Warm | 30° | Iron oxide earth — the red-orange bridge to the sienna family |
| 3 | Burnt Sienna | `#8B4A1C` | 🟠 Warm | 60° | Calcined raw sienna — orange-brown, translucent in oil |
| 4 | Yellow Ochre | `#C4973A` | 🟠 Warm | 90° | Direct Zorn primary — the golden earth yellow he relied upon |
| 5 | Naples Yellow | `#D4B870` | 🟠 Warm | 120° | Lead antimonate — creamy, flesh-adjacent, historic lead yellow |
| 6 | Terre Verte | `#7A8B60` | 🔵 Cool | 150° | Celadonite earth green — the grey-green used since antiquity |
| 7 | Oxide Green | `#4E7A68` | 🔵 Cool | 180° | Chromium oxide / viridian variant — muted, painterly green |
| 8 | Cerulean Grey | `#4E6B82` | 🔵 Cool | 210° | Cobalt stannate — sky blue desaturated to Zorn's tonal range |
| 9 | Prussian Blue | `#2C4868` | 🔵 Cool | 240° | Iron blue — deep, cool, controllable; near-black when shaded |
| 10 | Ultramarine | `#3C4878` | 🔵 Cool | 270° | Synthetic ultramarine — blue-violet, granulating in character |
| 11 | Mars Violet | `#6A3D58` | 🔵 Cool | 300° | Synthetic iron oxide violet — earthy, opaque purple-brown |
| 12 | Caput Mortuum | `#8A3A42` | 🟠 Warm | 330° | "Dead head" iron oxide — deep red-violet, pigment of ruin |

---

## Colour Philosophy

Anders Zorn's four-colour palette — **Ivory Black, Titanium White, Yellow Ochre, Cadmium Red** — achieved luminosity not through spectral completeness but through controlled temperature relationships. Every colour in this extended wheel is chosen to be plausible within that logic:

- **Warm colours (0°–120°, 330°)** extend the red–yellow axis Zorn worked with, adding depth in the orange and ochre registers.
- **Cool colours (150°–300°)** supply the chromatic opposites that Zorn often implied through the temperature contrast of black and white, made explicit here as earthy muted pigments that never stray toward synthetic brightness.
- Each base colour is a *recognised historical pigment name*, grounding the palette in the material world of oil paint.


---

## Expansion: Tertiary Colour Ring (v2)

The wheel was expanded from 12 to 24 segments by interpolating each adjacent base-colour pair at a 1:1 ratio, producing 12 new **tertiary** pigment colours. All 24 now share the same 19-ring tint–shade system (9 tints toward Titanium White, base, 9 shades toward Ivory Black).

### Tier Classification (RYB Colour Theory)

| Tier | Positions | Colours |
|------|-----------|---------|
| **Primary** | 0°, 120°, 240° | Cadmium Red, Naples Yellow, Prussian Blue |
| **Secondary** | 60°, 180°, 300° | Burnt Sienna *(orange)*, Oxide Green *(green)*, Mars Violet *(violet)* |
| **Tertiary** | All remaining 18 | 6 original + 12 new 1:1 mixes |

### New Tertiary Colours (1:1 adjacent mixes)

| Name | Angle | Hex | Mixed From |
|------|-------|-----|-----------|
| Vermilion | 15° | #B63C2E | Cadmium Red + Venetian Red |
| Terra Rosa | 45° | #974526 | Venetian Red + Burnt Sienna |
| Raw Sienna | 75° | #A8702B | Burnt Sienna + Yellow Ochre |
| Aureolin | 105° | #CCA855 | Yellow Ochre + Naples Yellow |
| Olive Earth | 135° | #A7A268 | Naples Yellow + Terre Verte *(warm/cool border)* |
| Sage | 165° | #648264 | Terre Verte + Oxide Green |
| Viridian | 195° | #4E7275 | Oxide Green + Cerulean Grey |
| Slate | 225° | #3D5A75 | Cerulean Grey + Prussian Blue |
| Indigo | 255° | #344870 | Prussian Blue + Ultramarine |
| Dioxazine | 285° | #534268 | Ultramarine + Mars Violet |
| Purple Madder | 315° | #7A3C4D | Mars Violet + Caput Mortuum |
| Alizarin | 345° | #A93A36 | Caput Mortuum + Cadmium Red |
