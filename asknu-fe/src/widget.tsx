import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./components/ChatWidget";
import "./index.css";

// 위젯 모드: 플로팅 버튼 + 모달
const root = document.getElementById("asknu-widget-root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ChatWidget />
    </React.StrictMode>
  );
}

