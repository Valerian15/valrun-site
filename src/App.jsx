import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Geography from "./pages/Geography.jsx";
import History from "./pages/History.jsx";
import Peoples from "./pages/Peoples.jsx";
import Faith from "./pages/Faith.jsx";
import Factions from "./pages/Factions.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/geography" element={<Geography />} />
        <Route path="/history" element={<History />} />
        <Route path="/peoples" element={<Peoples />} />
        <Route path="/faith" element={<Faith />} />
        <Route path="/factions" element={<Factions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
