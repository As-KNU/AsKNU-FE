import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import FaqPage from "./pages/FaqPage";
import "./index.css";

export default function App() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-6">
      <div className="mobile-frame">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
