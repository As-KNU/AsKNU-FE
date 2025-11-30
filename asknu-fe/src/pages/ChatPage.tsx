import { useMemo, useRef, useState, useEffect } from "react";
import logo from "../assets/KNUlogo.svg";
import { generateUUID } from "../utils/uuid";

type Role = "bot" | "user" | "time";
type Msg = { id: string; role: Role; text: string };

// 시간 포맷팅 함수
const formatTime = (date: Date) => {
  const h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, "0");
  const ap = h < 12 ? "오전" : "오후";
  const hr = ((h + 11) % 12) + 1;
  return `${ap} ${hr}:${m}`;
};

// 분 스탬프 가져오기 (분 단위로만 비교)
const getMinuteStamp = (date: Date) => {
  return `${date.getHours()}:${date.getMinutes()}`;
};

const quickReplies = [
  "졸업 관련 문의",
  "전공/트랙 관련 문의",
  "다중전공 관련 문의",
  "해외·글로벌역량 관련 문의",
];

export default function ChatPage() {
  const now = new Date();
  const initialTimeStamp = formatTime(now);
  const initialMinuteStamp = getMinuteStamp(now);
  
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: generateUUID(),
      role: "time",
      text: initialTimeStamp,
    },
    {
      id: "m1",
      role: "bot",
      text: "안녕하세요 AsKNU입니다 😃\n\n문의사항은 아래 버튼을 선택해주시면 안내 도와드리겠습니다.",
    },
  ]);
  const [input, setInput] = useState("");
  const botTimerRef = useRef<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastTimeStampRef = useRef<string | null>(initialMinuteStamp);

  // 최초 진입 시 바로 하단으로 이동 (부드러운 스크롤 X)
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    }, 100);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const hasUserMessage = useMemo(
    () => messages.some((m) => m.role === "user"),
    [messages]
  );
  useEffect(() => {
    return () => {
      // 언마운트 시 타이머 정리 (중복 응답 방지)
      if (botTimerRef.current) window.clearTimeout(botTimerRef.current);
    };
  }, []);

  // 1분마다 타임스탬프 체크 및 추가
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentMinute = getMinuteStamp(now);
      
      // 분이 바뀌었으면 타임스탬프 추가
      if (lastTimeStampRef.current !== currentMinute) {
        setMessages((prev) => [
          ...prev,
          {
            id: generateUUID(),
            role: "time",
            text: formatTime(now),
          },
        ]);
        lastTimeStampRef.current = currentMinute;
      }
    }, 1000); // 1초마다 체크

    return () => clearInterval(interval);
  }, []);

  const send = async (text: string) => {
    if (!text.trim()) return;
  
    const now = new Date();
    const currentMinute = getMinuteStamp(now);
    const newMessages: Msg[] = [];

    // 분이 바뀌었으면 타임스탬프 추가
    if (lastTimeStampRef.current !== currentMinute) {
      newMessages.push({
        id: generateUUID(),
        role: "time",
        text: formatTime(now),
      });
      lastTimeStampRef.current = currentMinute;
    }

    // 1️⃣ 사용자 메시지 추가
    const userMsg: Msg = {
      id: generateUUID(),
      role: "user",
      text,
    };
    newMessages.push(userMsg);
    
    setMessages((prev) => [...prev, ...newMessages]);
    setInput("");
  
    // 2️⃣ 임시 bot "typing..." 메시지 추가 (로딩 표시)
    const tempId = generateUUID();
    setMessages((prev) => [
      ...prev,
      { id: tempId, role: "bot", text: "답변을 생성 중입니다..." },
    ]);
  
    try {
      // 3️⃣ FastAPI /chat 요청 (프록시 사용 → /api/chat)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      
  
      const data = await res.json();
  
      // 4️⃣ 기존 "typing..." 메시지 제거 후 실제 답변 삽입
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== tempId)
          .concat({
            id: generateUUID(),
            role: "bot",
            text: data.answer || "서버 응답 오류가 발생했습니다.",
          })
      );
    } catch (err) {
      // 5️⃣ 에러 시 bot 메시지 출력
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== tempId)
          .concat({
            id: generateUUID(),
            role: "bot",
            text: "서버와 통신 중 오류가 발생했습니다. \n다시 시도해주세요.",
          })
      );
    }
  };
  

  return (
    <div className="h-full bg-white flex flex-col">
      {/* 헤더 */}
      <div className="px-6 pt-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-white grid place-items-center overflow-hidden">
          <img src={logo} alt="logo" className="w-16 h-16 object-contain" />
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-black1">
          AsKNU에 문의하기
        </h1>
      </div>

      {/* 메시지 영역: 이곳만 스크롤 */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-4">
        {messages.map((m) => {
          if (m.role === "time") {
            return (
              <div key={m.id} className="flex justify-center my-4">
                <span className="text-gray3 text-xs px-3 py-1 rounded-full">
                  {m.text}
                </span>
              </div>
            );
          }
          
          return m.role === "bot" ? (
            <div key={m.id} className="flex gap-2.5 items-start mt-3">
              <img
                src={logo}
                alt="bot"
                className="w-10 h-10 rounded-full border border-gray-200 object-cover"
              />
              <div className="max-w-[78%] bg-gray-100 text-black1 rounded-2xl rounded-tl-md px-4 py-3 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                <p className="text-[15px] leading-relaxed">{m.text}</p>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end mt-3">
              <div className="max-w-[78%] bg-point text-white rounded-2xl rounded-tr-md px-4 py-3 break-words [overflow-wrap:anywhere]">
                <p className="text-[15px] leading-relaxed">{m.text}</p>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* 하단 고정 섹션: FAQ 카드 + 입력창 */}
      <div 
        className="sticky left-0 right-0 bg-white z-10"
        style={{ 
          bottom: '0px',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 10px)'
        }}
      >
        {/* FAQ 카드: 첫 사용자 채팅 이후 숨김 */}
        {!hasUserMessage && (
          <div className="px-3 sm:px-4 py-3">
            <div className="flex flex-wrap gap-3">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="px-4 py-2 rounded-2xl bg-white border border-gray-200 text-gray-500 text-[15px] hover:bg-gray-50 active:scale-[0.99] transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 입력창 */}
        <form
          className="px-3 sm:px-4 py-1"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              send(input);
            }
          }}
        >
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="AsKNU에게 질문해주세요."
              className="w-full h-12 rounded-2xl bg-white border-2 border-main2 focus:border-point outline-none px-4 pr-12 placeholder:text-gray3"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full grid place-items-center bg-point text-white hover:bg-[#4C6953] active:scale-95 transition z-20 pointer-events-auto"
              aria-label="send"
              onClick={(e) => {
                e.preventDefault();
                if (input.trim()) {
                  send(input);
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 12l15-7-3.8 7 3.8 7-15-7z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

