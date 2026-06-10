import { useState, useMemo } from "react";

const TW = [245,245,239];
const IB = [35,31,26];
const TW_HEX = "#F5F5EF";
const IB_HEX = "#231F1A";

// Original 12 — classified by RYB colour theory tier
// New 12 tertiaries — 1:1 mixes of adjacent originals
const COLORS = [
  {name:"Cadmium Red",    slug:"cadmium-red",    rgb:[200,57,43],   warm:true,  angle:0,   tier:"primary"},
  {name:"Vermilion",      slug:"vermilion",       rgb:[182,60,46],   warm:true,  angle:15,  tier:"tertiary", isNew:true},
  {name:"Venetian Red",   slug:"venetian-red",   rgb:[163,64,48],   warm:true,  angle:30,  tier:"tertiary"},
  {name:"Terra Rosa",     slug:"terra-rosa",      rgb:[151,69,38],   warm:true,  angle:45,  tier:"tertiary", isNew:true},
  {name:"Burnt Sienna",   slug:"burnt-sienna",   rgb:[139,74,28],   warm:true,  angle:60,  tier:"secondary"},
  {name:"Raw Sienna",     slug:"raw-sienna",      rgb:[168,112,43],  warm:true,  angle:75,  tier:"tertiary", isNew:true},
  {name:"Yellow Ochre",   slug:"yellow-ochre",   rgb:[196,151,58],  warm:true,  angle:90,  tier:"tertiary"},
  {name:"Aureolin",       slug:"aureolin",        rgb:[204,168,85],  warm:true,  angle:105, tier:"tertiary", isNew:true},
  {name:"Naples Yellow",  slug:"naples-yellow",  rgb:[212,184,112], warm:true,  angle:120, tier:"primary"},
  {name:"Olive Earth",    slug:"olive-earth",     rgb:[167,162,104], warm:true,  angle:135, tier:"tertiary", isNew:true},
  {name:"Terre Verte",    slug:"terre-verte",    rgb:[122,139,96],  warm:false, angle:150, tier:"tertiary"},
  {name:"Sage",           slug:"sage",            rgb:[100,130,100], warm:false, angle:165, tier:"tertiary", isNew:true},
  {name:"Oxide Green",    slug:"oxide-green",    rgb:[78,122,104],  warm:false, angle:180, tier:"secondary"},
  {name:"Viridian",       slug:"viridian",        rgb:[78,114,117],  warm:false, angle:195, tier:"tertiary", isNew:true},
  {name:"Cerulean Grey",  slug:"cerulean-grey",  rgb:[78,107,130],  warm:false, angle:210, tier:"tertiary"},
  {name:"Slate",          slug:"slate",           rgb:[61,90,117],   warm:false, angle:225, tier:"tertiary", isNew:true},
  {name:"Prussian Blue",  slug:"prussian-blue",  rgb:[44,72,104],   warm:false, angle:240, tier:"primary"},
  {name:"Indigo",         slug:"indigo",          rgb:[52,72,112],   warm:false, angle:255, tier:"tertiary", isNew:true},
  {name:"Ultramarine",    slug:"ultramarine",    rgb:[60,72,120],   warm:false, angle:270, tier:"tertiary"},
  {name:"Dioxazine",      slug:"dioxazine",       rgb:[83,66,104],   warm:false, angle:285, tier:"tertiary", isNew:true},
  {name:"Mars Violet",    slug:"mars-violet",    rgb:[106,61,88],   warm:false, angle:300, tier:"secondary"},
  {name:"Purple Madder",  slug:"purple-madder",   rgb:[122,60,77],   warm:false, angle:315, tier:"tertiary", isNew:true},
  {name:"Caput Mortuum",  slug:"caput-mortuum",  rgb:[138,58,66],   warm:true,  angle:330, tier:"tertiary"},
  {name:"Alizarin",       slug:"alizarin",        rgb:[169,58,54],   warm:true,  angle:345, tier:"tertiary", isNew:true},
];

const RING_DEFS = [
  {w:9,b:1,k:0,label:"Tint 100",type:"tint",step:100},
  {w:4,b:1,k:0,label:"Tint 200",type:"tint",step:200},
  {w:7,b:3,k:0,label:"Tint 300",type:"tint",step:300},
  {w:3,b:2,k:0,label:"Tint 400",type:"tint",step:400},
  {w:1,b:1,k:0,label:"Tint 500",type:"tint",step:500},
  {w:2,b:3,k:0,label:"Tint 600",type:"tint",step:600},
  {w:3,b:7,k:0,label:"Tint 700",type:"tint",step:700},
  {w:2,b:4,k:0,label:"Tint 800",type:"tint",step:800},
  {w:1,b:9,k:0,label:"Tint 900",type:"tint",step:900},
  {w:0,b:1,k:0,label:"Base",    type:"base",step:0},
  {w:0,b:9,k:1,label:"Shade 100",type:"shade",step:100},
  {w:0,b:4,k:2,label:"Shade 200",type:"shade",step:200},
  {w:0,b:7,k:3,label:"Shade 300",type:"shade",step:300},
  {w:0,b:3,k:2,label:"Shade 400",type:"shade",step:400},
  {w:0,b:1,k:1,label:"Shade 500",type:"shade",step:500},
  {w:0,b:2,k:3,label:"Shade 600",type:"shade",step:600},
  {w:0,b:3,k:7,label:"Shade 700",type:"shade",step:700},
  {w:0,b:2,k:4,label:"Shade 800",type:"shade",step:800},
  {w:0,b:1,k:9,label:"Shade 900",type:"shade",step:900},
];

const TIER_STYLE = {
  primary:   {dot:12, fontSize:10, color:"#D4C4A8", weight:600, badge:"P"},
  secondary: {dot:8,  fontSize:9,  color:"#9A8A78", weight:400, badge:"S"},
  tertiary:  {dot:6,  fontSize:8,  color:"#6A5E50", weight:400, badge:"T"},
};
const TIER_BADGE_COLOR = {
  primary:   "#8A6A30",
  secondary: "#4A5A40",
  tertiary:  "#3A3A5A",
};

function mix(w, b, k, rgb) {
  const t = w+b+k;
  return [
    Math.max(0,Math.min(255,Math.round((w*TW[0]+b*rgb[0]+k*IB[0])/t))),
    Math.max(0,Math.min(255,Math.round((w*TW[1]+b*rgb[1]+k*IB[1])/t))),
    Math.max(0,Math.min(255,Math.round((w*TW[2]+b*rgb[2]+k*IB[2])/t))),
  ];
}
function toHex([r,g,b]) {
  return `#${[r,g,b].map(v=>v.toString(16).padStart(2,"0")).join("").toUpperCase()}`;
}
function polar(cx, cy, r, deg) {
  const rad = (deg-90)*Math.PI/180;
  return [cx+r*Math.cos(rad), cy+r*Math.sin(rad)];
}
function arcPath(cx,cy,r1,r2,a1,a2) {
  const[x1,y1]=polar(cx,cy,r2,a1);const[x2,y2]=polar(cx,cy,r2,a2);
  const[x3,y3]=polar(cx,cy,r1,a2);const[x4,y4]=polar(cx,cy,r1,a1);
  const lg=(a2-a1)>180?1:0;
  return `M${x1},${y1} A${r2},${r2} 0 ${lg} 1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 ${lg} 0 ${x4},${y4}Z`;
}

const CX=550, CY=555, CR=28, RW=22, OBR=16;
const outerR = CR + RING_DEFS.length * RW;
const labelR = outerR + OBR + 24;
const SEG = 15; // 360/24

export default function ZornWheel() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [tierFilter, setTierFilter] = useState(null);

  const data = useMemo(() => COLORS.map((c) => {
    const ci = COLORS.indexOf(c);
    const a1 = ci*SEG + 0.3;
    const a2 = (ci+1)*SEG - 0.3;
    const rings = RING_DEFS.map(rd => {
      const rgb = mix(rd.w, rd.b, rd.k, c.rgb);
      return {...rd, rgb, hex: toHex(rgb)};
    });
    return {...c, a1, a2, rings, baseHex: toHex(c.rgb), ci};
  }), []);

  const selColor = selected !== null ? data[selected] : null;

  const isDimmed = (ci) => {
    if (tierFilter && data[ci].tier !== tierFilter) return true;
    if (selected !== null && selected !== ci) return true;
    return false;
  };

  return (
    <div style={{background:"#18161A",minHeight:"100vh",fontFamily:"'Georgia','Times New Roman',serif",color:"#C9BBA8",paddingBottom:40}}>

      <div style={{textAlign:"center",paddingTop:26,paddingBottom:10}}>
        <div style={{fontSize:10,letterSpacing:"0.32em",textTransform:"uppercase",color:"#4A3E30",marginBottom:5}}>Zorn Palette</div>
        <div style={{fontSize:17,letterSpacing:"0.06em",color:"#A89880",marginBottom:4}}>Extended Colour Wheel</div>
        <div style={{fontSize:10,letterSpacing:"0.1em",color:"#5A5040",marginBottom:10}}>
          24 colours · 19 rings · titanium white inward · ivory black outward
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:8}}>
          {["primary","secondary","tertiary",null].map(t => (
            <button key={String(t)} onClick={()=>setTierFilter(tierFilter===t?null:t)}
              style={{
                padding:"4px 12px",border:"1px solid",borderRadius:3,
                fontSize:9,letterSpacing:"0.15em",textTransform:"uppercase",
                cursor:"pointer",transition:"all .15s",fontFamily:"Georgia,serif",
                background:tierFilter===t?"#2A2420":"transparent",
                borderColor:t==="primary"?"#7A6030":t==="secondary"?"#3A5A30":t==="tertiary"?"#3A3A5A":"#4A4038",
                color:t==="primary"?"#C4A050":t==="secondary"?"#70A060":t==="tertiary"?"#7070AA":"#6A5E50",
              }}>
              {t ?? "All"}{t ? ` (${t==="primary"?3:t==="secondary"?3:18})` : ""}
            </button>
          ))}
        </div>
      </div>

      <div style={{position:"relative"}}>
        <svg viewBox="0 0 1100 1110" width="100%" style={{display:"block"}}>

          <circle cx={CX} cy={CY} r={outerR+OBR} fill={IB_HEX} />

          {data.map((col, ci) =>
            col.rings.map((ring, ri) => {
              const r1 = CR+ri*RW, r2=r1+RW;
              const dim = isDimmed(ci);
              return (
                <path key={`${ci}-${ri}`}
                  d={arcPath(CX,CY,r1,r2,col.a1,col.a2)}
                  fill={ring.hex}
                  stroke={ring.type==="base" ? "#23201880" : "none"}
                  strokeWidth={ring.type==="base" ? 0.5 : 0}
                  opacity={dim ? 0.08 : 1}
                  style={{cursor:"pointer",transition:"opacity .2s"}}
                  onMouseEnter={()=>setHovered({colorName:col.name,hex:ring.hex,label:ring.label,rgb:ring.rgb,tier:col.tier})}
                  onMouseLeave={()=>setHovered(null)}
                  onClick={()=>setSelected(selected===ci?null:ci)}
                />
              );
            })
          )}

          <circle cx={CX} cy={CY} r={CR} fill={TW_HEX} />
          <circle cx={CX} cy={CY} r={3} fill="#9A8A78" opacity="0.4" />

          {/* Warm/cool dividers */}
          {[135,315].map(angle => {
            const[x1,y1]=polar(CX,CY,CR+1,angle);
            const[x2,y2]=polar(CX,CY,outerR+OBR,angle);
            return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#18161380" strokeWidth={2}/>;
          })}

          {/* Labels */}
          {data.map((col, ci) => {
            const ts = TIER_STYLE[col.tier];
            const midAngle = ci*SEG + SEG/2;
            const[lx,ly] = polar(CX, CY, labelR + (col.tier==="primary"?4:0), midAngle);
            const svgRot = midAngle - 90;
            const flip = svgRot>90 && svgRot<=270;
            const fr = flip ? svgRot+180 : svgRot;
            const anchor = flip ? "end" : "start";
            const dim = isDimmed(ci);
            const isSelected = selected===ci;
            const textColor = isSelected ? "#E8D8C0" : dim ? "#2A2420" : ts.color;
            const dotFill = dim ? "#2A2420" : col.baseHex;
            return (
              <g key={`lbl-${ci}`} style={{cursor:"pointer"}} onClick={()=>setSelected(selected===ci?null:ci)}>
                <circle cx={lx} cy={ly} r={ts.dot/2}
                  fill={dotFill} opacity={dim?0.12:1}
                  style={{transition:"all .2s"}} />
                <text
                  x={flip ? lx-(ts.dot/2+4) : lx+(ts.dot/2+4)}
                  y={ly}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  transform={`rotate(${fr},${lx},${ly})`}
                  fill={textColor}
                  fontSize={ts.fontSize}
                  fontWeight={ts.weight}
                  letterSpacing="0.09em"
                  fontFamily="Georgia, serif"
                  style={{userSelect:"none",transition:"fill .2s"}}>
                  {col.name.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* WARM / COOL */}
          {[{y:CY-outerR-OBR-34,t:"WARM",c:"#4A3E30"},{y:CY+outerR+OBR+34,t:"COOL",c:"#3A4038"}].map(({y,t,c})=>(
            <text key={t} x={CX} y={y} textAnchor="middle" dominantBaseline="middle"
              fill={c} fontSize={9} letterSpacing="0.3em" fontFamily="Georgia, serif">{t}</text>
          ))}

          {/* Tier arc badges (P/S/T) at outer edge of primary/secondary segments */}
          {data.filter(col=>col.tier!=="tertiary"||col.isNew===undefined).map((col,_) => {
            if (col.tier==="tertiary"&&!col.isNew) return null;
            if (col.tier==="tertiary") return null;
            const ci = data.indexOf(col);
            const midAngle = ci*SEG + SEG/2;
            const br = outerR + OBR + 6;
            const[bx,by]=polar(CX,CY,br,midAngle);
            const badge = col.tier==="primary"?"P":"S";
            const bc = col.tier==="primary"?"#9A7020":"#3A7030";
            return (
              <text key={`badge-${ci}`} x={bx} y={by} textAnchor="middle" dominantBaseline="middle"
                fill={bc} fontSize={7} letterSpacing="0.05em" fontFamily="Georgia, serif"
                style={{pointerEvents:"none"}}>{badge}</text>
            );
          })}
        </svg>

        {hovered && (
          <div style={{
            position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",
            background:"#201E1B",border:"1px solid #352E24",borderRadius:6,
            padding:"8px 18px",display:"flex",alignItems:"center",gap:12,
            fontSize:12,letterSpacing:"0.06em",whiteSpace:"nowrap",
            pointerEvents:"none",boxShadow:"0 6px 30px rgba(0,0,0,.6)",
          }}>
            <div style={{width:20,height:20,borderRadius:3,background:hovered.hex,border:"1px solid rgba(255,255,255,.1)",flexShrink:0}}/>
            <span style={{color:"#C9BBA8"}}>{hovered.colorName}</span>
            <span style={{
              fontSize:8,padding:"1px 5px",borderRadius:2,letterSpacing:"0.15em",
              background:TIER_BADGE_COLOR[hovered.tier],
              color:hovered.tier==="primary"?"#E0B040":hovered.tier==="secondary"?"#70C050":"#9090C8",
            }}>{hovered.tier.toUpperCase()}</span>
            <span style={{color:"#3A3228"}}>·</span>
            <span style={{color:"#8A7A68"}}>{hovered.label}</span>
            <span style={{color:"#3A3228"}}>·</span>
            <code style={{color:"#D4C4A8",fontFamily:"monospace",fontSize:12}}>{hovered.hex}</code>
            <span style={{color:"#5A5040",fontSize:11}}>rgb({hovered.rgb.join(", ")})</span>
          </div>
        )}
      </div>

      {selColor && (
        <div style={{padding:"0 24px",marginTop:4}}>
          <div style={{textAlign:"center",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
            <span style={{fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:"#5A5040"}}>{selColor.name}</span>
            <span style={{
              fontSize:8,padding:"1px 6px",borderRadius:2,letterSpacing:"0.15em",
              background:TIER_BADGE_COLOR[selColor.tier],
              color:selColor.tier==="primary"?"#E0B040":selColor.tier==="secondary"?"#70C050":"#9090C8",
            }}>{selColor.tier.toUpperCase()}</span>
            <span style={{fontSize:10,color:"#6A5E50",letterSpacing:"0.08em"}}>{selColor.warm?"Warm":"Cool"}</span>
            <code style={{fontSize:10,color:"#8A7A68",fontFamily:"monospace"}}>{selColor.baseHex}</code>
          </div>
          <div style={{display:"flex",gap:3,justifyContent:"center",flexWrap:"nowrap"}}>
            {selColor.rings.map((ring, ri) => (
              <div key={ri} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{
                  width:46,height:ring.type==="base"?58:44,
                  background:ring.hex,borderRadius:ring.type==="base"?5:3,
                  border:ring.type==="base"?"2px solid rgba(255,255,255,.18)":"none",
                }} title={`${ring.label}: ${ring.hex}`}/>
                <div style={{fontSize:8,color:ring.type==="base"?"#9A8A78":"#4A4030",fontFamily:"monospace",textAlign:"center",lineHeight:1.3}}>
                  {ring.label.replace("Tint ","T").replace("Shade ","S")}
                  <br/><span style={{color:"#3A3228",fontSize:7}}>{ring.hex}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:10,fontSize:9,color:"#3A3228",letterSpacing:"0.1em"}}>Click wheel again to deselect</div>
        </div>
      )}

      {/* Legend — 3 columns by tier */}
      {["primary","secondary","tertiary"].map(tier => (
        <div key={tier} style={{padding:"16px 40px 0",maxWidth:920,margin:"0 auto"}}>
          <div style={{
            fontSize:8,letterSpacing:"0.25em",textTransform:"uppercase",
            color:tier==="primary"?"#8A6A30":tier==="secondary"?"#3A7030":"#4A4A7A",
            marginBottom:6,paddingLeft:2,borderLeft:`2px solid ${tier==="primary"?"#8A6A30":tier==="secondary"?"#3A7030":"#4A4A7A"}`,
            paddingLeft:6,
          }}>
            {tier} {tier==="primary"?"(3)":tier==="secondary"?"(3)":"(18 — 6 original + 12 new)"}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:"4px 16px"}}>
            {data.filter(c=>c.tier===tier).map(col=>{
              const ci = data.indexOf(col);
              const dim = isDimmed(ci);
              return (
                <div key={ci} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",opacity:dim?0.2:1,transition:"opacity .2s",minWidth:130}}
                  onClick={()=>setSelected(selected===ci?null:ci)}>
                  <div style={{width:12,height:12,borderRadius:2,background:col.baseHex,border:"1px solid rgba(255,255,255,.08)",flexShrink:0}}/>
                  <span style={{fontSize:10,color:"#9A8A78",letterSpacing:"0.03em"}}>
                    {col.name}
                    {col.isNew ? <span style={{fontSize:8,color:"#4A4A6A",marginLeft:4}}>new</span> : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{textAlign:"center",marginTop:18,fontSize:9,letterSpacing:"0.16em",color:"#3A3228",paddingBottom:8}}>
        HOVER FOR HEX · CLICK TO ISOLATE · FILTER BY TIER
      </div>
    </div>
  );
}
