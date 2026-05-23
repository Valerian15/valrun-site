import { Page, Section } from "../components/Page.jsx";
import { HISTORY, HISTORY_INTRO } from "../data/history.jsx";

export default function History() {
  return (
    <Page
      variant="cinematic"
      bodyStyle="timeline"
      heroImage="/hero/02-the-breaking.jpg"
      eyebrow="Chapter III"
      title="The History"
      lede="All time in Val'Run is reckoned from a single moment of fire."
    >
      <p>{HISTORY_INTRO}</p>
      {HISTORY.map((age) => (
        <Section key={age.title} eyebrow={age.era} title={age.title}>
          {age.body}
        </Section>
      ))}
    </Page>
  );
}
