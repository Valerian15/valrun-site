import { useState } from "react";

const C = {
  bg: "#08080f", card: "#0e0e1c", hover: "#14142a",
  border: "#22223a", borderHi: "#38385a",
  gold: "#c9a84c", goldDim: "#7a6430",
  teal: "#4fbfbf", tealDim: "#1f5f60",
  text: "#e8dfc8", dim: "#8a8070", muted: "#4a4460",
  purple: "#9060cc", red: "#c04030",
};

const NAV = [
  {id:"home",l:"Home"},{id:"lore",l:"The Lore"},{id:"geography",l:"Geography"},
  {id:"history",l:"History"},{id:"peoples",l:"Peoples"},{id:"faith",l:"Faith & Magic"},
  {id:"factions",l:"Factions"},{id:"language",l:"Language"},{id:"map",l:"World Map"},
  {id:"gallery",l:"Gallery"},{id:"mosaic",l:"The Mosaic"},
];

const Div = () => (
  <div style={{display:"flex",alignItems:"center",gap:10,margin:"36px 0"}}>
    <div style={{flex:1,height:1,background:`linear-gradient(to right,transparent,${C.gold}50)`}}/>
    <span style={{color:C.gold,fontSize:10}}>✦</span>
    <div style={{flex:1,height:1,background:`linear-gradient(to left,transparent,${C.gold}50)`}}/>
  </div>
);

const SH = ({title,sub}) => (
  <div style={{marginBottom:36}}>
    <div style={{color:C.gold,fontSize:10,letterSpacing:4,textTransform:"uppercase",marginBottom:6}}>Val'Run Compendium</div>
    <h1 style={{fontSize:38,fontWeight:"normal",color:C.text,margin:0}}>{title}</h1>
    {sub && <p style={{color:C.dim,marginTop:10,fontSize:15,fontStyle:"italic"}}>{sub}</p>}
    <div style={{width:50,height:2,background:C.gold,marginTop:14,borderRadius:1}}/>
  </div>
);

const Box = ({children,style={}}) => (
  <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:7,padding:22,...style}}>
    {children}
  </div>
);

function Home({go}) {
  const ages=[
    {n:"I",name:"Shaping",period:"Mythic",cur:false},
    {n:"II",name:"Wandering",period:"~10k–2k BI",cur:false},
    {n:"III",name:"Zelkaris",period:"~2k BI–0 AI",cur:false},
    {n:"IV",name:"Dark Age",period:"5–237 AI",cur:false},
    {n:"V",name:"Empire",period:"237–874 AI",cur:false},
    {n:"VI",name:"Reformation",period:"874–927 AI",cur:false},
    {n:"VII",name:"New Age",period:"927–Present",cur:true},
  ];
  const links=[
    {id:"lore",icon:"📜",l:"The Lore",d:"Creation myth & cosmology"},
    {id:"geography",icon:"🗺",l:"Geography",d:"Four regions, one world"},
    {id:"peoples",icon:"◉",l:"Peoples",d:"Six races, five original species"},
    {id:"faith",icon:"✦",l:"Faith & Magic",d:"Eonarism, the Pact, the Aetherflow"},
    {id:"factions",icon:"⚔",l:"Factions",d:"Powers that shape Val'Run"},
    {id:"mosaic",icon:"◈",l:"The Mosaic",d:"The connecting threads"},
  ];
  return (
    <div>
      <div style={{minHeight:"88vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"80px 40px",background:`radial-gradient(ellipse at 50% 30%,#18102e 0%,${C.bg} 68%)`}}>
        <div style={{position:"relative"}}>
          {[700,500,300].map(s=>(
            <div key={s} style={{position:"absolute",width:s,height:s,borderRadius:"50%",border:`1px solid ${C.gold}10`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
          ))}
          <div style={{position:"relative",zIndex:1}}>
            <div style={{color:C.teal,fontSize:10,letterSpacing:6,textTransform:"uppercase",marginBottom:18}}>Present Year · 1,147 AI · The Seventh Age</div>
            <h1 style={{fontSize:82,fontWeight:"normal",margin:0,letterSpacing:8,color:C.text}}>Val'Run</h1>
            <div style={{color:C.gold,fontSize:13,letterSpacing:4,margin:"14px 0 28px",textTransform:"uppercase"}}>A World Compendium</div>
            <p style={{maxWidth:540,margin:"0 auto 44px",color:C.dim,fontSize:16,lineHeight:1.9,fontStyle:"italic"}}>
              "The world is still being made. The Architect's breath has not yet finished its song. You who read these words — you are part of the shaping."
            </p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>go("lore")} style={{background:C.gold,color:"#080810",border:"none",padding:"13px 34px",fontSize:12,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:4}}>Begin Reading</button>
              <button onClick={()=>go("geography")} style={{background:"transparent",color:C.text,border:`1px solid ${C.border}`,padding:"13px 34px",fontSize:12,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",borderRadius:4}}>Explore the World</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:"48px 56px",background:C.card,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{color:C.gold,fontSize:10,letterSpacing:4,textTransform:"uppercase",textAlign:"center",marginBottom:28}}>The Seven Ages of Val'Run</div>
        <div style={{display:"flex",overflowX:"auto",gap:0}}>
          {ages.map((a,i)=>(
            <div key={i} onClick={()=>go("history")} style={{flex:1,minWidth:90,padding:"18px 12px",borderLeft:i===0?`1px solid ${C.border}`:"none",borderRight:`1px solid ${C.border}`,borderTop:a.cur?`2px solid ${C.gold}`:`2px solid transparent`,background:a.cur?`${C.gold}0a`:"transparent",cursor:"pointer",textAlign:"center"}}>
              <div style={{color:a.cur?C.gold:C.muted,fontSize:9,marginBottom:5}}>Age {a.n}</div>
              <div style={{color:a.cur?C.text:C.dim,fontSize:12,fontWeight:a.cur?"bold":"normal"}}>{a.name}</div>
              <div style={{color:C.muted,fontSize:9,marginTop:3}}>{a.period}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"52px 56px"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{color:C.gold,fontSize:10,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>Explore</div>
          <h2 style={{fontSize:26,fontWeight:"normal",margin:0,color:C.text}}>Where would you like to begin?</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14}}>
          {links.map(lk=>(
            <div key={lk.id} onClick={()=>go(lk.id)} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold+"60";e.currentTarget.style.background=C.hover;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card;}} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:7,padding:"24px 20px",cursor:"pointer",display:"flex",alignItems:"flex-start",gap:14,transition:"all 0.15s"}}>
              <div style={{fontSize:20,minWidth:28}}>{lk.icon}</div>
              <div><div style={{color:C.text,fontSize:15,marginBottom:3}}>{lk.l}</div><div style={{color:C.dim,fontSize:12}}>{lk.d}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Lore() {
  const [od,setOd]=useState(null);
  const deities=[
    {n:"Lumina",t:"Shimmering Veil",d:"Light, stars, discovery",note:"Firstborn.",c:"#f0d070"},
    {n:"Terron",t:"Stoneheart",d:"Earth, mountains, strength",note:"Patron of dwarves.",c:"#a08060"},
    {n:"Reyron",t:"Flame Warden",d:"Fire, transformation, forge",note:"Patron of blacksmiths.",c:"#e06030"},
    {n:"Maris",t:"Tide Whisperer",d:"Seas, rivers, rain",note:"Invoked for safe passage.",c:"#4080c0"},
    {n:"Aerel",t:"Sky Dancer",d:"Wind, weather, skies",note:"Laughed at creation.",c:"#80c0d0"},
    {n:"Cavale",t:"Forest Sentinel",d:"Woods, plants, animals",note:"Symbol: the Shimmer Stag.",c:"#509040"},
    {n:"Vitalis",t:"Life Stream",d:"Health, growth, vitality",note:"Patron of healers.",c:"#70c070"},
    {n:"Mystria",t:"Arcane Conduit",d:"Magic, mystical forces",note:"Most important in Twiland.",c:"#9060c0"},
    {n:"Luna",t:"Shadow Veil",d:"Secrets, night, the unknown",note:"Dangerous proximity to Nyxos.",c:"#5050a0"},
  ];
  const labors=[
    {n:1,nm:"Forging of Stone",d:"Raw matter pulled from Vael'thura. The densest places became Corestones."},
    {n:2,nm:"Kindling of Fire",d:"Warmth from friction — the first of creation's surprises. Fire is sacred to those who labor."},
    {n:3,nm:"Weeping of the Seas",d:"Eonar wept in understanding. The tears became rivers and seas."},
    {n:4,nm:"Lifting of the Sky",d:"Breath rose upward, carrying winds, weather, storms."},
    {n:5,nm:"Sowing of Life",d:"Forests, creatures, swimming things, flying things. The longest labor."},
    {n:6,nm:"Naming of Peoples",d:"Eonar breathed more deeply into certain creatures — giving them the self. The capacity to say I am."},
    {n:7,nm:"The Rest",d:"The work was done. Eonar smiled for the first time — the Stillness of the Smile."},
  ];
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="The Lore" sub="The Book of the Shaping — canonical scripture of Eonarism, preserved in the Cathedral of the Architect"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:36}}>
        <Box>
          <div style={{color:C.gold,fontSize:14,marginBottom:10}}>I. The Time Before Time</div>
          <p style={{color:C.dim,lineHeight:1.85,margin:0,fontSize:14}}>Before the first day, there was only <em style={{color:C.text}}>Vael'thura</em> — the unbroken dark. Not the darkness of night, but a deeper state without edges, without direction. Within that formless deep, something stirred — not a sound, not a light, but a question. And in the asking, the darkness changed. That first change was Eonar.</p>
        </Box>
        <Box>
          <div style={{color:C.gold,fontSize:14,marginBottom:10}}>II. The Waking of the Architect</div>
          <p style={{color:C.dim,lineHeight:1.85,margin:0,fontSize:14}}>Eonar <em style={{color:C.text}}>condensed</em> — gathering from the formless dark like a droplet on cold stone. Eonar felt love for the dark that held the seed of being, and longing for all it lacked. So Eonar spoke — the first act of will in all existence. The word spread, and where it touched, the darkness became the capacity for difference.</p>
        </Box>
        <Box style={{gridColumn:"1/-1"}}>
          <div style={{color:C.teal,fontSize:14,marginBottom:10}}>III. The Aetherflow — The Breath That Lives</div>
          <p style={{color:C.dim,lineHeight:1.85,margin:0,fontSize:14}}>Eonar drew the first breath in all existence and breathed outward. That breath did not dissipate — it took shape, curling into patterns that reached and folded endlessly. It has not stopped because Eonar has not stopped breathing since. This is the <em style={{color:C.teal}}>Aetherflow</em>. It moves through stone and tree, through flesh and wind, through the space between stars. Every mage who casts a spell reaches into the Architect's breath and shapes a small part of it.</p>
        </Box>
      </div>
      <h3 style={{color:C.text,fontSize:18,fontWeight:"normal",marginBottom:18}}>The Seven Labors</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:40}}>
        {labors.map(lb=>(
          <div key={lb.n} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:18}}>
            <div style={{color:C.gold,fontSize:9,letterSpacing:2,marginBottom:7}}>LABOR {lb.n}</div>
            <div style={{color:C.text,fontSize:13,marginBottom:7}}>{lb.nm}</div>
            <div style={{color:C.dim,fontSize:12,lineHeight:1.65}}>{lb.d}</div>
          </div>
        ))}
      </div>
      <Box style={{borderColor:C.gold+"40",background:`linear-gradient(to right,${C.card},#140c1a)`,marginBottom:40}}>
        <div style={{color:C.gold,fontSize:18,marginBottom:12}}>Thal'veren — The Necessary Breaking</div>
        <p style={{color:C.dim,lineHeight:1.85,margin:"0 0 16px",fontSize:14}}>Creation was too perfect — nothing could die without shattering the whole. So Eonar introduced a single, deliberate imperfection: a place where structure could give way, where endings could occur and beginnings follow. This is Thal'veren. Present in every stone that will one day erode, every civilization that will rise and fall.</p>
        <blockquote style={{borderLeft:`3px solid ${C.gold}`,margin:0,paddingLeft:14,color:C.text,fontStyle:"italic",fontSize:13,lineHeight:1.8}}>"The breaking is necessary. The breaking is good. But there will come those who deny it... When they arise, Thal'veren will answer them. And the answer will be terrible."</blockquote>
      </Box>
      <h3 style={{color:C.text,fontSize:18,fontWeight:"normal",marginBottom:6}}>The Nine Sub-Deities</h3>
      <p style={{color:C.dim,marginBottom:20,fontSize:14}}>Drawn from Eonar during the Dividing of the Self. Click each to expand.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
        {deities.map(d=>(
          <div key={d.n} onClick={()=>setOd(od===d.n?null:d.n)} style={{background:C.card,border:`1px solid ${od===d.n?d.c+"50":C.border}`,borderTop:`3px solid ${d.c}60`,borderRadius:6,padding:16,cursor:"pointer"}}>
            <div style={{color:d.c,fontSize:15,marginBottom:2}}>{d.n}</div>
            <div style={{color:C.dim,fontSize:11,fontStyle:"italic"}}>{d.t}</div>
            {od===d.n&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
              <div style={{color:C.text,fontSize:13,marginBottom:4}}>{d.d}</div>
              <div style={{color:C.dim,fontSize:12}}>{d.note}</div>
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Geography() {
  const [ar,setAr]=useState("verdure");
  const R={
    verdure:{name:"Verdure",sub:"The Temperate North",c:"#509040",desc:"A tapestry of evergreen woodlands, clear streams, and alpine meadows. The industrial heartland of Val'Run, driven by mining, craftsmanship, and innovation. Dwarves and humans coexist in a mutually beneficial relationship.",
      cities:["Everpeak (125,000) — Capital of innovation, built on ruins of imperial Aureon","Bastion's Reach (75,000) — Fortified port, capital of Rhystara","Timbercross (60,000) — Forestry hub, capital of Eryndor","Grimgar (80,000) — Trade-oriented dwarven city","Durumbar (50,000) — Dwarven stronghold in the Frostcrown Ridges","Riftward (20,000) — Scholarly town near the Rupture"],
      marks:["The Rupture — Jagged scar, 8 leagues long, from the Anchor's first activation","The Gloomswood — Dense shadowed forest where the Aetherflow is unnaturally still","The Velorath Resonance Halls — Spherical chambers carved beneath the mountains","The Frostcrown Ridges — Peaks to 3,267m, highest at Aurora Summit"]},
    twiland:{name:"Twiland",sub:"The Enchanted South-West",c:"#9060c0",desc:"A land steeped in magic and mystery, divided by the luminous Luminous River. The west holds the Velvet Plains; the east is dominated by the World Tree Forest. Governed by strong magical bloodlines from hidden, ward-protected cities.",
      cities:["Luneberg — Largest city, closest to the World Tree, cultural heart","Lylenore — Bioluminescent city in the Gloaming Forest","Nilvelond — Coastal port, hub for external trade","Onhethas — Hidden healing sanctuary in the Mistral Forest","Flaluma — Only non-forest settlement; home to elves and humans"],
      marks:["The World Tree — Colossal, bioluminescent, spiritual heart of Twiland","The Gloaming Forest — Perpetually twilit, bioluminescent","The Whispering Barrows — Ancient elven burial mounds; wind produces low harmonics","Moonshadow Mount — 1,150m; major pilgrimage site"]},
    sarudar:{name:"Sarudar",sub:"The Desert East",c:"#c08030",desc:"A harsh region ranging from Golden Dunes in the east to Whispering Canyons in the west. Water is life — scarce, precious, fought over. Home to nomadic human and orcish tribes, along with fauns, gnolls, and the Sketh.",
      cities:["Gadh'aran — Central trade hub, governed by High Shaman Zarek Ashwalker","Brabrar — Fortified trade town, Confederacy headquarters","Lazgudh — Militaristic border town; Warlord Dressa Ironjaw","Armul — Smaller settlement on interior desert routes"],
      marks:["The Tomb of Time — Zelkaris Aetheric observatory, guarded by the Sketh","The Endless Pit — Zelkaris ventilation shaft; strange sounds emerge from below","Mirage's Haven — Largest oasis; appears to wander between visits","The Petrified Forest — Trees turned to stone by the Anchor's first activation"]},
    cinder:{name:"Cinder Island",sub:"The Volcanic South",c:"#c04020",desc:"Dominated by the Obsidian Throne volcano. The island was razed during the Impact, leaving only the outermost parts untouched. The Black Bastion stands as the last inhabited fortress, home to the Tharalyn family and a joint garrison of ~2,000 soldiers.",
      cities:["Black Bastion — Enormous fortress of Onyx Spire stone. Lord Vaelen Tharalyn commands."],
      marks:["The Obsidian Throne — Active volcano ~2,100m, directly above the buried Aetheric Anchor","The Onyx Spires — Black volcanic range encircling the Obsidian Throne","The Emberwood — Volcanic forest with shimmering bark and fiery foliage","The Ashborn Statues — When an Ashborn dies, their body solidifies into black stone"]},
  };
  const r=R[ar];
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="Geography of Val'Run" sub="A continent divided into four great regions, bound together by the Serene Sea"/>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:28}}>
        {Object.entries(R).map(([k,v])=>(
          <button key={k} onClick={()=>setAr(k)} style={{background:"none",border:"none",borderBottom:ar===k?`2px solid ${v.c}`:"2px solid transparent",color:ar===k?v.c:C.dim,padding:"11px 22px",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,letterSpacing:1}}>
            {v.name}
          </button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:24,marginBottom:28}}>
        <div>
          <div style={{color:r.c,fontSize:10,letterSpacing:3,textTransform:"uppercase",marginBottom:5}}>{r.sub}</div>
          <h2 style={{color:C.text,fontSize:30,fontWeight:"normal",margin:"0 0 14px"}}>{r.name}</h2>
          <p style={{color:C.dim,lineHeight:1.85,marginBottom:22,fontSize:14}}>{r.desc}</p>
          <div style={{color:C.gold,fontSize:9,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Major Landmarks</div>
          {r.marks.map((m,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:8}}>
              <div style={{color:r.c,fontSize:7,marginTop:5,minWidth:6}}>◆</div>
              <div style={{color:C.dim,fontSize:13,lineHeight:1.6}}>{m}</div>
            </div>
          ))}
        </div>
        <Box>
          <div style={{color:C.gold,fontSize:9,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Cities & Settlements</div>
          {r.cities.map((c,i)=>{const[nm,...rest]=c.split(" — ");return(
            <div key={i} style={{borderBottom:i<r.cities.length-1?`1px solid ${C.border}`:"none",paddingBottom:i<r.cities.length-1?10:0,marginBottom:i<r.cities.length-1?10:0}}>
              <div style={{color:C.text,fontSize:13}}>{nm}</div>
              {rest.length>0&&<div style={{color:C.dim,fontSize:11,marginTop:2}}>{rest.join(" — ")}</div>}
            </div>
          );})}
        </Box>
      </div>
      <Div/>
      <Box style={{borderColor:"#4080c050"}}>
        <div style={{color:"#4080c0",fontSize:17,marginBottom:10}}>The Serene Sea</div>
        <p style={{color:C.dim,lineHeight:1.85,margin:"0 0 12px",fontSize:14}}>The inland ocean connecting all regions. Hunted by pirates (chiefly the Crimson Tide), menaced by seasonal storms, and dominated at its heart by the <em style={{color:C.text}}>Gyre of the Deep</em> — a massive whirlpool growing stronger year by year. Beneath its churning waters, the Thalvari maintain hidden settlements. Below those, the broken Aetheric Anchor continues to drain magic into the earth.</p>
        <div style={{color:C.teal,fontSize:12,fontStyle:"italic"}}>⚠ The Gyre expands measurably each decade. Tidecallers document it as stronger than a century prior.</div>
      </Box>
    </div>
  );
}

function History() {
  const [exp,setExp]=useState("seventh");
  const ages=[
    {id:"first",n:"I",name:"The Age of Shaping",p:"Mythic",c:"#f0d070",evs:["Eonar condenses from Vael'thura","The Seven Labors performed","The Ninefold Division — Nine Sub-Deities are born","Thal'veren woven into the fabric of the world"]},
    {id:"second",n:"II",name:"The Age of Wandering",p:"~10,000–2,000 BI",c:"#80c080",evs:["Mortals settle the world across millennia","First cities rise around 8,000 BI","Races begin encountering one another around 4,000 BI","Trade, conflict, and language divergence follow"]},
    {id:"third",n:"III",name:"The Age of Zelkaris",p:"~2,000 BI–0 AI",c:"#80b0f0",evs:["~2,000 BI: Zelkaris culture emerges on Cinder Island (then Zelkarun)","~1,400 BI: Mana-crystal technology; the Tomb of Time built","~300 BI: The Great Work begins — construction of the Aetheric Anchor","~200 BI: Anchor activated. The Rupture opens. The Petrified Forest created.","Year 0 — THE IMPACT. Meteor strikes. The Zelkaris civilization is destroyed."]},
    {id:"fourth",n:"IV",name:"The Dark Age",p:"5–237 AI",c:"#9060a0",evs:["5 AI: The Black Bastion completed by surviving Zelkaris builders","145 AI: Valtheris Morvain born in a nomadic Sarudar tribe","190 AI: Conquest of Verdure begins","237 AI: Valtheris declares himself Emperor of the Aurean Empire"]},
    {id:"fifth",n:"V",name:"The Age of Empire",p:"237–874 AI",c:"#c09040",evs:["247 AI: Aureon founded","343–490 AI: The Golden Age — roads, aqueducts, the Kings' Road","540 AI: First recorded reports of the Shadow Pact as an organized cult","840 AI: The Ironspire Rebellion — Verdure's industrial cities revolt","874 AI: Eliron II dies. His daughter Elayna refuses the throne. The Empire falls."]},
    {id:"sixth",n:"VI",name:"The Reformation",p:"874–927 AI",c:"#60a080",evs:["875–890 AI: The Scrambling — provinces break apart","890–920 AI: Kingdoms of Rhystara, Eryndor, Durumbar, Grimgar form","925 AI: Five visionaries meet in Aureon's ruins","927 AI: Everpeak founded. The Council of Five established."]},
    {id:"seventh",n:"VII",name:"The New Age",p:"927 AI–Present (1,147 AI)",c:C.gold,cur:true,evs:["945 AI: First mana-crystal refining facility built","1,015 AI: The Gilded Consortium founded in Bastion's Reach","1,080 AI: Collegium of the Fracture officially founded in Riftward","1,115 AI: Major eruption of the Obsidian Throne damages Nilvelond's harbor","1,146 AI: The Gyre of the Deep expands noticeably","1,147 AI (Present): The Aetheric Anchor continues to crack. None who hold puzzle pieces have spoken to one another."]},
  ];
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="Timeline of the Ages" sub="Val'Run's history spans seven great ages. Present year: 1,147 AI."/>
      <div style={{display:"flex",gap:0,alignItems:"stretch"}}>
        <div style={{width:2,background:`linear-gradient(to bottom,${C.border},${C.gold},${C.border})`,marginRight:22,flexShrink:0}}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:12}}>
          {ages.map(a=>(
            <div key={a.id}>
              <div onClick={()=>setExp(exp===a.id?null:a.id)} style={{display:"flex",alignItems:"flex-start",gap:14,cursor:"pointer",padding:"14px 18px",background:exp===a.id?C.card:"transparent",border:`1px solid ${exp===a.id?a.c+"40":"transparent"}`,borderLeft:`3px solid ${a.c}`,borderRadius:6}}>
                <div style={{minWidth:55,color:a.c,fontSize:9,letterSpacing:2,paddingTop:2}}>AGE {a.n}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                    <span style={{color:a.cur?a.c:C.text,fontSize:15}}>{a.name}</span>
                    <span style={{color:C.muted,fontSize:11}}>{a.p}</span>
                  </div>
                  {a.cur&&<div style={{color:C.gold,fontSize:10,marginTop:2}}>⟡ CURRENT AGE</div>}
                </div>
              </div>
              {exp===a.id&&(
                <div style={{marginLeft:70,marginTop:8,display:"flex",flexDirection:"column",gap:7}}>
                  {a.evs.map((ev,i)=>(
                    <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                      <div style={{color:a.c,fontSize:7,marginTop:5,minWidth:6}}>◆</div>
                      <div style={{color:i===a.evs.length-1&&a.cur?C.text:C.dim,fontSize:13,lineHeight:1.6}}>{ev}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Peoples() {
  const [ac,setAc]=useState(null);
  const classic=[
    {n:"Humans",ls:"70–90 years",mg:"Weakest natural cores — cannot cast without tools. Drove technological innovation.",hm:"Verdure & Sarudar",d:"Dominant across Verdure and Sarudar. Their magical limitations drove Val'Run's technological revolution — humans built machines because they could not build spells.",c:"#c09060"},
    {n:"Elves",ls:"500–700 years",mg:"Strongest natural cores. Even weak bloodlines can enchant. Hereditary, tied to bloodline purity.",hm:"Twiland",d:"Tall and slender, 180–195cm. Reflective eyes adapted for night vision. The Dimming — a century of rapid decline — ends every elven life. Magic shapes their social hierarchy.",c:"#9060c0"},
    {n:"Dwarves",ls:"200–250 years",mg:"Virtually none — a point of pride. Runic lore is engineering mimicry, not true spellcasting.",hm:"Durumbar & Grimgar",d:"Short and powerfully built, 130–145cm. Carry twice what a human can manage. Denser bones, thicker muscles — a faintly stony quality to the skin.",c:"#a08060"},
    {n:"Orcs",ls:"80–120 years",mg:"Moderate. Raw, physical, tied to emotion. Channeled through movement, chanting, and dance.",hm:"Sarudar",d:"Large and muscled, 185–210cm. A unique secondary eyelid adapted to desert sandstorms. Orcish shamans narrate spells as storytelling.",c:"#608040"},
    {n:"Fauns",ls:"150–200 years",mg:"Musical magic — channeled through song and rhythm. A faun's drumming sharpens reflexes.",hm:"Twiland & Sarudar",d:"Human above the waist; deer or goat legs below. Twiland fauns tend deer-like; Sarudar fauns tend goat-like. Their music-magic is entirely unique.",c:"#80c060"},
    {n:"Centaurs",ls:"120–180 years",mg:"Low to moderate. Uniquely sensitive to Aetherflow currents — invaluable as scouts.",hm:"Twiland",d:"Human torso, horse body. 200–230cm. Capable of sustained speed no mounted rider can match. Warriors and protectors of Twiland's sacred sites.",c:"#6080a0"},
    {n:"Gnolls",ls:"50–70 years",mg:"Negligible — compensated by exceptional senses. A gnoll can follow a scent days old.",hm:"Sarudar",d:"Bipedal, hyena-like. Shortest lifespan of any sentient race — making gnolls pragmatic, impatient, and acutely focused on the present.",c:"#c07040"},
  ];
  const original=[
    {n:"The Velorath",st:"Stone Singers of the Deep",ls:"400–1,000+ years",mg:"Resonance singing — conversation with stone itself, not Aetherflow spellcasting.",hm:"Beneath the Frostcrown Ridges",d:"Gaunt, pale-gray, with phosphorescent blood and six-fingered hands that carve stone barehanded. Entirely black eyes adapted to absolute darkness. They have begun carving warning images for the surface world.",c:"#a0a0c0"},
    {n:"The Ashborn",st:"Children of the Obsidian Throne",ls:"40–60 years",mg:"Thermal manipulation — walk through lava unharmed. Absorb, store, redirect heat.",hm:"Cinder Island",d:"Charcoal-dark skin cracked like cooling lava, bioluminescent blood visible through the cracks. Body temperature ~55°C. They consider the Obsidian Throne alive and dreaming.",c:"#e06030"},
    {n:"The Thalvari",st:"The Tide Walkers",ls:"200–300 years",mg:"Water magic exclusively — current control, wave manipulation, barriers of compressed water.",hm:"The Serene Sea",d:"Amphibious humanoids with shifting skin from deep blue to sea-green. Bioluminescent markings unique to each individual. Their council, the Deepcircle, debates whether to break millennial isolation and warn the surface world.",c:"#4080c0"},
    {n:"The Pethryn",st:"The Rootbound",ls:"Unknown — possibly indefinite",mg:"Ambient acceleration or deceleration of natural processes. Near a Pethra, wounds heal faster, plants grow quicker.",hm:"The Petrified Forest",d:"Living petrified wood — 180–250cm, bark-like skin as hard as stone yet flexible as living tissue. Created when the Aetheric Anchor's first activation petrified the forest around 200 BI.",c:"#806040"},
    {n:"The Sketh",st:"The Memory Keepers",ls:"100–150 years",mg:"Memory stone — imprint and replay memories through stone surfaces.",hm:"Sarudar ruins",d:"Bipedal lizard-folk with fine-grained scales, elongated skulls, and forked tongues for chemical-sensing. They guard Zelkaris ruins and vast memory-stone libraries, waiting for someone specific.",c:"#80a040"},
  ];
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="Peoples of Val'Run" sub="Six classic races and five original species — each with their own history, magic, and place in the world"/>
      <h3 style={{color:C.text,fontSize:17,fontWeight:"normal",marginBottom:18}}>The Classic Races</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14,marginBottom:40}}>
        {classic.map(r=>(
          <div key={r.n} onClick={()=>setAc(ac===r.n?null:r.n)} style={{background:C.card,border:`1px solid ${ac===r.n?r.c+"50":C.border}`,borderTop:`3px solid ${r.c}`,borderRadius:6,padding:18,cursor:"pointer"}}>
            <div style={{color:r.c,fontSize:17,marginBottom:3}}>{r.n}</div>
            <div style={{color:C.dim,fontSize:11}}>{r.hm}</div>
            {ac===r.n&&<>
              <p style={{color:C.dim,fontSize:13,lineHeight:1.7,margin:"10px 0 10px"}}>{r.d}</p>
              <div style={{fontSize:11}}><span style={{color:C.muted}}>Lifespan: </span><span style={{color:C.text}}>{r.ls}</span></div>
              <div style={{fontSize:11,marginTop:4}}><span style={{color:C.muted}}>Magic: </span><span style={{color:C.teal}}>{r.mg}</span></div>
            </>}
          </div>
        ))}
      </div>
      <Div/>
      <h3 style={{color:C.text,fontSize:17,fontWeight:"normal",marginBottom:6}}>The Original Species</h3>
      <p style={{color:C.dim,marginBottom:18,fontSize:14}}>Five species that have, until recently, remained on the edges of recorded history.</p>
      <div style={{display:"flex",flexDirection:"column",gap:13}}>
        {original.map(s=>(
          <div key={s.n} onClick={()=>setAc(ac===s.n?null:s.n)} style={{background:C.card,border:`1px solid ${ac===s.n?s.c+"50":C.border}`,borderRadius:6,padding:18,cursor:"pointer",display:"flex",gap:16,alignItems:"flex-start"}}>
            <div style={{width:3,background:s.c,borderRadius:2,alignSelf:"stretch",minWidth:3}}/>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
                <div><span style={{color:s.c,fontSize:16}}>{s.n}</span><span style={{color:C.muted,fontSize:11,marginLeft:10,fontStyle:"italic"}}>{s.st}</span></div>
                <div style={{color:C.muted,fontSize:11}}>{s.hm}</div>
              </div>
              {ac===s.n?<>
                <p style={{color:C.dim,fontSize:13,lineHeight:1.7,margin:"6px 0 8px"}}>{s.d}</p>
                <div style={{fontSize:11,color:C.muted}}>Lifespan: <span style={{color:C.text}}>{s.ls}</span> · Magic: <span style={{color:C.teal}}>{s.mg}</span></div>
              </>:<div style={{color:C.dim,fontSize:12}}>{s.d.substring(0,110)}…</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Faith() {
  const [tab,setTab]=useState("faiths");
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="Faith & Magic" sub="Three faiths, one source of power, and the breath of an Architect still breathing"/>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:28}}>
        {[["faiths","The Three Faiths"],["magic","The Aetherflow"],["rituals","Key Rituals"]].map(([id,l])=>(
          <button key={id} onClick={()=>setTab(id)} style={{background:"none",border:"none",borderBottom:tab===id?`2px solid ${C.gold}`:"2px solid transparent",color:tab===id?C.gold:C.dim,padding:"11px 22px",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13}}>{l}</button>
        ))}
      </div>
      {tab==="faiths"&&<div style={{display:"flex",flexDirection:"column",gap:20}}>
        <Box style={{borderTop:`3px solid ${C.gold}`}}>
          <div style={{color:C.gold,fontSize:18,marginBottom:10}}>The Church of Eonar — The Divided Faith</div>
          <p style={{color:C.dim,lineHeight:1.85,margin:"0 0 14px",fontSize:14}}>The dominant religion across Val'Run. No single pope — each region's priesthood operates semi-independently, united by shared scripture but divided by interpretation. A growing schism between Reformers and Traditionalists threatens unity.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div style={{padding:14,background:C.bg,borderRadius:5,border:`1px solid ${C.border}`}}>
              <div style={{color:C.text,fontSize:13,marginBottom:6}}>The Reformers</div>
              <div style={{color:C.dim,fontSize:12,lineHeight:1.65}}>Led by Priestess Ysolde Brightham. Argue Eonarism must embrace innovation, integrate mana-crystal technology, and engage in politics.</div>
            </div>
            <div style={{padding:14,background:C.bg,borderRadius:5,border:`1px solid ${C.border}`}}>
              <div style={{color:C.text,fontSize:13,marginBottom:6}}>The Traditionalists</div>
              <div style={{color:C.dim,fontSize:12,lineHeight:1.65}}>Centered in Durumbar under High Cleric Moradin Deepstone (204, dwarf). Believe Eonar's design is revealed through stone, fire, and earth — not gadgets.</div>
            </div>
          </div>
        </Box>
        <Box style={{borderTop:"3px solid #4080c0"}}>
          <div style={{color:"#4080c0",fontSize:18,marginBottom:10}}>The Path of the Deep — Followers of Thalassor</div>
          <p style={{color:C.dim,lineHeight:1.85,margin:0,fontSize:14}}>A sea-faring quasi-religious faction venerating Thalassor, deity of the deep seas. Theologically uncomfortable — they hold that Thalassor <em style={{color:C.text}}>predates Eonar</em>, woken from Vael'thura when the Architect's tears became the seas. The Sunken Citadel — their mythologized temple — is actually a pre-Impact Zelkaris distribution hub beneath the Gyre. High Tidecaller Maren Saltsong suspects the anonymous donations from pirates; she has not asked.</p>
        </Box>
        <Box style={{borderTop:"3px solid #5050a0",background:`linear-gradient(to right,${C.card},#0e0818)`}}>
          <div style={{color:"#9070e0",fontSize:18,marginBottom:10}}>The Shadow Pact — Worship of Nyxos</div>
          <p style={{color:C.dim,lineHeight:1.85,margin:"0 0 14px",fontSize:14}}>A secretive, outlawed cult. They believe Eonarism tells only half the story — that <em style={{color:C.text}}>Nyxos</em>, the echo from Luna's division, is the primordial darkness that existed before Eonar. Isolated cells of 3–7 people. Estimated 500–2,000 members across Val'Run.</p>
          <blockquote style={{borderLeft:`2px solid #5050a0`,margin:0,paddingLeft:12,color:"#9070e080",fontSize:12,fontStyle:"italic",lineHeight:1.8}}>The Night of Whispering Shadows — performed on the longest night of Deepcold, in absolute darkness, with circles of ash and grave dirt, chanting in the Void Tongue — a language the Pact claims was spoken before language existed.</blockquote>
        </Box>
      </div>}
      {tab==="magic"&&<div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
          <Box><div style={{color:C.teal,fontSize:15,marginBottom:10}}>The Source</div><p style={{color:C.dim,lineHeight:1.85,margin:0,fontSize:14}}>Magic stems from the Aetherflow — Eonar's breath, made permanent. Not a static network but a living current permeating all matter, all life, all space. Every mage who casts a spell reaches into the Architect's breath and shapes a small part of it.</p></Box>
          <Box><div style={{color:C.teal,fontSize:15,marginBottom:10}}>Personal Resonance</div><p style={{color:C.dim,lineHeight:1.85,margin:0,fontSize:14}}>Each user possesses an Aetheric core — an internal wellspring passed through bloodlines. Casting draws energy from the core, shapes it with focus and intent, and releases it into the Aetherflow. Overuse causes exhaustion, illness, or death.</p></Box>
        </div>
        <h3 style={{color:C.text,fontSize:16,fontWeight:"normal",marginBottom:14}}>Magic Across Cultures</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {[{r:"Twiland",c:"#9060c0",d:"Melodic, poetic incantations in ancient Elvish. Magic is birthright and responsibility. Shapes social hierarchy — stronger bloodlines lead."},{r:"Verdure",c:"#509040",d:"Humans lack natural magic. Enchanted tools and Corestones are prized. Innovation born from limitation."},{r:"Sarudar",c:"#c08030",d:"Guttural chants blended with movement — stomping, clapping, dancing. Shamans narrate spells as storytelling."}].map(x=>(
            <div key={x.r} style={{background:C.card,border:`1px solid ${C.border}`,borderTop:`3px solid ${x.c}`,borderRadius:6,padding:18}}>
              <div style={{color:x.c,fontSize:14,marginBottom:8}}>{x.r}</div>
              <div style={{color:C.dim,fontSize:13,lineHeight:1.65}}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>}
      {tab==="rituals"&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
        {[
          {n:"The Maker's Creed",w:"Verdure, daily",d:'"By Eonar\'s hand the world was shaped. By our hands, the world continues. Let what we build today endure."',c:C.gold},
          {n:"The Blooming Ceremony",w:"Twiland, first day of Bloomtide",d:"The World Tree's foliage brightens, petals cascade, and the Aetherflow synchronizes with participants' heartbeats. Participants sit among the roots all night.",c:"#9060c0"},
          {n:"The Rite of the Forge",w:"Verdure, annual (Forgebright Festival)",d:"The senior smith forges a single item — usually a nail — placed on Reyron's altar for a year, then distributed by lottery as a good-luck charm.",c:"#e06030"},
          {n:"The Blood of the Sands",w:"Sarudar, as needed",d:"Shaman slices their left palm, lets blood fall onto sand within a prepared circle. Patterns are read as messages from the desert spirits.",c:"#c08030"},
          {n:"The Night of Whispering Shadows",w:"Shadow Pact, longest night of Deepcold",d:"Performed in absolute darkness. Circles of ash and grave dirt. The Void Tongue. Participants report hearing whispers from the darkness itself.",c:"#5050a0"},
        ].map(r=>(
          <Box key={r.n} style={{borderLeft:`3px solid ${r.c}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
              <div style={{color:r.c,fontSize:15}}>{r.n}</div>
              <div style={{color:C.muted,fontSize:11}}>{r.w}</div>
            </div>
            <div style={{color:C.dim,fontSize:13,lineHeight:1.7}}>{r.d}</div>
          </Box>
        ))}
      </div>}
    </div>
  );
}

function Factions() {
  const [tab,setTab]=useState("political");
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="Factions & Powers" sub="The guilds, cults, pirates, and rulers that shape Val'Run's present."/>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:28,overflowX:"auto"}}>
        {[["political","Political"],["trade","Trade & Guilds"],["criminal","Underworld"],["military","Military"]].map(([id,l])=>(
          <button key={id} onClick={()=>setTab(id)} style={{background:"none",border:"none",borderBottom:tab===id?`2px solid ${C.gold}`:"2px solid transparent",color:tab===id?C.gold:C.dim,padding:"11px 20px",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:13,whiteSpace:"nowrap"}}>{l}</button>
        ))}
      </div>
      {tab==="political"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
        {[
          {n:"King Aldric Voss III",f:"Kingdom of Rhystara",c:"#6080a0",d:"Age 54. Calculating, patient. Obsessed with naval supremacy. Quietly expanding the fleet beyond trade needs. Sees the Serene Sea as Rhystara's birthright."},
          {n:"Queen Isolde Taren",f:"Kingdom of Eryndor",c:"#80a060",d:"Age 41. First queen in over two centuries. Married a commoner engineer — a scandal. Enacted strict forestry laws earning loyalty from the working class."},
          {n:"Council of Five",f:"Everpeak",c:C.gold,d:"Emberheart (Alchemy) · Ironmar (Engineering) · Starforge (Invention) · Solvayne (Trade) · Caladris (Vision). Mediates between kingdoms. Holds more secrets than it shares."},
          {n:"Council of Concord",f:"Twiland",c:C.purple,d:"Each Elven Lord governs a settlement. Meets annually beneath the World Tree. Lord Caelindor Aethyn (487) chairs. An internal divide between isolation and engagement grows."},
          {n:"Lord Vaelen Tharalyn",f:"Black Bastion, Cinder Island",c:C.red,d:"Age 39. Last of the Zelkaris noble line. Speaks fluent Wenlyrian — one of perhaps a dozen alive. Spends nights poring over crumbling pre-Impact manuscripts."},
          {n:"High Shaman Zarek Ashwalker",f:"Gadh'aran, Sarudar",c:"#c08030",d:"Age 67. Most influential voice in Sarudar's largest trade hub. Deeply distrustful of Verdure. Developing a formalized shamanic tradition that could become a fourth religion."},
        ].map(x=>(
          <Box key={x.n} style={{borderTop:`3px solid ${x.c}`}}>
            <div style={{color:x.c,fontSize:15,marginBottom:3}}>{x.n}</div>
            <div style={{color:C.muted,fontSize:10,letterSpacing:1,marginBottom:8}}>{x.f.toUpperCase()}</div>
            <div style={{color:C.dim,fontSize:13,lineHeight:1.7}}>{x.d}</div>
          </Box>
        ))}
      </div>}
      {tab==="trade"&&<div style={{display:"flex",flexDirection:"column",gap:18}}>
        {[
          {n:"The Gilded Consortium",c:C.gold,d:"The dominant commercial force. Founded 80 years ago by the Solvayne family. 15% commission on all trade. Grand Factor Hadrian Solvayne officially leads — but Verana Solvayne, Council member, still controls it through her brother. Dalla Ironmar is gathering evidence."},
          {n:"The Brabrar Confederacy",c:"#c08030",d:"A survival pact between Brabrar, Lazgudh, and Gadh'aran. Any outsider wanting Sarudar goods deals through a Confederacy-licensed broker at 20% commission. Internal friction: Omal wants to formalize into a government; Kutha opposes."},
          {n:"Verduran Artificer's Guild",c:"#509040",d:"Everpeak's professional body of engineers, inventors, and alchemists. Membership requires the Trial of Making — build something functional and original within three days. Brennan Coyle and Cassian Starforge are locked in constant professional conflict."},
          {n:"The Ironspire League",c:"#a06040",d:"Revived coalition of Eryndor steel producers and weapons manufacturers. Forge-Marshal Torven Greave lobbies Queen Isolde for tariffs against Everpeak. Quietly stockpiling weapons beyond peacetime demand."},
        ].map(x=>(
          <Box key={x.n} style={{borderLeft:`3px solid ${x.c}`}}>
            <div style={{color:x.c,fontSize:17,marginBottom:8}}>{x.n}</div>
            <div style={{color:C.dim,fontSize:13,lineHeight:1.7}}>{x.d}</div>
          </Box>
        ))}
      </div>}
      {tab==="criminal"&&<div style={{display:"flex",flexDirection:"column",gap:18}}>
        {[
          {n:"The Black Serpents",c:"#505070",tc:"#8080c0",d:"Val'Run's largest criminal network, operating like a corporation. Specialize in smuggling (mana crystals, Sarudar spice), artifact theft, and protection. Enforcers called Coils prefer intimidation over violence. The anonymous Fang leads from Everpeak — possibly within a prominent guild. A splinter group has begun secret contact with the Shadow Pact; if the Fang discovers it, there will be a purge."},
          {n:"The Silent Daggers",c:"#606060",tc:"#c0c0c0",d:"Elite assassin guild. Fewer than 30 active members. Accept contracts only for political targets — never children or the powerless. Every Dagger takes a ritual Vow of Silence on initiation. Whether this is magical compulsion or surgical alteration is debated."},
          {n:"The Crimson Tide",c:C.red,tc:"#c07050",d:"Captain Dargan Kelvar's pirate fleet — 12 ships, 800 crew. Born in Sea Breeze, press-ganged at 17, deserted after watching his commander execute sailors for stealing food. Genuinely devout worshipper of Thalassor. Hidden base: Driftwood Haven — invisible from open sea unless approached at the exact correct angle. Rhystara has searched for 20 years."},
          {n:"Mother Gren — The Tunnel Court",c:"#504060",tc:"#9070b0",d:"The closest thing to governance in Everpeak's Hollows. Age unknown, race disputed. Operates for at least 30 years. Settles disputes, mediates between factions, enforces minimal rules. The Black Serpents tolerate her. Iron Blade commander Loris Kaine suspects removing her would unleash chaos."},
        ].map(x=>(
          <Box key={x.n} style={{borderTop:`3px solid ${x.c}`}}>
            <div style={{color:x.tc,fontSize:16,marginBottom:8}}>{x.n}</div>
            <div style={{color:C.dim,fontSize:13,lineHeight:1.7}}>{x.d}</div>
          </Box>
        ))}
      </div>}
      {tab==="military"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
        {[
          {n:"The Crimson Wardens",c:C.red,d:"Legendary mercenary group. The Crimson Code: loyalty to contract, neutrality in motive, no betrayal. Marshal Kael Varados — former youngest general in Rhystara's history, exiled after exposing royal corruption. Has never forgiven King Aldric."},
          {n:"The Iron Blades",c:"#606080",d:"Everpeak's private military and police force. Better equipped than any national army in Val'Run. High Commander Loris Kaine keeps a private journal of orders she considers ethically questionable."},
          {n:"Twilight Wardens",c:C.purple,d:"Twiland's magical defenders. Protect sacred groves and mana crystal sites. Guerrilla tactics and defensive wards — their battles leave no visible traces."},
          {n:"Sarudar Sandriders",c:"#c08030",d:"Cavalry units mounted on mana-infused desert beasts. Speed and ferocity. Protect trade caravans and raid rival territories. Feared across the desert."},
        ].map(x=>(
          <Box key={x.n} style={{borderTop:`3px solid ${x.c}`}}>
            <div style={{color:x.c,fontSize:15,marginBottom:8}}>{x.n}</div>
            <div style={{color:C.dim,fontSize:13,lineHeight:1.7}}>{x.d}</div>
          </Box>
        ))}
      </div>}
    </div>
  );
}

function Language() {
  const [tab,setTab]=useState("overview");
  const prons=[["1st (personal)","— (omitted)","lian"],["2nd (personal)","sai","saian"],["3rd (personal)","rei","reian"],["1st (possessive)","liar","lianar"],["2nd (possessive)","sair","saianar"],["3rd (possessive)","rien","reinar"]];
  const mods=[["Can","Nela"],["May","Zela"],["Must","Trena"],["Shall","Sela"],["Should","Kara"],["Will","Vora"]];
  const qs=[["Who?","Kei?"],["What?","Wae?"],["Where?","Dai?"],["Why?","Yla?"],["When?","Ven?"],["How?","Hau?"]];
  const preps=[["In","fin"],["On","pon"],["Under","daka"],["Over","uva"],["With","con"],["Without","sine"],["Before","prena"],["After","posta"],["Between","zara"],["Through","trana"],["Near","kara"],["Far from","dero"],["Inside","fira"],["Outside","nexa"],["Above","supa"],["Below","nida"]];
  const conjs=[["And","ek"],["Or","ol"],["But","yu"],["Because","ila"],["If","yel"],["Although","reya"],["While","tou"],["As","ki"],["When","vin"],["So","sa"]];
  const tabs=[["overview","Wenlyrian"],["phonology","Phonology"],["grammar","Grammar"],["vocabulary","Vocabulary"],["conlang","World Language"]];
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="Language" sub="Wenlyrian — ancestral tongue of the Zelkaris, and the lock on Val'Run's forgotten past"/>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:28}}>
        {tabs.map(([id,l])=>(
          <button key={id} onClick={()=>setTab(id)} style={{background:"none",border:"none",borderBottom:tab===id?`2px solid ${C.gold}`:"2px solid transparent",color:tab===id?C.gold:id==="conlang"?C.muted:C.dim,padding:"11px 18px",cursor:id==="conlang"?"default":"pointer",fontFamily:"Georgia,serif",fontSize:12,whiteSpace:"nowrap"}}>{l}</button>
        ))}
      </div>
      {tab==="overview"&&<div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24}}>
        <div>
          <p style={{color:C.dim,lineHeight:1.85,marginBottom:18,fontSize:14}}>Wenlyrian was the ancestral tongue of the Zelkaris civilization — revered for its precision, complexity, and commanding tone. It is now a language of prestige and mystery, spoken fluently only by members of the imperial bloodline's descendants, elite mages, and historians specializing in pre-Impact texts.</p>
          <p style={{color:C.dim,lineHeight:1.85,marginBottom:22,fontSize:14}}>Ancient Wenlyrian was written in <em style={{color:C.text}}>Zheran</em> — an ornate, calligraphic script composed of looping vertical glyphs. Modern transliteration uses a Latin-based script.</p>
          <Box style={{borderColor:C.gold+"40"}}>
            <div style={{color:C.gold,fontSize:14,marginBottom:10}}>Cultural Significance</div>
            <p style={{color:C.dim,fontSize:13,lineHeight:1.7,margin:0}}>Using Wenlyrian in conversation is considered arrogant or scholarly. Hearing it spoken aloud is a sign that something important is about to happen. The language is the chief obstacle between present-day Val'Run and the truth about the Zelkaris — no one can read the inscriptions that would tell them what happened.</p>
          </Box>
        </div>
        <Box>
          <div style={{color:C.teal,fontSize:13,marginBottom:14}}>Sentence Structure</div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
            <div><div style={{color:C.text,fontSize:13}}>Statements</div><div style={{color:C.gold,fontSize:11}}>Object — Subject — Verb</div></div>
            <div><div style={{color:C.text,fontSize:13}}>Questions</div><div style={{color:C.gold,fontSize:11}}>Object — Verb — Subject</div></div>
            <div><div style={{color:C.text,fontSize:13}}>Imperatives</div><div style={{color:C.gold,fontSize:11}}>Subject — Verb — (Object)</div></div>
          </div>
          <div style={{padding:12,background:C.bg,borderRadius:5}}>
            <div style={{color:C.muted,fontSize:9,letterSpacing:2,marginBottom:5}}>EXAMPLE</div>
            <div style={{color:C.teal,fontSize:15,fontStyle:"italic"}}>Lora doma sai nela</div>
            <div style={{color:C.dim,fontSize:12,marginTop:3}}>"You can go to my house"</div>
            <div style={{color:C.muted,fontSize:10,marginTop:2}}>(go — house-mine — you — can)</div>
          </div>
        </Box>
      </div>}
      {tab==="phonology"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <Box>
          <div style={{color:C.gold,fontSize:13,marginBottom:14}}>Vowels & Diphthongs</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            {[["a","'ah' (father)"],["e","'eh' (bed)"],["i","'ee' (machine)"],["o","'oh' (note)"],["u","'oo' (rune)"],["ai","'eye'"],["ei","'ay'"],["ou","'ow'"]].map(([l,p])=>(
              <div key={l} style={{display:"flex",gap:8}}><span style={{color:C.teal,minWidth:20,fontWeight:"bold",fontSize:14}}>{l}</span><span style={{color:C.dim,fontSize:12}}>{p}</span></div>
            ))}
          </div>
        </Box>
        <Box>
          <div style={{color:C.gold,fontSize:13,marginBottom:14}}>Consonant Rules</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{color:C.dim,fontSize:13}}><span style={{color:C.teal}}>th</span> — always soft (as in 'think')</div>
            <div style={{color:C.dim,fontSize:13}}><span style={{color:C.teal}}>r</span> — lightly rolled</div>
            <div style={{color:C.dim,fontSize:13}}><span style={{color:C.teal}}>x</span> — pronounced 'ksh'</div>
            <div style={{color:C.dim,fontSize:13}}>Stress falls on the second syllable unless marked</div>
          </div>
        </Box>
        <Box>
          <div style={{color:C.gold,fontSize:13,marginBottom:14}}>Tense System</div>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {[["Present","Infinitive form (lora = to go)"],["Past","Prefix pa- (pa-lora = went)"],["Future","Prefix fu- (fu-lora = will go)"],["Plural","Suffix -è (lian lorasè = 'we go')"],["Negation","Prefix na- (na-lora = 'not go')"]].map(([t,d])=>(
              <div key={t}><span style={{color:C.teal,fontSize:12}}>{t}: </span><span style={{color:C.dim,fontSize:12}}>{d}</span></div>
            ))}
          </div>
        </Box>
        <Box>
          <div style={{color:C.gold,fontSize:13,marginBottom:14}}>Nouns</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,fontSize:13}}>
            <div style={{color:C.dim}}>Consonant-ending: suffix <span style={{color:C.teal}}>-en</span> (thaal → thaalen)</div>
            <div style={{color:C.dim}}>Vowel-ending: suffix <span style={{color:C.teal}}>-nen</span> (niraa → niraanen)</div>
            <div style={{color:C.dim}}>No grammatical gender — completely gender-neutral</div>
            <div style={{color:C.dim}}>Comparative: prefix <span style={{color:C.teal}}>ra-</span> (ra-loka = 'bigger')</div>
            <div style={{color:C.dim}}>Superlative: prefix <span style={{color:C.teal}}>sa-</span> (sa-loka = 'biggest')</div>
          </div>
        </Box>
      </div>}
      {tab==="grammar"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <Box>
          <div style={{color:C.gold,fontSize:13,marginBottom:14}}>Pronouns</div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr>{["Person","Singular","Plural"].map(h=><th key={h} style={{color:C.muted,textAlign:"left",paddingBottom:7,fontWeight:"normal",fontSize:10,letterSpacing:1}}>{h.toUpperCase()}</th>)}</tr></thead>
            <tbody>{prons.map(([p,s,pl])=><tr key={p} style={{borderTop:`1px solid ${C.border}`}}><td style={{color:C.dim,padding:"7px 0",fontSize:12}}>{p}</td><td style={{color:C.teal,padding:"7px 0"}}>{s}</td><td style={{color:C.teal,padding:"7px 0"}}>{pl}</td></tr>)}</tbody>
          </table>
          <div style={{marginTop:10,color:C.muted,fontSize:10,fontStyle:"italic"}}>Note: First-person singular is omitted — the Zelkaris emphasized the collective over the individual.</div>
        </Box>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <Box>
            <div style={{color:C.gold,fontSize:13,marginBottom:12}}>Modal Verbs</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {mods.map(([e,w])=><div key={e} style={{display:"flex",gap:8}}><span style={{color:C.dim,minWidth:50,fontSize:13}}>{e}</span><span style={{color:C.teal,fontSize:13}}>{w}</span></div>)}
            </div>
          </Box>
          <Box>
            <div style={{color:C.gold,fontSize:13,marginBottom:12}}>Question Words</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {qs.map(([e,w])=><div key={e} style={{display:"flex",gap:8}}><span style={{color:C.dim,minWidth:50,fontSize:13}}>{e}</span><span style={{color:C.teal,fontSize:13}}>{w}</span></div>)}
            </div>
          </Box>
        </div>
      </div>}
      {tab==="vocabulary"&&<div>
        <h3 style={{color:C.text,fontSize:16,fontWeight:"normal",marginBottom:14}}>Prepositions</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:28}}>
          {preps.map(([e,w])=><div key={e} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:4,padding:"9px 12px",display:"flex",justifyContent:"space-between"}}><span style={{color:C.dim,fontSize:12}}>{e}</span><span style={{color:C.teal,fontSize:12}}>{w}</span></div>)}
        </div>
        <h3 style={{color:C.text,fontSize:16,fontWeight:"normal",marginBottom:14}}>Conjunctions</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
          {conjs.map(([e,w])=><div key={e} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:4,padding:"9px 12px",display:"flex",justifyContent:"space-between"}}><span style={{color:C.dim,fontSize:12}}>{e}</span><span style={{color:C.teal,fontSize:12}}>{w}</span></div>)}
        </div>
      </div>}
      {tab==="conlang"&&<Box style={{textAlign:"center",padding:"60px 40px"}}>
        <div style={{fontSize:36,marginBottom:18,opacity:0.3}}>Ꝏ</div>
        <div style={{color:C.text,fontSize:20,marginBottom:10}}>World Language — Coming Soon</div>
        <p style={{color:C.dim,maxWidth:420,margin:"0 auto",lineHeight:1.85,fontSize:14}}>A dedicated section for Val'Run's native conlang is being prepared. Grammar tables, vocabulary, phonology guide, and writing system will be added here when the language is ready.</p>
        <div style={{marginTop:24,display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          {["Phonology","Vocabulary","Grammar","Writing System","Dialects"].map(t=><div key={t} style={{padding:"7px 14px",border:`1px solid ${C.border}`,borderRadius:20,color:C.muted,fontSize:11}}>{t}</div>)}
        </div>
      </Box>}
    </div>
  );
}

function MapPage() {
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="World Map" sub="The continent of Val'Run and the Serene Sea"/>
      <div style={{background:C.card,border:`2px dashed ${C.border}`,borderRadius:8,padding:"80px 40px",textAlign:"center",minHeight:420,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{fontSize:44,marginBottom:18,opacity:0.25}}>◎</div>
        <div style={{color:C.dim,fontSize:20,fontWeight:"normal",marginBottom:8}}>Map Coming Soon</div>
        <p style={{color:C.muted,maxWidth:420,lineHeight:1.8,fontSize:14}}>The world map of Val'Run will be placed here. Once your map artwork is ready, it can be embedded and made interactive — showing regions, cities, landmarks, the Gyre of the Deep, and the Kings' Road.</p>
        <div style={{marginTop:28,display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
          {["Verdure","Twiland","Sarudar","Cinder Island","Serene Sea","The Gyre"].map(r=>(
            <div key={r} style={{padding:"7px 16px",border:`1px solid ${C.border}`,borderRadius:20,color:C.dim,fontSize:12}}>{r}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const [tab,setTab]=useState("landscapes");
  const cats=["landscapes","characters","creatures","items","locations"];
  const counts={landscapes:6,characters:8,creatures:6,items:6,locations:4};
  const ratio={landscapes:"16/9",characters:"3/4",creatures:"1/1",items:"1/1",locations:"16/9"};
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="Gallery" sub="Landscapes, characters, creatures, items, and locations of Val'Run"/>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:28}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setTab(c)} style={{background:"none",border:"none",borderBottom:tab===c?`2px solid ${C.gold}`:"2px solid transparent",color:tab===c?C.gold:C.dim,padding:"11px 18px",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:12,textTransform:"capitalize"}}>{c}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14}}>
        {Array.from({length:counts[tab]}).map((_,i)=>(
          <div key={i} style={{background:C.card,border:`1px dashed ${C.border}`,borderRadius:7,aspectRatio:ratio[tab],display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,cursor:"pointer",transition:"border-color 0.15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold+"50"} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            <div style={{fontSize:22,opacity:0.2}}>+</div>
            <div style={{color:C.muted,fontSize:10,textTransform:"capitalize"}}>{tab.slice(0,-1)} {i+1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Mosaic() {
  return (
    <div style={{padding:"52px 56px"}}>
      <SH title="The Mosaic" sub="Every piece connects to several others. The connecting threads of Val'Run."/>
      <Box style={{borderColor:C.teal+"40",background:`linear-gradient(135deg,${C.card},#08141a)`,marginBottom:28}}>
        <div style={{color:C.teal,fontSize:20,marginBottom:12}}>⟁ The Aetheric Anchor — The Central Thread</div>
        <p style={{color:C.dim,lineHeight:1.85,marginBottom:18,fontSize:14}}>The Zelkaris built the Aetheric Anchor beneath Cinder Island to give themselves permanent mastery over magic. In doing so, they defied <em style={{color:C.text}}>Thal'veren</em> — the principle that nothing should be made permanent. The meteor of Year 0 AI drove the Anchor deep and cracked it. It continues to leak. And pull. Every major mystery in present-day Val'Run traces back to that cracking device.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
          {[["The Gyre of the Deep","Aetherflow pulled toward the Anchor via the Zelkaris undersea network"],["The Rupture","Residual energy bleeding from the Anchor's original activation wound"],["Mirage's Haven","Wanders because the Anchor shifts the underground water table"],["The Obsidian Throne","Irregular pulses are the cracking Anchor venting unstable energy"],["The Ashborn","Born from prolonged exposure to concentrated Aetheric energy"],["The Pethryn","Created when the first activation petrified their forest, 200 BI"]].map(([n,d])=>(
            <div key={n} style={{background:`${C.teal}08`,border:`1px solid ${C.teal}20`,borderRadius:5,padding:12}}>
              <div style={{color:C.teal,fontSize:12,marginBottom:4}}>{n}</div>
              <div style={{color:C.muted,fontSize:11,lineHeight:1.6}}>{d}</div>
            </div>
          ))}
        </div>
      </Box>
      <h3 style={{color:C.text,fontSize:17,fontWeight:"normal",marginBottom:6}}>The People Who Hold the Puzzle</h3>
      <p style={{color:C.dim,marginBottom:18,fontSize:14}}>Several individuals each possess a fragment of the truth. None of them have met each other yet.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:13,marginBottom:36}}>
        {[
          {n:"Lord Caelindor Aethyn",p:"Has sensed the Aetherflow weakening near Twiland's coast",c:"#9060c0"},
          {n:"Tharmund Emberheart",p:"Noticed something wrong; funding unofficial Cinder Island expeditions",c:C.gold},
          {n:"Aelric Caladris IV",p:"Holds Zelkaris manuscript fragments mentioning an 'anchor'",c:"#c09040"},
          {n:"Lord Vaelen Tharalyn",p:"Reads fluent Wenlyrian — one of a dozen alive — and owns a library of pre-Impact texts",c:C.red},
          {n:"Sera Tharalyn",p:"Has a Wenlyrian stone tablet reading 'anchor' and 'deep'",c:"#c07050"},
          {n:"Magister Elia Dorne",p:"Developed an unpublished theory linking the Rupture and the Gyre",c:"#6080a0"},
          {n:"Chieftain Ghoral Sandborn",p:"Touched a Sketh memory-stone and saw pre-Impact Cinder Island, the Anchor rising from its center",c:"#c08030"},
          {n:"The Velorath",p:"Carved a warning image — a cracking vertical line with wavy lines. None have understood it yet.",c:"#a0a0c0"},
          {n:"The Thalvari",p:"Have seen the Sunken Citadel; their council debates breaking millennial isolation",c:"#4080c0"},
        ].map(p=>(
          <div key={p.n} style={{background:C.card,border:`1px solid ${C.border}`,borderLeft:`3px solid ${p.c}`,borderRadius:6,padding:14}}>
            <div style={{color:p.c,fontSize:13,marginBottom:5}}>{p.n}</div>
            <div style={{color:C.dim,fontSize:12,lineHeight:1.65}}>{p.p}</div>
          </div>
        ))}
      </div>
      <Div/>
      <Box style={{textAlign:"center",padding:"36px",borderColor:C.gold+"30",background:`linear-gradient(to bottom,${C.card},#100808)`}}>
        <div style={{color:C.gold,fontSize:10,letterSpacing:4,marginBottom:14}}>THE SCRIPTURE'S LAST LINE</div>
        <blockquote style={{fontStyle:"italic",fontSize:17,color:C.text,margin:"0 auto",maxWidth:560,lineHeight:1.9}}>"The world is still being made. The Architect's breath has not yet finished its song. You who read these words — you are part of the shaping, and what you do next will be remembered in stone."</blockquote>
      </Box>
    </div>
  );
}

export default function App() {
  const [active,setActive]=useState("home");
  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"Georgia,serif"}}>
      <nav style={{position:"sticky",top:0,zIndex:100,background:`${C.bg}f0`,backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`,padding:"0 20px",display:"flex",alignItems:"center",overflowX:"auto"}}>
        <div onClick={()=>setActive("home")} style={{color:C.gold,fontSize:14,letterSpacing:4,marginRight:28,padding:"14px 0",cursor:"pointer",whiteSpace:"nowrap"}}>VAL'RUN</div>
        {NAV.filter(n=>n.id!=="home").map(item=>(
          <button key={item.id} onClick={()=>setActive(item.id)} style={{background:"none",border:"none",borderBottom:active===item.id?`2px solid ${C.gold}`:"2px solid transparent",color:active===item.id?C.text:C.dim,padding:"14px 12px",cursor:"pointer",fontFamily:"Georgia,serif",fontSize:11,letterSpacing:1,whiteSpace:"nowrap"}}>
            {item.l}
          </button>
        ))}
      </nav>
      <main>
        {active==="home"&&<Home go={setActive}/>}
        {active==="lore"&&<Lore/>}
        {active==="geography"&&<Geography/>}
        {active==="history"&&<History/>}
        {active==="peoples"&&<Peoples/>}
        {active==="faith"&&<Faith/>}
        {active==="factions"&&<Factions/>}
        {active==="language"&&<Language/>}
        {active==="map"&&<MapPage/>}
        {active==="gallery"&&<Gallery/>}
        {active==="mosaic"&&<Mosaic/>}
      </main>
    </div>
  );
}