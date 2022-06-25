import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<App />}/>
          <Route exact index element={<Home />} />
          <Route exact path="/about" element={<About />}/>
        </Routes>
      </BrowserRouter>
      <h1>This is sjNotes App</h1>
    </>
  );
}

export default App;
