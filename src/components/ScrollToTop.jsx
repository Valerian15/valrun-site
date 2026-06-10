import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Reset scroll on every route change — the SPA otherwise carries
 * the previous page's scroll position into the next one. */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
