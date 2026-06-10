import { useState, useMemo } from "react";

const TW = [245, 245, 239];
const IB = [35, 31, 26];
const TW_HEX = "#F5F5EF";
const IB_HEX = "#231F1A";

const COLORS = [
  { name:"Cadmium Red",   slug:"cadmium-red",   rgb:[200,57,43],   warm:true,  angle:0   },
  { name:"Venetian Red",  slug:"venetian-red",  rgb:[163,64,48],   warm:true,  angle:30  },
  { name:"Burnt Sienna",  slug:"burnt-sienna",  rgb:[139,74,28],   warm:true,  angle:60  },
  { name:"Yellow Ochre",  slug:"yellow-ochre",  rgb:[196,151,58],  warm:true,  angle:90  },
  { name:"Naples Yellow", slug:"naples-yellow", rgb:[212,184,112], warm:true,  angle:120 },
  { name:"Terre Verte",   slug:"terre-verte",   rgb:[122,139,96],  warm:false, angle:150 },
  { name:"Oxide Green",   slug:"oxide-green",   rgb:[78,122,104],  warm:false, angle:180 },
  { name:"Cerulean Grey", slug:"cerulean-grey", rgb:[78,107,130],  warm:false, angle:210 },
  { name:"Prussian Blue", slug:"prussian-blue", rgb:[44,72,104],   warm:false, angle:240 },
  { name:"Ultramarine",   slug:"ultramarine",   rgb:[60,72,120],   warm:false, angle:270 },
  { name:"Mars Violet",   slug:"mars-violet",   rgb:[106,61,88],   warm:false, angle:300 },
  { name:"Caput Mortuum", slug:"caput-mortuum", rgb:[138,58,66],   warm:true,  angle:330 },
];

const RING_DEFS = [
  {w:9,b:1,k:0, label:"Tint 100",  type:"tint",  step:100},
  {w:4,b:1,k:0, label:"Tint 200",  type:"tint",  step:200},
  {w:7,b:3,k:0, label:"Tint 300",  type:"tint",  step:300},
  {w:3,b:2,k:0, label:"Tint 400",  type:"tint",  step:400},
  {w:1,b:1,k:0, label:"Tint 500",  type:"tint",  step:500},
  {w:2,b:3,k:0, label:"Tint 600",  type:"tint",  step:600},
  {w:3,b:7,k:0, label:"Tint 700",  type:"tint",  step:700},
  {w:2,b:4,k:0, label:"Tint 800",  type:"tint",  step:800},
  {w:1,b:9,k:0, label:"Tint 900",  type:"tint",  step:900},
  {w:0,b:1,k:0, label:"Base",      type:"base",  step:0  },
  {w:0,b:9,k:1, label:"Shade 100", type:"shade", step:100},
  {w:0,b:4,k:2, label:"Shade 200", type:"shade", step:200},
  {w:0,b:7,k:3, label:"Shade 300", type:"shade", step:300},
  {w:0,b:3,k:2, label:"Shade 400", type:"shade", step:400},
  {w:0,b:1,k:1, label:"Shade 500", type:"shade", step:500},
  {w:0,b:2,k:3, label:"Shade 600", type:"shade", step:600},
  {w:0,b:3,k:7, label:"Shade 700", type:"shade", step:700},
  {w:0,b:2,k:4, label:"Shade 800", type:"shade", step:800},
  {w:0,b:1,k:9, label:"Shade 900", type:"shade", step:900},
];

function mix(w, b, k, rgb) {
  const t = w + b + k;
  return [
    Math.max(0, Math.min(255, Math.round((w*TW[0]+b*rgb[0]+k*IB[0])/t))),
    Math.max(0, Math.min(255, Math.round((w*TW[1]+b*rgb[1]+k*IB[1])/t))),
    Math.max(0, Math.min(255, Math.round((w*TW[2]+b*rgb[2]+k*IB[2])/t))),
  ];
}

function toHex([r,g,b]) {
  return `#${[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase()}`;
}

function polar(cx, cy, r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(cx, cy, r1, r2, a1, a2) {
  const [x1,y1] = polar(cx,cy,r2,a1);
  const [x2,y2] = polar(cx,cy,r2,a2);
  const [x3,y3] = polar(cx,cy,r1,a2);
  const [x4,y4] = polar(cx,cy,r1,a1);
  const lg = (a2-a1) > 180 ? 1 : 0;
  return `M${x1},${y1} A${r2},${r2} 0 ${lg} 1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 ${lg} 0 ${x4},${y4}Z`;
}

const CX = 550, CY = 555;
const CR = 28;
const RW = 22;
const OBR = 20;
const outerR = CR + RING_DEFS.length * RW;
const labelR = outerR + OBR + 26;

export default function ZornWheel() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const data = useMemo(() => COLORS.map((c) => {
    const ci = COLORS.indexOf(c);
    const a1 = ci * 30 + 0.45;
    const a2 = (ci + 1) * 30 - 0.45;
    const rings = RING_DEFS.map(rd => {
      const rgb = mix(rd.w, rd.b, rd.k, c.rgb);
      return { ...rd, rgb, hex: toHex(rgb) };
    });
    return { ...c, a1, a2, rings, baseHex: toHex(c.rgb) };
  }), []);

  const selColor = selected !== null ? data[selected] : null;

  return (
    <div style={{background:"#18161300",minHeight:"100vh",fontFamily:"'Georgia','Times New Roman',serif",color:"#C9BBA8",paddingBottom:40}}>

      <div style={{textAlign:"center",paddingTop:28,paddingBottom:16}}>
        <div style={{fontSize:11,letterSpacing:"0.32em",textTransform:"uppercase",color:"#5A5040",marginBottom:6}}>
          Zorn Palette
        </div>
        <div style={{fontSize:18,letterSpacing:"0.06em",color:"#A89880",marginBottom:4}}>
          Extended Colour Wheel
        </div>
        <div style={{fontSize:11,letterSpacing:"0.1em",color:"#5A5040"}}>
          12 pigment colours · titanium white inward · ivory black outward
        </div>
      </div>

      <div style={{position:"relative"}}>
        <svg viewBox="0 0 1100 1110" width="100%" style={{display:"block"}}>

          <circle cx={CX} cy={CY} r={outerR + OBR} fill={IB_HEX} />

          {data.map((col, ci) =>
            col.rings.map((ring, ri) => {
              const r1 = CR + ri * RW;
              const r2 = r1 + RW;
              const dimmed = selected !== null && selected !== ci;
              const isBase = ring.type === "base";
              return (
                <path
                  key={`${ci}-${ri}`}
                  d={arcPath(CX, CY, r1, r2, col.a1, col.a2)}
                  fill={ring.hex}
                  stroke={isBase ? IB_HEX : "none"}
                  strokeWidth={isBase ? 1 : 0}
                  opacity={dimmed ? 0.12 : 1}
                  style={{cursor:"pointer",transition:"opacity 0.2s"}}
                  onMouseEnter={() => setHovered({colorName:col.name,hex:ring.hex,label:ring.label,rgb:ring.rgb,type:ring.type})}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(selected === ci ? null : ci)}
                />
              );
            })
          )}

          <circle cx={CX} cy={CY} r={CR} fill={TW_HEX} />
          <circle cx={CX} cy={CY} r={3} fill="#9A8A78" opacity="0.5" />

          {[135, 315].map(angle => {
            const [x1,y1] = polar(CX, CY, CR + 1, angle);
            const [x2,y2] = polar(CX, CY, outerR + OBR, angle);
            return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#18161380" strokeWidth={2} />;
          })}

          {data.map((col, ci) => {
            const midAngle = ci * 30 + 15;
            const [lx, ly] = polar(CX, CY, labelR, midAngle);
            const svgRot = midAngle - 90;
            const flip = svgRot > 90 && svgRot <= 270;
            const finalRot = flip ? svgRot + 180 : svgRot;
            const anchor = flip ? "end" : "start";
            const isDimmed = selected !== null && selected !== ci;
            return (
              <g key={`lbl-${ci}`}
                style={{cursor:"pointer"}}
                onClick={() => setSelected(selected === ci ? null : ci)}>
                <circle cx={lx} cy={ly} r={5}
                  fill={col.baseHex}
                  opacity={isDimmed ? 0.15 : 1}
                  style={{transition:"opacity 0.2s"}} />
                <text
                  x={flip ? lx - 9 : lx + 9}
                  y={ly}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  transform={`rotate(${finalRot}, ${lx}, ${ly})`}
                  fill={isDimmed ? "#2E2820" : selected === ci ? "#E8D8C0" : "#8A7A68"}
                  fontSize={10}
                  letterSpacing="0.1em"
                  fontFamily="Georgia, serif"
                  style={{userSelect:"none",transition:"fill 0.2s"}}>
                  {col.name.toUpperCase()}
                </text>
              </g>
            );
          })}

          <text x={CX} y={CY - outerR - OBR - 36}
            textAnchor="middle" dominantBaseline="middle"
            fill="#4A3E30" fontSize={9} letterSpacing="0.3em"
            fontFamily="Georgia, serif">WARM</text>
          <text x={CX} y={CY + outerR + OBR + 36}
            textAnchor="middle" dominantBaseline="middle"
            fill="#3A4038" fontSize={9} letterSpacing="0.3em"
            fontFamily="Georgia, serif">COOL</text>

        </svg>

        {hovered && (
          <div style={{
            position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",
            background:"#201E1B",border:"1px solid #352E24",borderRadius:6,
            padding:"8px 18px",display:"flex",alignItems:"center",gap:12,
            fontSize:12,letterSpacing:"0.06em",whiteSpace:"nowrap",
            pointerEvents:"none",boxShadow:"0 6px 30px rgba(0,0,0,0.6)",
          }}>
            <div style={{width:20,height:20,borderRadius:3,background:hovered.hex,border:"1px solid rgba(255,255,255,0.1)",flexShrink:0}} />
            <span style={{color:"#C9BBA8"}}>{hovered.colorName}</span>
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
          <div style={{textAlign:"center",marginBottom:12}}>
            <span style={{fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",color:"#5A5040"}}>
              {selColor.name}
            </span>
            <span style={{fontSize:10,color:"#3A3228",margin:"0 8px"}}>·</span>
            <span style={{fontSize:10,color:"#6A5E50",letterSpacing:"0.08em"}}>{selColor.warm ? "Warm" : "Cool"}</span>
            <span style={{fontSize:10,color:"#3A3228",margin:"0 8px"}}>·</span>
            <code style={{fontSize:10,color:"#8A7A68",fontFamily:"monospace"}}>{selColor.baseHex}</code>
            <span style={{fontSize:10,color:"#3A3228",margin:"0 8px"}}>·</span>
            <span style={{fontSize:10,color:"#4A4030",letterSpacing:"0.05em"}}>{selColor.angle}°</span>
          </div>
          <div style={{display:"flex",gap:3,justifyContent:"center",flexWrap:"nowrap"}}>
            {selColor.rings.map((ring, ri) => (
              <div key={ri} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{
                  width:46,height:ring.type==="base"?58:44,
                  background:ring.hex,
                  borderRadius:ring.type==="base"?5:3,
                  border:ring.type==="base"?"2px solid rgba(255,255,255,0.18)":"none",
                }} title={`${ring.label}: ${ring.hex}`} />
                <div style={{
                  fontSize:8,color:ring.type==="base"?"#9A8A78":"#4A4030",
                  fontFamily:"monospace",textAlign:"center",lineHeight:1.3,
                  letterSpacing:"0.02em",
                }}>
                  {ring.label.replace("Tint ","T").replace("Shade ","S")}
                  <br/>
                  <span style={{color:"#3A3228",fontSize:7}}>{ring.hex}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:12,fontSize:10,color:"#3A3228",letterSpacing:"0.1em"}}>
            Click wheel again to deselect
          </div>
        </div>
      )}

      <div style={{
        display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"6px 12px",
        padding:"28px 40px 0",maxWidth:880,margin:"0 auto",
      }}>
        {data.map((col, ci) => (
          <div key={ci}
            style={{
              display:"flex",alignItems:"center",gap:7,cursor:"pointer",
              opacity:selected!==null&&selected!==ci?0.25:1,
              transition:"opacity 0.2s",
            }}
            onClick={() => setSelected(selected===ci?null:ci)}>
            <div style={{
              width:14,height:14,borderRadius:2,
              background:col.baseHex,border:"1px solid rgba(255,255,255,0.1)",flexShrink:0,
            }} />
            <span style={{fontSize:10,color:"#9A8A78",letterSpacing:"0.04em"}}>{col.name}</span>
          </div>
        ))}
      </div>

      <div style={{
        display:"flex",justifyContent:"center",gap:3,
        padding:"20px 40px 0",maxWidth:880,margin:"0 auto",flexWrap:"nowrap",
      }}>
        {RING_DEFS.map((rd, ri) => {
          const sampleRgb = mix(rd.w, rd.b, rd.k, [196,151,58]);
          const sampleHex = toHex(sampleRgb);
          return (
            <div key={ri} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <div style={{width:26,height:8,background:sampleHex,borderRadius:2}} />
              <div style={{fontSize:7,color:"#4A4030",fontFamily:"monospace",textAlign:"center"}}>
                {rd.type==="base"?"Base":rd.label.replace("Tint ","T").replace("Shade ","S")}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{textAlign:"center",marginTop:18,fontSize:9,letterSpacing:"0.16em",color:"#3A3228"}}>
        HOVER FOR HEX · CLICK TO ISOLATE
      </div>
    </div>
  );
}
