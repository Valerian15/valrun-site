/* Canonical chapter order, numbering, titles, and hero art for the compendium.
 * Chapter I is the frontispiece (Home). Single source of truth for the Layout
 * nav, Home's panels and coda, ChapterHero eyebrows, and ChapterEnd bands. */
export const CHAPTERS = [
  { slug: "/geography", numeral: "II",  label: "Geography", title: "The Geography", hero: "/map.jpg" },
  { slug: "/history",   numeral: "III", label: "History",   title: "The History",   hero: "/hero/02-the-breaking.jpg" },
  { slug: "/peoples",   numeral: "IV",  label: "Peoples",   title: "The Peoples",   hero: "/hero/05-peoples.jpg" },
  { slug: "/faith",     numeral: "V",   label: "Faith",     title: "The Faith",     hero: "/hero/03-aetherflow.jpg" },
  { slug: "/factions",  numeral: "VI",  label: "Factions",  title: "The Factions",  hero: "/hero/04-continent.jpg" },
];

export const chapterFor = (slug) => CHAPTERS.find((c) => c.slug === slug);
