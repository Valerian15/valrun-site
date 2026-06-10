import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "Val'Run";
const ORIGIN = "https://valrun.org";

/* Sets the document title ("<title> — Val'Run") and keeps a canonical
 * <link> in sync with the current route. Pass no title for the home page. */
export default function useDocumentMeta(title) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — a worldbuilding compendium`;
  }, [title]);

  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = ORIGIN + (pathname === "/" ? "/" : pathname);
  }, [pathname]);
}
