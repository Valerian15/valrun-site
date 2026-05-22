import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Lore from "./pages/Lore.jsx";
import Geography from "./pages/Geography.jsx";
import History from "./pages/History.jsx";
import History1 from "./pages/History1.jsx";
import History2 from "./pages/History2.jsx";
import History3 from "./pages/History3.jsx";
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
        <Route path="/history" element={<History />} />
        <Route path="/history/1" element={<History1 />} />
        <Route path="/history/2" element={<History2 />} />
        <Route path="/history/3" element={<History3 />} />
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
