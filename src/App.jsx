import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Lore from "./pages/Lore.jsx";
import Geography from "./pages/Geography.jsx";
import Geography1 from "./pages/Geography1.jsx";
import Geography2 from "./pages/Geography2.jsx";
import Geography3 from "./pages/Geography3.jsx";
import History from "./pages/History.jsx";
import Peoples from "./pages/Peoples.jsx";
import Faith from "./pages/Faith.jsx";
import Factions from "./pages/Factions.jsx";
import MapPage from "./pages/Map.jsx";
import Gallery from "./pages/Gallery.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/lore" element={<Lore />} />
        <Route path="/geography" element={<Geography />} />
        <Route path="/geography/1" element={<Geography1 />} />
        <Route path="/geography/2" element={<Geography2 />} />
        <Route path="/geography/3" element={<Geography3 />} />
        <Route path="/history" element={<History />} />
        <Route path="/peoples" element={<Peoples />} />
        <Route path="/faith" element={<Faith />} />
        <Route path="/factions" element={<Factions />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
