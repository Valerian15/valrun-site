import { Link } from "react-router-dom";
import { Page } from "../components/Page.jsx";
import useDocumentMeta from "../hooks/useDocumentMeta.js";

export default function NotFound() {
  useDocumentMeta("Lost in the margins");
  return (
    <Page
      eyebrow="Errata"
      title="Lost in the margins"
      lede="No page bears that name in this folio."
    >
      <p>
        Return to the <Link to="/">frontispiece</Link>, or pick a chapter from the spine above.
      </p>
    </Page>
  );
}
