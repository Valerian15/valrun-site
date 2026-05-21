import { Page, Section, NamedList, Flourish } from "../components/Page.jsx";

const VOCAB = [
  { name: "lora",  desc: "to go" },
  { name: "thaal", desc: "tree" },
  { name: "doma",  desc: "house" },
  { name: "loka",  desc: "big" },
  { name: "kei",   desc: "who" },
  { name: "wae",   desc: "what" },
  { name: "dai",   desc: "where" },
  { name: "yla",   desc: "why" },
  { name: "ven",   desc: "when" },
  { name: "hau",   desc: "how" },
  { name: "lian",  desc: "we (plural). There is no singular first-person pronoun." },
];

export default function Language() {
  return (
    <Page
      eyebrow="Chapter VII"
      title="Language"
      lede="A language no one quite remembers stands between the present world and its lost past."
    >
      <Section eyebrow="i." title="Wenlyrian, the Lost Imperial Tongue">
        <p>
          The richest linguistic source in Val'Run is <strong>Wenlyrian</strong>, the
          ancestral tongue of the Zelkaris and the dominant academic language of the Old
          Empire. It is now spoken fluently only by descendants of the imperial bloodline,
          elite mages, and historians of the pre-Impact era; <strong>Lord Vaelen Tharalyn</strong>{" "}
          of the Black Bastion is one of perhaps a dozen living true readers.
        </p>
        <p>
          Ancient Wenlyrian was written in <strong>Zheran</strong>, an ornate calligraphic
          script of looping vertical glyphs; modern transliteration uses a Latin-based script.
          Vowels are pronounced as in continental European languages (<em>a</em> as in{" "}
          <em>father</em>, <em>e</em> as in <em>bed</em>, <em>i</em> as in <em>machine</em>);{" "}
          <em>th</em> is always soft, <em>r</em> is lightly rolled, and <em>x</em> is
          pronounced <em>ksh</em>. Stress falls on the second syllable unless otherwise
          marked.
        </p>
      </Section>

      <Section eyebrow="ii." title="Grammar of a Collective">
        <p>
          Wenlyrian grammar is built around a culture that subordinated the individual to the
          collective. Statements run <strong>Object-Subject-Verb</strong>; questions run{" "}
          <strong>Object-Verb-Subject</strong>; imperatives are{" "}
          <strong>Subject-Verb-Object</strong>.
        </p>
        <p>
          First-person singular pronouns do not exist — where a Common speaker would say{" "}
          <em>I</em>, Wenlyrian uses no pronoun at all. The plural <em>lian</em> ("we")
          survives; the singular is simply absence. Nouns take case endings (nominative bare,
          accusative <em>-a</em>, genitive <em>-ir</em>) and a plural in <em>-en</em> or{" "}
          <em>-nen</em>. Verbs use prefixes for tense (<em>pa-</em> past, <em>fu-</em>{" "}
          future), and modal verbs displace the main verb to the start of the sentence.
          Adjectives precede the noun, take the noun's plural ending, and form comparatives
          with <em>ra-</em> and superlatives with <em>sa-</em>. Negation is the prefix{" "}
          <em>na-</em>.
        </p>
      </Section>

      <Section eyebrow="iii." title="A Seed Vocabulary">
        <NamedList items={VOCAB} />
      </Section>

      <Flourish />

      <Section eyebrow="iv." title="Where Wenlyrian Still Speaks">
        <p>
          In modern Val'Run, hearing Wenlyrian aloud is "a sign that something important is
          about to happen." It survives in royal ceremonies, mage orders, weapon inscriptions,
          sealed imperial documents, and on the walls of every Zelkaris ruin from the{" "}
          <strong>Tomb of Time</strong> to the black-stone door beneath Everpeak's{" "}
          <strong>Deep Hollows</strong>. It is the chief obstacle between present-day Val'Run
          and the truth about what happened to the world.
        </p>
      </Section>

      <Section eyebrow="v." title="The Other Tongues">
        <p>
          The other tongues of the continent are sketched rather than codified. Spellcraft in
          Twiland uses melodic, poetic ancient Elvish, sung as much as spoken; fauns and
          centaurs turn whole spells into songs. Verdure's enchanted tools answer to specific
          spoken commands. Sarudar's shamans braid guttural chants into stomping, clapping,
          and dancing — magic narrated as storytelling.
        </p>
        <p>
          The dwarves write in clan runes that are engineering mimicry rather than true
          script. The Sketh do not write at all: they imprint memory directly into stone. The
          Velorath sing, harmonically, to the stone. And the Shadow Pact chants in the{" "}
          <strong>Void Tongue</strong>, which they claim was spoken before language existed.
        </p>
      </Section>
    </Page>
  );
}
