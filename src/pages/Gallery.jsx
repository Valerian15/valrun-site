import { Page, Placeholder } from "../components/Page.jsx";

export default function Gallery() {
  return (
    <Page
      eyebrow="Plates"
      title="Gallery"
      lede="Plates, sketches, and what the cartographers brought back."
    >
      <Placeholder note="No plates have yet been bound into this folio." />
    </Page>
  );
}
