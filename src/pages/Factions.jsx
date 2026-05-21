import { Page, Section, NamedList, Flourish } from "../components/Page.jsx";

const POWERS = [
  { name: "Council of Five",            desc: "Everpeak's ruling body — Emberheart (alchemy), Ironmar (engineering), Starforge (invention), Solvayne (trade), and Aelric Caladris IV (visionary leadership; last open carrier of the imperial bloodline)." },
  { name: "Kingdom of Rhystara",        desc: "Centralised monarchy of Bastion's Reach. Navy-obsessed under King Aldric Voss III." },
  { name: "Kingdom of Eryndor",         desc: "Forest-and-artisan monarchy of Timbercross under Queen Isolde Taren. Bitter personal rivalry with Rhystara — not war, but constant obstruction." },
  { name: "Durumbar",                   desc: "Traditionalist dwarven kingdom carved into the Frostcrown Ridges. Mountain King Brokk Stonemantle, 189." },
  { name: "Grimgar",                    desc: "Modernizing dwarven trade-kingdom. Stone King Thrain Goldenvein, 112." },
  { name: "Council of Concord",         desc: "Annual gathering of Twiland's Elven Lords beneath the World Tree, chaired from Luneberg by Lord Caelindor Aethyn." },
  { name: "Brabrar Confederacy",        desc: "Sarudar's pragmatic trade pact between Brabrar, Lazgudh, and Gadh'aran. 20% on anyone who wants Sarudar goods." },
  { name: "Black Bastion",              desc: "Cinder Island's seat. Lord Vaelen Tharalyn, last of the Zelkaris noble line and one of perhaps a dozen people alive who can read Wenlyrian." },
];

const GUILDS = [
  { name: "Gilded Consortium",          desc: "Val'Run's dominant trade network. 15% commission for routes, insurance, legal protection, intelligence. Verana Solvayne's continued control from her Council seat is the worst-kept secret in Val'Run." },
  { name: "Verduran Artificer's Guild", desc: "Everpeak's professional body of engineers, inventors, and alchemists. Membership requires the Trial of Making." },
  { name: "Ironspire League",           desc: "Eryndor steel-makers, quietly stockpiling beyond peacetime demand under Forge-Marshal Torven Greave." },
];

const UNDERWORLD = [
  { name: "The Black Serpents",  desc: "Val'Run's largest smuggling network — mana crystals, Sarudar spice, artifact theft, protection — under an anonymous leader called the Fang. A splinter under Nightlace has begun breaking the long-standing rule against dealing with the Shadow Pact." },
  { name: "The Silent Daggers",  desc: "Fewer than thirty in number, accept only political contracts, bound by a ritual oath that prevents them from ever speaking of the order to outsiders." },
  { name: "The Bastion Thieves", desc: "Descended from Zelkaris survivors. Hunt relics from the Black Bastion." },
  { name: "The Crimson Tide",    desc: "Pirate kingdom of twelve ships and eight hundred crew under Captain Dargan Kelvar, based at the hidden island of Driftwood Haven." },
  { name: "The Pallid Sails",    desc: "Captain Yrsa the Quiet's small magical-goods raiding fleet. Despise Dargan." },
  { name: "The Bonepickers",     desc: "Gyre-edge wreck-divers under the orc Grul Deeplung, who claims the whirlpool whispers to him." },
];

const ARMS = [
  { name: "The Crimson Wardens",  desc: "Val'Run's legendary mercenary corps — Bloodsworn Blades, Emberstrike Archers, Sable Hounds, Shadebound Operatives, Crimson Guard — under the exiled Rhystaran general Kael Varados." },
  { name: "The Iron Blades",      desc: "Everpeak's professional garrison and police under High Commander Loris Kaine." },
  { name: "Everpeak's Vanguard",  desc: "Elite mana-powered military unit. Phoenix-and-gear sigil." },
  { name: "The Twilight Wardens", desc: "Twiland's magical defenders of sacred groves." },
  { name: "The Sandriders",       desc: "Sarudar cavalry on mana-infused desert beasts." },
];

const ORDERS = [
  { name: "Order of the Maker",                desc: "Verdure's largest priesthood — Eonar, Terron, Reyron. Charcoal-gray robes with iron hammer clasps." },
  { name: "Order of the Veil",                 desc: "Verdure's scholar-priests of Lumina and Luna. Sealed archives, witness protection." },
  { name: "Order of the Green",                desc: "Verdure's healers and rural counselors. In famine, more politically powerful than any council." },
  { name: "Rootspeakers",                      desc: "Twiland's senior religious leaders, judges, and sages." },
  { name: "Tidecallers",                       desc: "Sea-priests of Maris and Thalassor in every major port." },
  { name: "Ash Priests / Ember Keepers",       desc: "Cinder Island's interpreters of fire and Ashborn suffering." },
  { name: "Inquisitors of the Unbroken Dawn",  desc: "Anti-Shadow heresy court, based in Verdure and Rhystara." },
  { name: "Collegium of the Fracture",         desc: "Scholarly institution at Riftward studying the Rupture, under Magister Elia Dorne." },
];

export default function Factions() {
  return (
    <Page
      eyebrow="Chapter VI"
      title="Factions"
      lede="Twelve hundred years after the Empire fell, Val'Run is governed not by a throne but by a web."
    >
      <p>
        No single power rules Val'Run. Beneath the rulers lies a layer of guilds, orders, and
        underworlds whose reach is at least as long. What follows is a map of who answers to
        whom — and whose silence is louder.
      </p>

      <Section eyebrow="i." title="Sovereign Powers">
        <NamedList items={POWERS} />
      </Section>

      <Section eyebrow="ii." title="Guilds and Commerce">
        <NamedList items={GUILDS} />
      </Section>

      <Flourish />

      <Section eyebrow="iii." title="The Underworld">
        <NamedList items={UNDERWORLD} />
      </Section>

      <Section eyebrow="iv." title="Arms">
        <NamedList items={ARMS} />
      </Section>

      <Section eyebrow="v." title="Orders and Schools">
        <NamedList items={ORDERS} />
      </Section>
    </Page>
  );
}
