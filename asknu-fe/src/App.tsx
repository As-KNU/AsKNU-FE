import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EmailAuthPage from "./pages/EmailAuthPage";
import ChatPage from "./pages/ChatPage";
import EmployeePage from "./pages/EmployeePage";
import "./index.css";

export default function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="mobile-frame">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/email-auth" element={<EmailAuthPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/employees" element={<EmployeePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
