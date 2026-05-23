import { useEffect, useRef, useState } from "react";
import styles from "./Geography.module.css";

const MAP = "/map.jpg";

/* Curated places, sourced from /02_ATLAS/valrun_map_control_points_v1.csv.
 * x, y are percentages of the map image; scale is the map zoom level
 * (1.0 = full map, ~2.5 = a single named location).
 * region: the region label that appears as the eyebrow on the card.   */
const PLACES = [
  {
    name: "The Continent of Val'Run",
    region: "The World",
    label: "the world entire",
    x: 50, y: 50, scale: 1.05,
    body: (
      <>
        <p>
          One continent, four faces — <strong>Verdure</strong>, <strong>Twiland</strong>,{" "}
          <strong>Sarudar</strong>, and <strong>Cinder Island</strong> — bound and slowly torn
          apart by the inland <strong>Serene Sea</strong>.
        </p>
        <p>
          Click any place below to travel to it, or just scroll. The map will follow.
        </p>
      </>
    ),
  },

  /* ── Verdure ─────────────────────────────────────── */
  {
    name: "Verdure",
    region: "Verdure",
    label: "the temperate north",
    x: 40, y: 18, scale: 1.5,
    body: (
      <p>
        Evergreen woodlands, alpine meadows, and clear streams. The industrial heartland of the
        world — dwarves and humans share its forges, mines, and the paved <strong>Kings'
        Road</strong>.
      </p>
    ),
  },
  {
    name: "The Frostcrown Ridges",
    region: "Verdure",
    label: "mountains of the north",
    x: 10, y: 4, scale: 2.0,
    body: (
      <p>
        Snow-capped peaks crowning Verdure's north — Aurora Summit rises to 3,267 meters.
        Beneath them, the <strong>Velorath</strong> carve perfectly spherical resonance chambers
        whose harmonics can be felt in the bone.
      </p>
    ),
  },
  {
    name: "Durumbar",
    region: "Verdure",
    label: "the dwarven stronghold",
    x: 6, y: 9, scale: 2.6,
    body: (
      <p>
        Traditionalist dwarven kingdom carved into the Frostcrown Ridges under Mountain King
        Brokk Stonemantle. Home of the <strong>Hall of the First Stone</strong>, where the
        oldest known Corestone is displayed.
      </p>
    ),
  },
  {
    name: "Grimgar",
    region: "Verdure",
    label: "the modernizing dwarves",
    x: 10, y: 16, scale: 2.6,
    body: (
      <p>
        Stone King Thrain Goldenvein's trade-kingdom, modern foil to Durumbar. The two drift
        toward a slow cold war over what the dwarves should and shouldn't do with mana-crystal.
      </p>
    ),
  },
  {
    name: "Everpeak",
    region: "Verdure",
    label: "the city of the Council of Five",
    x: 19, y: 22, scale: 2.6,
    body: (
      <p>
        Capital city-state of Verdure, founded in 927 AI on the bones of imperial{" "}
        <strong>Aureon</strong>. Ruled by the Council of Five — Emberheart (alchemy), Ironmar
        (engineering), Starforge (invention), Solvayne (trade), and Aelric Caladris IV, the
        last open carrier of the imperial bloodline.
      </p>
    ),
  },
  {
    name: "Saltwood Hold",
    region: "Verdure",
    label: "the southwest naval gate",
    x: 4, y: 40, scale: 2.6,
    body: (
      <p>
        Fortress and naval base on Verdure's southwest coast. Controls the crossing to
        Twiland and all military resupply to the Black Bastion on Cinder Island.
      </p>
    ),
  },
  {
    name: "Bastion's Reach",
    region: "Verdure",
    label: "the northern naval gate",
    x: 76, y: 8, scale: 2.6,
    body: (
      <p>
        Fortified port-capital of the Kingdom of <strong>Rhystara</strong>, under King Aldric
        Voss III. Site of the first sustained airship flight in 1062, and seat of the
        Reformer wing of the Eonari priesthood under High Tidecaller Maren Saltsong.
      </p>
    ),
  },
  {
    name: "Timbercross",
    region: "Verdure",
    label: "the forest-and-artisan capital",
    x: 31, y: 12, scale: 2.6,
    body: (
      <p>
        Capital of the Kingdom of <strong>Eryndor</strong>, under Queen Isolde Taren. A
        bitter personal rivalry with Bastion's Reach keeps the two kingdoms from cooperation
        — not war, but constant obstruction.
      </p>
    ),
  },
  {
    name: "The Rupture",
    region: "Verdure",
    label: "the wound of the world",
    x: 58, y: 6, scale: 2.4,
    body: (
      <p>
        A jagged tear in northern Verdure, opened when the Aetheric Anchor was first activated
        around 200 BI. Magic runs <strong>Wild</strong> here. The land has not healed in
        thirteen centuries.
      </p>
    ),
  },
  {
    name: "Riftward",
    region: "Verdure",
    label: "the scholar's town",
    x: 55, y: 19, scale: 2.6,
    body: (
      <p>
        Coastal scholarly town below the Rupture. The <strong>Collegium of the Fracture</strong>,
        founded in 1080 under Magister Elia Dorne, studies the unstable Aetherflow leaking from
        the wound to its north.
      </p>
    ),
  },

  /* ── Twiland ─────────────────────────────────────── */
  {
    name: "Twiland",
    region: "Twiland",
    label: "the enchanted south-west",
    x: 22, y: 88, scale: 1.5,
    body: (
      <p>
        Bioluminescent forests, glowing rivers, hidden cities. Home to elves, fauns, centaurs,
        and unicorns under the decentralized <strong>Council of Concord</strong>. Magic runs
        strongest here.
      </p>
    ),
  },
  {
    name: "The World Tree Forest",
    region: "Twiland",
    label: "the bioluminescent heart",
    x: 4, y: 98, scale: 2.4,
    body: (
      <p>
        A colossal bioluminescent tree near Duskwatch Peak, with roughly two hundred
        genetically identical offshoots. The Tree stabilizes magic wherever its scions grow —
        the spiritual center of all Twiland.
      </p>
    ),
  },
  {
    name: "Luneberg",
    region: "Twiland",
    label: "the elven seat",
    x: 10, y: 93, scale: 2.6,
    body: (
      <p>
        Hidden city of Twiland under Lord Caelindor Aethyn. Chairs the annual Council of
        Concord beneath the World Tree. Wards turn unwelcome outsiders in circles for days.
      </p>
    ),
  },
  {
    name: "Nilvelond",
    region: "Twiland",
    label: "Twiland's western port",
    x: 2, y: 72, scale: 2.6,
    body: (
      <p>
        Twiland's northwestern shore port — gateway for the elven realm's trade in glimmers,
        enchanted living wood, starwheat, glowvine, and moonlace.
      </p>
    ),
  },
  {
    name: "Lylenore",
    region: "Twiland",
    label: "the eastern port",
    x: 58, y: 92, scale: 2.6,
    body: (
      <p>
        Twiland's eastern shoreline port, balancing Nilvelond from the far side of the forest.
        The shipping gateway of the elven realm into the deep south of the Serene Sea.
      </p>
    ),
  },

  /* ── Sarudar ─────────────────────────────────────── */
  {
    name: "Sarudar",
    region: "Sarudar",
    label: "the desert east",
    x: 90, y: 70, scale: 1.5,
    body: (
      <p>
        Golden dunes south, Whispering Canyons east, the Petrified Forest on the Verdure
        border. Water is the only true currency. Humans, orcs, fauns, gnolls, and the
        lizard-folk <strong>Sketh</strong> share the sand.
      </p>
    ),
  },
  {
    name: "Gadh'aran",
    region: "Sarudar",
    label: "the desert hub",
    x: 90, y: 64, scale: 2.6,
    body: (
      <p>
        Sarudar's central caravan town and shamanic legitimacy hub, under High Shaman Zarek
        Ashwalker. The <strong>Stone of Speaking</strong> sits at its heart — the desert's
        one concession to permanence.
      </p>
    ),
  },
  {
    name: "Brabrar",
    region: "Sarudar",
    label: "the trade gate",
    x: 84, y: 58, scale: 2.6,
    body: (
      <p>
        Western coastal trade town and one of the three pillars of the{" "}
        <strong>Brabrar Confederacy</strong>, Sarudar's pragmatic trade pact. Twenty percent
        commission on anyone who wants Sarudar goods.
      </p>
    ),
  },
  {
    name: "The Tomb of Time",
    region: "Sarudar",
    label: "Zelkaris observatory",
    x: 85, y: 83, scale: 2.6,
    body: (
      <p>
        A sandstone pyramid on the northern edge of the Golden Dunes — in truth a pre-Impact
        Zelkaris observatory. Its inner walls carry Wenlyrian inscriptions that only Lord
        Vaelen Tharalyn, and perhaps a dozen others alive, can read.
      </p>
    ),
  },
  {
    name: "The Endless Pit",
    region: "Sarudar",
    label: "the shaft to nowhere",
    x: 96, y: 64, scale: 2.6,
    body: (
      <p>
        A vertical chasm east of Gadh'aran. Drops past every length of rope ever lowered into
        it. Said to whisper. In truth, a Zelkaris ventilation shaft into a network buried
        beneath the sea floor.
      </p>
    ),
  },
  {
    name: "The Petrified Forest",
    region: "Sarudar",
    label: "trees of stone",
    x: 94, y: 77, scale: 2.4,
    body: (
      <p>
        A forest turned to stone in a single moment around 200 BI, when the Aetheric Anchor
        first fired. The <strong>Pethryn</strong> walked out of it. They have been walking,
        slowly, ever since.
      </p>
    ),
  },

  /* ── Cinder Island ───────────────────────────────── */
  {
    name: "Cinder Island",
    region: "Cinder Island",
    label: "the volcanic south",
    x: 35, y: 67, scale: 1.7,
    body: (
      <p>
        The bright civilization of the Zelkaris was here, once. Now ash. The Obsidian Throne
        broods within a ring of black peaks — the <strong>Onyx Spires</strong>. Only the
        Black Bastion remains inhabited.
      </p>
    ),
  },
  {
    name: "The Obsidian Throne",
    region: "Cinder Island",
    label: "the active volcano",
    x: 34, y: 60, scale: 2.8,
    body: (
      <p>
        Active volcano rising ~2,100 meters at the center of Cinder Island. The meteor struck
        here in Year 0. Below it, the cracked <strong>Aetheric Anchor</strong> continues to
        leak.
      </p>
    ),
  },
  {
    name: "The Black Bastion",
    region: "Cinder Island",
    label: "fortress of the last Zelkaris",
    x: 39, y: 72, scale: 2.8,
    body: (
      <p>
        Enormous fortress raised from Onyx stone by the surviving Tharalyn family. Garrisoned
        by ~2,000 soldiers seconded from Verdure and Twiland, and home of{" "}
        <strong>Lord Vaelen Tharalyn</strong> — one of perhaps a dozen people alive who can
        read Wenlyrian.
      </p>
    ),
  },

  /* ── Serene Sea ──────────────────────────────────── */
  {
    name: "The Gyre of the Deep",
    region: "Serene Sea",
    label: "the widening whirlpool",
    x: 70, y: 39, scale: 2.4,
    body: (
      <p>
        A vast slow whirlpool in the east-central Serene Sea, growing measurably stronger each
        century. Beneath it lies the <strong>Sunken Citadel</strong> — revered as Thalassor's
        temple by the Path of the Deep, but in truth the seaward distribution hub of the
        cracked Anchor.
      </p>
    ),
  },
];

function Place({ place, index, isActive, onActivate }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    /* the "active zone" is a thin band 28%–58% from the top of the
       viewport — when a card's top crosses into that band, it becomes
       the current focus. This matches where you'd actually be reading. */
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) onActivate(index, { fromScroll: true });
        });
      },
      { rootMargin: "-28% 0px -42% 0px", threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [index, onActivate]);

  const handleClick = () => {
    onActivate(index, { fromScroll: false });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <article
      ref={ref}
      className={`${styles.place} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${place.name} — ${place.region}`}
    >
      <div className={styles.placeRegion}>{place.region}</div>
      <h2 className={styles.placeName}>{place.name}</h2>
      {place.label && <div className={styles.placeLabel}>{place.label}</div>}
      <div className={styles.placeBody}>{place.body}</div>
    </article>
  );
}

export default function Geography() {
  const [activeIndex, setActiveIndex] = useState(0);
  const focus = PLACES[activeIndex] ?? PLACES[0];

  return (
    <div className={styles.mapPage}>
      {/* sticky map stage on the left.
          The .canvas wrapper has the map's exact 4:3 aspect ratio so
          x/y % from the atlas CSV align 1:1 with where they should
          land on the rendered map. */}
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.canvas}>
          <div
            className={styles.mapImage}
            style={{
              backgroundImage: `url(${MAP})`,
              transform: `scale(${focus.scale})`,
              transformOrigin: `${focus.x}% ${focus.y}%`,
            }}
          />
          <div
            className={styles.pin}
            style={{ left: `${focus.x}%`, top: `${focus.y}%` }}
          >
            <span className={styles.pinDot} />
            <span className={styles.pinRing} />
          </div>
        </div>
        <div className={styles.stageOverlay} />
      </div>

      {/* scrolling places on the right */}
      <div className={styles.scrollArea}>
        <header className={styles.head}>
          <div className={styles.eyebrow}>Chapter II</div>
          <h1 className={styles.title}>The Geography</h1>
          <p className={styles.lede}>
            A continent of four faces, drawn together — and slowly torn apart — by a single
            inland sea.
          </p>
          <div className={styles.hint}>
            Scroll or click a place — the map will travel with you.
          </div>
        </header>

        <div className={styles.places}>
          {PLACES.map((place, i) => (
            <Place
              key={place.name}
              place={place}
              index={i}
              isActive={i === activeIndex}
              onActivate={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
