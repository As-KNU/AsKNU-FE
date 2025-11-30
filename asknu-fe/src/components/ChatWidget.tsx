import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import EmployeePage from "../pages/EmployeePage";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-point text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 z-[9999] flex items-center justify-center"
        aria-label="AsKNU 채팅 열기"
        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* 모달 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 채팅 모달 */}
      <div
        className={`fixed bottom-6 right-6 w-[390px] h-[600px] bg-white rounded-2xl shadow-2xl z-[9999] transition-all duration-300 overflow-hidden flex flex-col ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ 
          maxHeight: "calc(100vh - 120px)",
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/employee" element={<EmployeePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

