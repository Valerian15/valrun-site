import { Page, Section, NamedList, Flourish } from "../components/Page.jsx";

const NINE = [
  { name: "Lumina, the Shimmering Veil",   desc: "Stars, light, discovery. Celebrated first at every Festival of Creation." },
  { name: "Terron, the Stoneheart",         desc: "Earth, strength, endurance. Patron of dwarves." },
  { name: "Reyron, the Flame Warden",       desc: "Fire, the forge, the work of hands. Patron of blacksmiths." },
  { name: "Maris, the Tide Whisperer",      desc: "Rivers, rain, safe passage at sea." },
  { name: "Aerel, the Sky Dancer",          desc: "Wind, weather, change. The one who laughed at being born." },
  { name: "Cavale, the Forest Sentinel",    desc: "Woods, beasts, the wild green. Symbol: the Shimmer Stag." },
  { name: "Vitalis, the Life Stream",       desc: "Healing, growth, the mending of broken things." },
  { name: "Mystria, the Arcane Conduit",    desc: "Magic, voice of the Aetherflow. Most important of the Nine in Twiland." },
  { name: "Luna, the Shadow Veil",          desc: "Secrets, night, the unknown. Celebrated last." },
];

const TEMPLES = [
  { name: "The Cathedral of the Architect",  desc: "Everpeak. Granite, iron, and a central mechanical orrery powered by a mana crystal." },
  { name: "The Hall of the First Stone",     desc: "Durumbar. Carved from a single boulder, displaying the oldest known Corestone." },
  { name: "The Sanctum of Roots",            desc: "Twiland. A natural cathedral formed by the World Tree's own roots, lit by bioluminescent moss. No chairs." },
  { name: "The Tide Chapels",                desc: "Every major port. Tidecallers of Maris keep them; Path of the Deep have begun keeping their own." },
  { name: "The Sand Circles",                desc: "Sarudar. Impermanent. Erased after the rite ends — nothing sacred persists." },
  { name: "The Stone of Speaking",           desc: "Gadh'aran. The desert's one concession to permanence." },
];

export default function Faith() {
  return (
    <Page
      variant="folio"
      eyebrow="The Fifth Folio · Of the Faith"
      title="Of Eonar &amp; the Nine"
      lede="Three faiths, one scripture, and a silence at the heart of all three."
    >
      <Section eyebrow="i." title="Eonarism and the Nine">
        <p>
          The dominant religion of Val'Run is <strong>Eonarism</strong>, the worship of Eonar
          through the Nine sub-deities drawn from the Architect's self at the dividing. To
          ignore any of the Nine is to deny a part of Eonar.
        </p>
        <NamedList items={NINE} />
        <p>
          Eonarism has no single pope. Each region's priesthood is semi-autonomous, united by
          scripture but divided by interpretation. Verdure's three great orders — the{" "}
          <strong>Order of the Maker</strong> (Eonar, Terron, Reyron), the{" "}
          <strong>Order of the Veil</strong> (Lumina and Luna — scholar-priests and
          archivists), and the <strong>Order of the Green</strong> (Cavale and Vitalis —
          healers and herbalists, beloved of the common folk) — sit uneasily between the{" "}
          <strong>Reformers</strong> of Bastion's Reach, who argue the faith must embrace
          mana-crystal technology and political engagement, and the{" "}
          <strong>Traditionalists</strong> of Durumbar, who consider that path dangerously
          close to heresy.
        </p>
        <p>
          Twiland's branch is mystical, emphasising Mystria and Lumina, and its{" "}
          <strong>Rootspeakers</strong> serve as priest, judge, and sage; its{" "}
          <strong>Canopy Singers</strong> lead daily prayer through song. Sarudar's branch is
          the weakest — older shamanic traditions were never fully displaced, and most desert
          worship is still ancestral, sand-drawn, and spirit-communing.
        </p>
      </Section>

      <Flourish />

      <Section eyebrow="ii." title="The Path of the Deep">
        <p>
          The <strong>Path of the Deep</strong> venerates <strong>Thalassor</strong>, the
          deity of the deep seas and hidden crevices, whom they hold to predate Eonar — woken
          from the Vael'thura when the Architect's tears became the seas. Theologically
          uncomfortable rather than openly heretical, it is led by{" "}
          <strong>High Tidecaller Maren Saltsong</strong> of Bastion's Reach, a former sailor
          who is convinced the Gyre is Thalassor's displeasure at something beneath the sea.
        </p>
      </Section>

      <Section eyebrow="iii." title="The Shadow Pact">
        <p>
          The <strong>Shadow Pact</strong> is outlawed everywhere. Its adherents believe
          Eonarism tells only half the story — that <strong>Nyxos</strong>, the unsevered
          echo of Luna, is the primordial darkness that predates Eonar and was nearly
          understood by the Zelkaris before the Impact.
        </p>
        <p>
          The Pact is organised in three- to seven-member cells — Whispers, Shades,
          Shadowmancers, and the five-member <strong>Umbra Council of Veilkeepers</strong>;
          promotion to Veilkeeper requires sacrificing something precious — not blood, but a
          cherished memory, a loved one's trust, one's own name. On the longest night of
          Deepcold they perform the <strong>Night of Whispering Shadows</strong> in absolute
          darkness, chanting in the Void Tongue.
        </p>
      </Section>

      <Flourish />

      <Section eyebrow="iv." title="Religion as Institution">
        <p>
          Religion in Val'Run is also institution. Temples own land, run granaries, hold
          relics, judge in temple courts, and shelter sanctuary cases. Tithes run 3–10% of
          harvest, fish, wool, or coin. The Order of the Green runs charity kitchens that, in
          famine, become more politically powerful than any council. The Order of the Veil
          keeps sealed archives and protects witnesses; the{" "}
          <strong>Inquisitors of the Unbroken Dawn</strong> hunt Shadow corruption and false
          relics, useful against cults and dangerous against dissidents. Coronations require
          oath-blessing before divine witnesses, and an unblessed war risks desertion and tax
          refusal.
        </p>
      </Section>

      <Section eyebrow="v." title="Major Temples">
        <NamedList items={TEMPLES} />
      </Section>

      <Section eyebrow="vi." title="Living Rites">
        <p>
          Living daily rites bind religion into life unavoidably: the daily{" "}
          <strong>Maker's Creed</strong> before any major work; the annual{" "}
          <strong>Rite of the Forge</strong> in Verdure's Forgebright Festival; the{" "}
          <strong>Blooming Ceremony</strong> in Twiland on the first day of Bloomtide, when
          the World Tree's foliage brightens and the Aetherflow synchronizes with
          participants' heartbeats; the <strong>Blood of the Sands</strong> of Sarudar's
          shamans; and the Shadow Pact's clandestine Night of Whispering Shadows.
        </p>
      </Section>
    </Page>
  );
}
