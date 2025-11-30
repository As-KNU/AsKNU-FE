import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 화면 높이 계산해서 CSS 변수에 넣기
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// 최초 실행
setVh();

// 화면 회전 / 주소창 변화 대응
window.addEventListener("resize", setVh);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
