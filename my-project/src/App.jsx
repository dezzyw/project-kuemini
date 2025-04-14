import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./components/Profile";
import BacaBlog from "./components/BacaBlog"; // import halaman baca blog

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog/:id" element={<BacaBlog />} /> {/* ini ditambah */}
      </Routes>
    </Router>
  );
}

export default App;
