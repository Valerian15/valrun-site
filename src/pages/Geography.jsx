import { Page, Section, Flourish } from "../components/Page.jsx";

export default function Geography() {
  return (
    <Page
      eyebrow="Chapter II"
      title="Geography"
      lede="A continent of four faces, drawn together — and slowly torn apart — by a single sea."
    >
      <Section eyebrow="north" title="Verdure">
        <p>
          Val'Run is a single great continent divided into four regions and bound by the{" "}
          <strong>Serene Sea</strong>, an inland ocean whose name has grown ironic.{" "}
          <strong>Verdure</strong> is the temperate north: a tapestry of evergreen woodlands,
          alpine meadows, and clear streams crowned by the <strong>Frostcrown Ridges</strong>,
          whose Aurora Summit rises to 3,267 meters.
        </p>
        <p>
          It is the industrial heartland of the world — dwarves and humans share its forges,
          mines, and Kings' Road, and its city-state of <strong>Everpeak</strong> sits on the
          bones of the old imperial capital. Mountains here hide more than ore: beneath them,
          the <strong>Velorath</strong> — possibly the oldest sentient race on the continent
          — carve perfectly spherical resonance chambers whose harmonics can be felt in the
          bone.
        </p>
      </Section>

      <Section eyebrow="south-west" title="Twiland">
        <p>
          Twiland, the enchanted south-west, is divided by the <strong>Luminous River</strong>{" "}
          whose waters glow with bioluminescent algae. To its west lie the{" "}
          <strong>Velvet Plains</strong>, whose grasses shift between green and purple at
          dusk; to its east stands the <strong>World Tree Forest</strong>, centered on the
          World Tree itself — a colossal bioluminescent tree near Duskwatch Peak whose roughly
          two hundred genetically identical offshoots stabilize magic wherever they grow.
        </p>
        <p>
          Elves, fauns, centaurs, and unicorns share this region under a decentralized{" "}
          <strong>Council of Concord</strong>, and its hidden cities —{" "}
          <strong>Luneberg</strong>, <strong>Lylenore</strong>, <strong>Onhethas</strong> —
          are protected by wards that turn outsiders in circles for days.
        </p>
      </Section>

      <Section eyebrow="east" title="Sarudar">
        <p>
          Sarudar spans the desert east: golden dunes in the south, the{" "}
          <strong>Whispering Canyons</strong> along the eastern edge, and the{" "}
          <strong>Petrified Forest</strong> of stone trees on the border with Verdure. Water
          is the only true currency here. Humans, orcs, fauns, gnolls, and the reptilian{" "}
          <strong>Sketh</strong> divide the land between nomadic tribes and fortified towns
          like <strong>Gadh'aran</strong>, <strong>Brabrar</strong>, and{" "}
          <strong>Lazgudh</strong>.
        </p>
        <p>
          Mystical landmarks punctuate the sand: the <strong>Tomb of Time</strong> (a
          sandstone pyramid that is in truth a Zelkaris observatory), the{" "}
          <strong>Endless Pit</strong> (a ventilation shaft to a network buried beneath the
          sea floor), and <strong>Mirage's Haven</strong>, the only oasis in Sarudar that
          appears to wander between visits.
        </p>
      </Section>

      <Section eyebrow="south" title="Cinder Island">
        <p>
          Cinder Island lies in the volcanic south, where the <strong>Obsidian Throne</strong>{" "}
          — an active volcano rising some 2,100 meters — broods within a ring of black peaks
          called the <strong>Onyx Spires</strong>. Before the Impact in Year 0, this was the
          bright civilization of the Zelkaris. After, it is largely ash.
        </p>
        <p>
          Only the <strong>Black Bastion</strong>, an enormous fortress raised from Onyx stone
          by the surviving Tharalyn family, remains inhabited, garrisoned by some two thousand
          soldiers seconded from Verdure and Twiland and a small population of{" "}
          <strong>Ashborn</strong> — mortals slowly mutated by exposure to the broken Aetheric
          Anchor beneath their feet.
        </p>
      </Section>

      <Flourish />

      <Section eyebrow="the binding sea" title="The Serene Sea">
        <p>
          The Serene Sea itself binds the four. Along its lanes move grain, ore,
          glimmer-shards, salted spice, naval timber, and pilgrim, but its heart is the{" "}
          <strong>Gyre of the Deep</strong> — a vast whirlpool above the buried Zelkaris hub,
          growing measurably stronger from one century to the next. Beneath it lies the{" "}
          <strong>Sunken Citadel</strong>, revered as the temple of <strong>Thalassor</strong>{" "}
          by the Path of the Deep.
        </p>
        <p>
          The <strong>Thalvari</strong>, the amphibious people of the deep, have lost
          migration routes and settlements to it, and their council, the{" "}
          <strong>Deepcircle</strong>, is debating whether to break a thousand years of
          isolation and warn the surface.
        </p>
        <p>
          The standard measure on land is the <strong>league</strong> (about 5 km); the
          standard at sea is the day-sail (28 leagues in fair season, around 140 km). The
          Kings' Road, paved and milestoned with waystations called Hearthposts, is the safest
          overland route in Val'Run; off it, road quality collapses sharply. Twiland's forest
          paths are deliberately unmarked, navigable only by glowing waymarker stones
          activated in ancient Elvish. Sarudar measures travel in skins of water, not leagues.
        </p>
      </Section>
    </Page>
  );
}
