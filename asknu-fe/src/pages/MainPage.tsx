import { useMemo, useRef, useState, useEffect } from "react";
import logo from "../assets/KNUlogo.svg";

type Role = "bot" | "user";
type Msg = { id: string; role: Role; text: string };

const quickReplies = [
  "졸업 관련 문의",
  "전공/트랙 관련 문의",
  "다중전공 관련 문의",
  "해외·글로벌역량 관련 문의",
];

export default function MainPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m1",
      role: "bot",
      text: "안녕하세요 AsKNU입니다 😃\n\n문의사항은 아래 버튼을 선택해주시면 안내 도와드리겠습니다.",
    },
  ]);
  const [input, setInput] = useState("");
  const botTimerRef = useRef<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 최초 진입 시 바로 하단으로 이동 (부드러운 스크롤 X)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const timeText = useMemo(() => {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, "0");
    const ap = h < 12 ? "오전" : "오후";
    const hr = ((h + 11) % 12) + 1;
    return `${ap} ${hr}:${m}`;
  }, []);

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

  const send = (text: string) => {
    if (!text.trim()) return;

    const newMsg: Msg = { id: crypto.randomUUID(), role: "user", text };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // bot 응답은 현재 messages 상태를 읽어 오지 않고, user 메시지 뒤에 append
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: `“${text}” 문의 접수되었습니다. 잠시만 기다려주세요.`,
        },
      ]);
    }, 400);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* 헤더 */}
      <div className="px-6 pt-8 pb-3 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-white grid place-items-center overflow-hidden">
          <img src={logo} alt="logo" className="w-16 h-16 object-contain" />
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-black1">
          AsKNU에 문의하기
        </h1>
      </div>

      {/* 시간 */}
      <div className="text-center text-gray3 text-sm">{timeText}</div>

      {/* 메시지 영역: 이곳만 스크롤 */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 pt-3 pb-4">
        {messages.map((m) =>
          m.role === "bot" ? (
            <div key={m.id} className="flex gap-2.5 items-start mt-3">
              <img
                src={logo}
                alt="bot"
                className="w-10 h-10 rounded-full border border-gray-200 object-cover"
              />
              <div className="max-w-[78%] bg-gray-100 text-black1 rounded-2xl rounded-tl-md px-4 py-3 whitespace-pre-wrap">
                <p className="text-[15px] leading-relaxed">{m.text}</p>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end mt-3">
              <div className="max-w-[78%] bg-point text-white rounded-2xl rounded-tr-md px-4 py-3">
                <p className="text-[15px] leading-relaxed">{m.text}</p>
              </div>
            </div>
          )
        )}

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
          className="px-3 sm:px-4 py-3"
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
