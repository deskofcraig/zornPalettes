# Zorn Palette — System Reference & AI Prompt Guide

## What is the Zorn Palette?

The **Zorn palette** is a four-pigment oil painting system attributed to Swedish realist **Anders Zorn (1860–1920)**. By restricting himself to four pigments, Zorn achieved tonally unified paintings with exceptional skin-tone range.

### Traditional Warm Zorn Palette

| Pigment | Role | Closest wheel colour | Hex |
|---|---|---|---|
| Titanium White | Tint anchor | `anchor / titanium-white` | `#F5F5EF` |
| Ivory Black | Shade anchor + low-chroma cool | `anchor / ivory-black` | `#231F1A` |
| Vermilion | Warm red | `vermilion` (index 1, 15°) | `#B63C2E` |
| Yellow Ochre | Warm yellow-brown | `yellow-ochre` (index 6, 90°) | `#C4973A` |

The palette produces skin tones, ochres, siennas, and all warm tonal greys by mixing these four pigments. It cannot produce true blues, greens, or purple-reds — the absence is part of its signature warmth.

---

## Extended Wheel Mapping

### Warm Zorn Achievable Range — `ZW`

Indices `[0, 1, 2, 3, 4, 5, 6, 7, 8]` — the arc from **Cadmium Red (0°)** to **Naples Yellow (120°)**. Every colour in this arc can be approximated by mixing Vermilion and Yellow Ochre in varying proportions with TW and IB.

| Index | Name | Angle | Achieved by |
|---|---|---|---|
| 0 | Cadmium Red | 0° | Vermilion heavy |
| 1 | Vermilion | 15° | **Primary pigment** |
| 2 | Venetian Red | 30° | Vermilion + trace Yellow Ochre |
| 3 | Terra Rosa | 45° | Vermilion + Yellow Ochre (3:1) |
| 4 | Burnt Sienna | 60° | Vermilion + Yellow Ochre (1:1) + IB |
| 5 | Raw Sienna | 75° | Yellow Ochre + trace Vermilion |
| 6 | Yellow Ochre | 90° | **Primary pigment** |
| 7 | Aureolin | 105° | Yellow Ochre light |
| 8 | Naples Yellow | 120° | Yellow Ochre + TW heavy |

---

### Theoretical Cool Zorn Palette

A hypothetical cool-temperature analog replacing Vermilion with a deep blue and Yellow Ochre with a blue-teal, producing the arc from **Cerulean Grey (210°)** through blue-purple to **Alizarin (345°)**.

**Reference hex anchors used for this system:**

| Reference Hex | Closest Wheel Colour | Index | Angle | Role |
|---|---|---|---|---|
| `#2D5FA0` | Slate | 15 | 225° | Cool mid-blue (Prussian Blue analog) |
| `#9B1A30` | Alizarin | 23 | 345° | Dark crimson (Vermilion analog — cool & dark) |
| `#3E5360` | Indigo | 17 | 255° | Dark teal-blue (neutral shadow) |

**Cool Zorn Achievable Range — `ZC`**

Indices `[14, 15, 16, 17, 18, 19, 20, 21, 22, 23]` — **Cerulean Grey (210°)** through **Prussian Blue (240°)**, **Indigo (255°)**, **Ultramarine (270°)**, **Dioxazine (285°)**, **Mars Violet (300°)**, **Purple Madder (315°)**, **Caput Mortuum (330°)**, to **Alizarin (345°)**.

| Index | Name | Angle | Achieved by |
|---|---|---|---|
| 14 | Cerulean Grey | 210° | Prussian Blue + TW heavy |
| 15 | Slate | 225° | Prussian Blue + Indigo + TW |
| 16 | Prussian Blue | 240° | **Primary pigment** |
| 17 | Indigo | 255° | Prussian Blue + dark Alizarin |
| 18 | Ultramarine | 270° | Prussian Blue + trace Alizarin |
| 19 | Dioxazine | 285° | Prussian Blue + Alizarin (1:2) |
| 20 | Mars Violet | 300° | Alizarin + Prussian Blue (2:1) |
| 21 | Purple Madder | 315° | Alizarin + trace Prussian Blue |
| 22 | Caput Mortuum | 330° | Alizarin + IB heavy |
| 23 | Alizarin | 345° | **Primary pigment** |

---

## Design Token Paths

```
// Warm Zorn semantic aliases (DTCG path syntax)
{zorn.warm.titanium-white}   →  #F5F5EF
{zorn.warm.ivory-black}      →  #231F1A
{zorn.warm.cadmium-red}      →  {color.cadmium-red.base}
{zorn.warm.vermilion}        →  {color.vermilion.base}
{zorn.warm.venetian-red}     →  {color.venetian-red.base}
{zorn.warm.terra-rosa}       →  {color.terra-rosa.base}
{zorn.warm.burnt-sienna}     →  {color.burnt-sienna.base}
{zorn.warm.raw-sienna}       →  {color.raw-sienna.base}
{zorn.warm.yellow-ochre}     →  {color.yellow-ochre.base}
{zorn.warm.aureolin}         →  {color.aureolin.base}
{zorn.warm.naples-yellow}    →  {color.naples-yellow.base}

// Cool Zorn semantic aliases
{zorn.cool.titanium-white}   →  #F5F5EF
{zorn.cool.ivory-black}      →  #231F1A
{zorn.cool.cerulean-grey}    →  {color.cerulean-grey.base}
{zorn.cool.slate}            →  {color.slate.base}
{zorn.cool.prussian-blue}    →  {color.prussian-blue.base}
{zorn.cool.indigo}           →  {color.indigo.base}
{zorn.cool.ultramarine}      →  {color.ultramarine.base}
{zorn.cool.dioxazine}        →  {color.dioxazine.base}
{zorn.cool.mars-violet}      →  {color.mars-violet.base}
{zorn.cool.purple-madder}    →  {color.purple-madder.base}
{zorn.cool.caput-mortuum}    →  {color.caput-mortuum.base}
{zorn.cool.alizarin}         →  {color.alizarin.base}
```

---

## AI Prompt Templates

### Generate a Zorn warm UI palette

```
Using the Zorn warm palette (Vermilion + Yellow Ochre + Titanium White + Ivory Black),
generate a 5-colour UI palette following the [HARMONY] harmony rule at spread [S].
Primary colour: [COLOUR NAME] at ring [RING].

Palette tokens: {zorn.warm.*} — see colour-wheel-palette.md for full ring values.
Output as: DTCG tokens JSON with $type: color, using the {color.<slug>.<ring>} reference syntax.
```

### Generate a Zorn cool UI palette

```
Using the theoretical Zorn cool palette anchored on:
  - #2D5FA0 (Slate, 225°) as cool primary blue
  - #9B1A30 (Alizarin, 345°) as deep warm-red shadow
  - #3E5360 (Indigo, 255°) as neutral dark

Generate a 5-colour [HARMONY] palette at spread [S] with primary colour [COLOUR].
Tokens: {zorn.cool.*} — see colour-wheel-palette.md.
```

### Map brand hex to nearest Zorn wheel colour

```
Given brand colour [HEX]:
1. Identify the nearest of the 24 wheel colours by RGB Euclidean distance.
2. Report: closest colour name, slug, angle, tier, warm/cool classification.
3. List the 3 nearest ring values with their hex and ring label.
4. Suggest the most harmonious Zorn palette subset (warm or cool) that includes it.
```

### WCAG contrast role assignment

```
For a Zorn [warm|cool] palette with primary [COLOUR]:
Assign three roles following 60-30-10:
  - Dominant (60%): lightest usable surface — target ≥ 4.5:1 body text contrast
  - Secondary (30%): mid-weight surface
  - Accent (10%): highest-saturation point — use the base ring

Output: three {color.<slug>.<ring>} token references with contrast ratios vs
Titanium White (#F5F5EF) and Ivory Black (#231F1A).
```

---

## Studio Interaction Notes

### Wheel click behaviour
- Click any **individual ring** (not just the segment) to set that specific tint/shade as the focused colour.
- All 5 harmony palette cards update to the same tonal depth immediately.
- A ring-outline indicator on the wheel shows the selected ring.

### Palette slot ring override
- Click any ring cell **within a palette card** to pin that slot to a specific depth.
- The card shows a ✎ badge and the overriding ring glows amber.
- Click the same ring again to release the pin and revert to the focused-ring default.
- Resets when a new harmony or primary colour is selected.

### WCAG foreground ring selection
- Click a palette colour as foreground in the WCAG panel → a ring strip appears below.
- Click any ring in the strip to test that shade as foreground text.
- Contrast ratio and AA/AAA badges update live.

### Spread slider
- Active only when a harmony (not All or Custom) is selected.
- Range: 1× (15° between each harmony node) to 4× (60°).
- For Monochromatic, spread controls the tonal breadth of the 5-ring selection.

### Temperature filters
- **Zorn Only + Warm**: shows ZW = indices [0–8], the warm mix arc.
- **Zorn Only + Cool**: shows ZC = indices [14–23], the cool mix arc.
- **Zorn Only + All**: shows ZW ∪ ZC.
- **Extended** shows all 24 colours regardless of temperature filter.

---

## Export Format

Both JSON and CSV exports include:
- Focused colour (with selected ring)
- All 5 palette slots (with their individual ring overrides)
- 60–30–10 role assignments (dominant, secondary, accent + vibrance-boosted accent)
- TW and IB anchors
- All unique hex values de-duplicated
- Pairwise contrast matrix across palette slots

JSON structure follows the same token-path conventions as `zorn-tokens.json`.
