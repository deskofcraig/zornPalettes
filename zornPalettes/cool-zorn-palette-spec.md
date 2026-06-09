# Cool Zorn Palette — Color System Specification (Corrected Ratios)

## Primary Colours

| Variable | Pigment | Hex |
|---|---|---|
| `white` | Titanium White | `#F4EFE4` |
| `pureD` | Cerulean Blue | `#2D5FA0` |
| `pureE` | Alizarin Crimson | `#9B1A30` |
| `pureF` | Payne's Grey | `#3E5360` |

---

## Sets — Base Colour Mixing (3:1 and 1:3)

| Set | From | To |
|---|---|---|
| **setD** | `pureD` Cerulean Blue | `pureE` Alizarin Crimson |
| **setE** | `pureE` Alizarin Crimson | `pureF` Payne's Grey |
| **setF** | `pureF` Payne's Grey | `pureD` Cerulean Blue |

Each set: pure (1:0), 3:1, 1:1, 1:3

### Computed Base Colours

| Variable Name | Mix | Hex |
|---|---|---|
| `cerulean` | pureD 1:0 | `#2D5FA0` |
| `cerulean-rose` | pureD:pureE 3:1 | `#484E84` |
| `violet-blue` | pureD:pureE 1:1 | `#643C68` |
| `rose-blue` | pureD:pureE 1:3 | `#802B4C` |
| `alizarin` | pureE 1:0 | `#9B1A30` |
| `alizarin-shadow` | pureE:pureF 3:1 | `#84283C` |
| `dark-maroon` | pureE:pureF 1:1 | `#6C3648` |
| `plum-shadow` | pureE:pureF 1:3 | `#554554` |
| `paynes-grey` | pureF 1:0 | `#3E5360` |
| `slate` | pureF:pureD 3:1 | `#3A5670` |
| `cool-blue` | pureF:pureD 1:1 | `#365980` |
| `cerulean-grey` | pureF:pureD 1:3 | `#315C90` |

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
| setD | cerulean → rose-blue | `pureF` Payne's Grey |
| setE | alizarin → plum-shadow | `pureD` Cerulean Blue |
| setF | paynes-grey → cerulean-grey | `pureE` Alizarin Crimson |

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
| `cerulean-shadow` | cerulean+paynes-grey | `#365980` |
| `rose-shadow` | cerulean-rose+paynes-grey | `#435072` |
| `deep-violet` | violet-blue+paynes-grey | `#514864` |
| `dark-rose-grey` | rose-blue+paynes-grey | `#5F3F56` |
| `violet-red` | alizarin+cerulean | `#643C68` |
| `slate-rose` | alizarin-shadow+cerulean | `#58446E` |
| `cool-maroon` | dark-maroon+cerulean | `#4C4A74` |
| `blue-plum` | plum-shadow+cerulean | `#41527A` |
| `slate-rose-dark` | paynes-grey+alizarin | `#6C3648` |
| `mauve-slate` | slate+alizarin | `#6A3850` |
| `blue-mauve` | cool-blue+alizarin | `#683A58` |
| `teal-rose` | cerulean-grey+alizarin | `#663B60` |

---

## Variable Naming (Figma)

```
pure/white  pure/cerulean-blue  pure/alizarin  pure/paynes-grey
base/{name}/base  base/{name}/900 … base/{name}/100
mix/{name}/base   mix/{name}/900  … mix/{name}/100
```

## Mixing Model

```python
def mix(*pairs):
    t = sum(r for _,r in pairs)
    return tuple(round(sum(c[i]*r for c,r in pairs)/t) for i in range(3))

WHITE  = (244, 239, 228)
PURE_D = (45,  95,  160)   # Cerulean Blue
PURE_E = (155, 26,  48)    # Alizarin Crimson
PURE_F = (62,  83,  96)    # Payne's Grey
```
