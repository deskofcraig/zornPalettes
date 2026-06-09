# Zorn Palette — Color System Specification (Corrected Ratios)

## Primary Colours

| Variable | Pigment | Hex |
|---|---|---|
| `white` | Titanium White | `#F4EFE4` |
| `pureA` | Yellow Ochre | `#C8923A` |
| `pureB` | Vermillion | `#CC3311` |
| `pureC` | Ivory Black | `#1C1814` |

---

## Sets — Base Colour Mixing (3:1 and 1:3)

| Set | From | To |
|---|---|---|
| **setA** | `pureA` Yellow Ochre | `pureB` Vermillion |
| **setB** | `pureB` Vermillion | `pureC` Ivory Black |
| **setC** | `pureC` Ivory Black | `pureA` Yellow Ochre |

Each set: pure (1:0), 3:1, 1:1, 1:3

### Computed Base Colours

| Variable Name | Mix | Hex |
|---|---|---|
| `ochre` | pureA 1:0 | `#C8923A` |
| `ochre-red` | pureA:pureB 3:1 | `#C97A30` |
| `warm-red` | pureA:pureB 1:1 | `#CA6226` |
| `red-orange` | pureA:pureB 1:3 | `#CB4B1B` |
| `vermillion` | pureB 1:0 | `#CC3311` |
| `crimson` | pureB:pureC 3:1 | `#A02C12` |
| `dark-red` | pureB:pureC 1:1 | `#742612` |
| `deep-umber` | pureB:pureC 1:3 | `#481F13` |
| `ivory-black` | pureC 1:0 | `#1C1814` |
| `warm-shadow` | pureC:pureA 3:1 | `#47361E` |
| `mid-umber` | pureC:pureA 1:1 | `#725527` |
| `raw-umber` | pureC:pureA 1:3 | `#9D7430` |

---

## Top Section — Base + White Tints

| Suffix | Ratio | % Base |
|---|---|---|
| *(none)* | 1:0 | 100% |
| `900` | 9:1 | 90% |
| `800` | 4:1 | 80% |
| `700` | 7:3 | 70% |
| `600` | 3:2 | 60% |
| `500` | 1:1 | 50% |
| `400` | 2:3 | 40% |
| `300` | 3:7 | 30% |
| `200` | 1:4 | 20% |
| `100` | 1:9 | 10% |

---

## Bottom Section — Base + White + Mix Tints

| Set | Columns | Mix With |
|---|---|---|
| setA | ochre → red-orange | `pureC` Ivory Black |
| setB | vermillion → deep-umber | `pureA` Yellow Ochre |
| setC | ivory-black → raw-umber | `pureB` Vermillion |

| Suffix | Ratio |
|---|---|
| *(none)* | 1:0:1 |
| `900` | 9:1:9 |
| `800` | 4:1:4 |
| `700` | 7:3:7 |
| `600` | 3:2:3 |
| `500` | 1:1:1 |
| `400` | 2:3:2 |
| `300` | 3:7:3 |
| `200` | 1:4:1 |
| `100` | 1:9:1 |

### Mix Base Names (1:0:1)

| Variable Name | Origin | Hex |
|---|---|---|
| `ochre-shadow` | ochre+ivory-black | `#725527` |
| `red-earth` | ochre-red+ivory-black | `#724922` |
| `shadow-warm` | warm-red+ivory-black | `#733D1D` |
| `burnt-red` | red-orange+ivory-black | `#743218` |
| `earth-vermillion` | vermillion+yellow-ochre | `#CA6226` |
| `crimson-ochre` | crimson+yellow-ochre | `#B45F26` |
| `red-umber` | dark-red+yellow-ochre | `#9E5C26` |
| `burnt-sienna` | deep-umber+yellow-ochre | `#885826` |
| `ivory-red` | ivory-black+vermillion | `#742612` |
| `warm-maroon` | warm-shadow+vermillion | `#8A3418` |
| `umber-red` | mid-umber+vermillion | `#9F441C` |
| `raw-sienna` | raw-umber+vermillion | `#B45420` |

---

## Variable Naming (Figma)

```
pure/white  pure/yellow-ochre  pure/vermillion  pure/ivory-black
base/{name}/base  base/{name}/900 … base/{name}/100
mix/{name}/base   mix/{name}/900  … mix/{name}/100
```

## Mixing Model

```python
def mix(*pairs):
    t = sum(r for _,r in pairs)
    return tuple(round(sum(c[i]*r for c,r in pairs)/t) for i in range(3))

WHITE  = (244, 239, 228)
PURE_A = (200, 146, 58)
PURE_B = (204, 51,  17)
PURE_C = (28,  24,  20)
```
