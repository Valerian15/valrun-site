import TarotCard from "../components/TarotCard.jsx";
import styles from "./Factions.module.css";

const HERO = "/hero/04-continent.jpg";

const POWERS = [
  { name: "Council of Five",      desc: "Everpeak's ruling body — Emberheart (alchemy), Ironmar (engineering), Starforge (invention), Solvayne (trade), and Aelric Caladris IV, last open carrier of the imperial bloodline." },
  { name: "Kingdom of Rhystara",  desc: "Centralised monarchy of Bastion's Reach. Navy-obsessed under King Aldric Voss III." },
  { name: "Kingdom of Eryndor",   desc: "Forest-and-artisan monarchy of Timbercross under Queen Isolde Taren. Bitter rivalry with Rhystara — not war, but constant obstruction." },
  { name: "Durumbar",             desc: "Traditionalist dwarven kingdom carved into the Frostcrown Ridges. Mountain King Brokk Stonemantle, age 189." },
  { name: "Grimgar",              desc: "Modernizing dwarven trade-kingdom. Stone King Thrain Goldenvein, age 112." },
  { name: "Council of Concord",   desc: "Annual gathering of Twiland's Elven Lords beneath the World Tree, chaired from Luneberg by Lord Caelindor Aethyn." },
  { name: "Brabrar Confederacy",  desc: "Sarudar's pragmatic trade pact between Brabrar, Lazgudh, and Gadh'aran. 20% commission on anyone who wants Sarudar goods." },
  { name: "Black Bastion",        desc: "Cinder Island's seat. Lord Vaelen Tharalyn, last of the Zelkaris noble line and one of perhaps a dozen people alive who can read Wenlyrian." },
];

const GUILDS = [
  { name: "Gilded Consortium",          desc: "Val'Run's dominant trade network. 15% commission for routes, insurance, legal protection, intelligence. Verana Solvayne's control from her Council seat is the worst-kept secret in Val'Run." },
  { name: "Verduran Artificer's Guild", desc: "Everpeak's professional body of engineers, inventors, and alchemists. Membership requires the Trial of Making." },
  { name: "Ironspire League",           desc: "Eryndor steel-makers, quietly stockpiling beyond peacetime demand under Forge-Marshal Torven Greave." },
];

const UNDERWORLD = [
  { name: "Black Serpents",  desc: "Val'Run's largest smuggling network — mana crystals, Sarudar spice, artifact theft, protection — under an anonymous leader called the Fang. A splinter under Nightlace deals with the Shadow Pact." },
  { name: "Silent Daggers",  desc: "Fewer than thirty in number, accept only political contracts, bound by a ritual oath that prevents them from ever speaking of the order to outsiders." },
  { name: "Bastion Thieves", desc: "Descended from Zelkaris survivors. Hunt relics from the Black Bastion." },
  { name: "Crimson Tide",    desc: "Pirate kingdom of twelve ships and eight hundred crew under Captain Dargan Kelvar, based at a hidden island." },
  { name: "Pallid Sails",    desc: "Captain Yrsa the Quiet's small magical-goods raiding fleet. Despise Dargan." },
  { name: "Bonepickers",     desc: "Gyre-edge wreck-divers under the orc Grul Deeplung, who claims the whirlpool whispers to him." },
];

const ARMS = [
  { name: "Crimson Wardens",  desc: "Val'Run's legendary mercenary corps — Bloodsworn Blades, Emberstrike Archers, Sable Hounds, Shadebound Operatives, Crimson Guard — under the exiled Rhystaran general Kael Varados." },
  { name: "Iron Blades",      desc: "Everpeak's professional garrison and police under High Commander Loris Kaine." },
  { name: "Everpeak's Vanguard", desc: "Elite mana-powered military unit. Phoenix-and-gear sigil." },
  { name: "Twilight Wardens", desc: "Twiland's magical defenders of sacred groves." },
  { name: "Sandriders",       desc: "Sarudar cavalry on mana-infused desert beasts." },
];

const ORDERS = [
  { name: "Order of the Maker",         desc: "Verdure's largest priesthood — Eonar, Terron, Reyron. Charcoal-gray robes with iron hammer clasps." },
  { name: "Order of the Veil",          desc: "Verdure's scholar-priests of Lumina and Luna. Sealed archives, witness protection." },
  { name: "Order of the Green",         desc: "Verdure's healers and rural counselors. In famine, more politically powerful than any council." },
  { name: "Rootspeakers",               desc: "Twiland's senior religious leaders, judges, and sages." },
  { name: "Tidecallers",                desc: "Sea-priests of Maris and Thalassor in every major port." },
  { name: "Ash Priests",                desc: "Cinder Island's interpreters of fire and Ashborn suffering. Also called Ember Keepers." },
  { name: "Inquisitors of the Dawn",    desc: "Anti-Shadow heresy court, based in Verdure and Rhystara." },
  { name: "Collegium of the Fracture",  desc: "Scholarly institution at Riftward studying the Rupture, under Magister Elia Dorne." },
];

function CardSection({ title, items }) {
  return (
    <section className={styles.cardSection}>
      <header className={styles.sectionHead}>
        <div className={styles.sectionOrnament} aria-hidden="true">✦</div>
        <h2 className={styles.sectionName}>{title}</h2>
        <div className={styles.sectionRule} aria-hidden="true" />
      </header>
      <div className={styles.spread}>
        {items.map((it) => (
          <TarotCard key={it.name} name={it.name} description={it.desc} />
        ))}
      </div>
    </section>
  );
}

export default function Factions() {
  return (
    <div className={styles.tarotWrap}>
      <div className={styles.bg} style={{ backgroundImage: `url(${HERO})` }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <header className={styles.head}>
        <div className={styles.eyebrow}>Chapter VI</div>
        <h1 className={styles.title}>The Factions</h1>
        <p className={styles.lede}>
          Twelve hundred years after the Empire fell, Val'Run is governed not by a throne but
          by a web. Turn any card to read its tale.
        </p>
      </header>

      <CardSection title="Sovereign Powers" items={POWERS} />
      <CardSection title="Guilds & Commerce" items={GUILDS} />
      <CardSection title="The Underworld"    items={UNDERWORLD} />
      <CardSection title="Arms"              items={ARMS} />
      <CardSection title="Orders & Schools"  items={ORDERS} />
    </div>
  );
}
