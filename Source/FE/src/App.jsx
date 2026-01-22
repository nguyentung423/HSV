import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoPlayer from "./pages/VideoPlayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/video/:systemId" element={<VideoPlayer />} />
    </Routes>
  );
}

export default App;
