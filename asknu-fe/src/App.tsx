// 1) 화면 높이 계산해서 CSS 변수에 넣기
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// 2) 최초 실행
setVh();

// 3) 화면 회전 / 주소창 변화 대응
window.addEventListener("resize", setVh);
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EmailAuthPage from "./pages/EmailAuthPage";
import ChatPage from "./pages/ChatPage";
import EmployeePage from "./pages/EmployeePage";
import "./index.css";

export default function App() {
  return (
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
  );
}
