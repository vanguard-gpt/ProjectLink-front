import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import Home from "./page/Home";

function App() {
  return (
   <>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
   </Routes>
   </>
  );
}

export default App;
