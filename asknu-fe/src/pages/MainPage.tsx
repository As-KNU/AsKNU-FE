import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/KNUlogo.svg";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="h-full bg-white flex flex-col">
      {/* 헤더 */}
      <div className="px-6 pt-[120px] pb-3 text-center relative">
        <div className="w-16 h-16 mx-auto rounded-full bg-white grid place-items-center overflow-hidden">
          <img src={logo} alt="logo" className="w-16 h-16 object-contain" />
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-black1">
          AsKNU에 문의하기
        </h1>
        <Link
          to="/employees"
          className="absolute top-6 right-4 text-gray3 text-sm hover:text-black1 transition"
        >
          실시간 담당자 현황 바로가기 &gt;
        </Link>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-6">
        {/* 봇 메시지 */}
        <div className="flex gap-2.5 items-center justify-center">
  <div className="bg-gray-100 text-black1 rounded-2xl px-4 py-3 w-[90%] text-center">
    <p className="text-xl font-semibold mb-3">AsKNU</p>
    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
      안녕하세요 챗봇 AsKNU입니다😊
      {"\n"}과사에 문의하고 싶은 내용을 
      {"\n"}시간 제약 없이 AsKNU를 통해 해결해보세요!
      {"\n"}KNU 이메일 인증 후 이용해주세요.
    </p>
  </div>
</div>


        {/* 문의하기 버튼 */}
        <div className="mt-[140px]">
          <button
            onClick={() => navigate("/email-auth")}
            className="block w-full bg-main3 hover:bg-point text-white font-semibold text-lg py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
          >
            <span>이메일 인증 후 문의하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

