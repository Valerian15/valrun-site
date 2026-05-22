import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Lore from "./pages/Lore.jsx";
import Geography from "./pages/Geography.jsx";
import History from "./pages/History.jsx";
import Peoples from "./pages/Peoples.jsx";
import Peoples1 from "./pages/Peoples1.jsx";
import Peoples2 from "./pages/Peoples2.jsx";
import Peoples3 from "./pages/Peoples3.jsx";
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
        <Route path="/peoples" element={<Peoples />} />
        <Route path="/peoples/1" element={<Peoples1 />} />
        <Route path="/peoples/2" element={<Peoples2 />} />
        <Route path="/peoples/3" element={<Peoples3 />} />
        <Route path="/faith" element={<Faith />} />
        <Route path="/factions" element={<Factions />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
