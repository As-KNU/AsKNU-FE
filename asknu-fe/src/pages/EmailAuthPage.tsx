import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/KNUlogo.svg";

const majors = [
  "글로벌SW융합전공",
  "심화컴퓨팅전공",
  "플랫폼SW&데이터과학전공",
  "인공지능컴퓨팅전공",
  "첨단컴퓨팅전공",
];

export default function EmailAuthPage() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [studentIdError, setStudentIdError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateStudentId = (id: string) => {
    if (id.trim().length !== 10) {
      setStudentIdError("학번은 10자리여야 합니다.");
      return false;
    }
    setStudentIdError("");
    return true;
  };

  const validateEmail = (emailValue: string) => {
    if (!emailValue.trim().endsWith("@knu.ac.kr")) {
      setEmailError("이메일은 @knu.ac.kr로 끝나야 합니다.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStudentId(value);
    if (value.trim() && value.trim().length !== 10) {
      setStudentIdError("학번은 10자리여야 합니다.");
    } else {
      setStudentIdError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim() && !value.trim().endsWith("@knu.ac.kr")) {
      setEmailError("이메일은 @knu.ac.kr로 끝나야 합니다.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isStudentIdValid = validateStudentId(studentId);
    const isEmailValid = validateEmail(email);
    
    if (!studentId.trim() || !email.trim() || !selectedMajor) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (!isStudentIdValid || !isEmailValid) {
      return;
    }

    // 이메일 인증 로직 (추후 구현)
    // 인증 완료 후 채팅 페이지로 이동
    navigate("/chat");
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* 헤더 */}
      <div className="px-6 pt-[120px] text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-white grid place-items-center overflow-hidden">
          <img src={logo} alt="logo" className="w-16 h-16 object-contain" />
        </div>
        <h1 className="mt-3 text-2xl font-semibold text-black1">
          이메일 인증
        </h1>
      </div>

      {/* 폼 영역 */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 학번 입력 */}
          <div className="relative">
            <label className="block text-sm font-medium text-black1 mb-2">
              학번
            </label>
            <input
              type="text"
              value={studentId}
              onChange={handleStudentIdChange}
              onBlur={() => validateStudentId(studentId)}
              placeholder="학번을 입력해주세요"
              className={`w-full h-12 rounded-2xl bg-white border-2 focus:border-point outline-none px-4 placeholder:text-gray3 ${
                studentIdError ? "border-red-500" : "border-main2"
              }`}
              required
            />
            {studentIdError && (
              <p className="absolute top-full left-0 mt-1 text-xs text-red-500 whitespace-nowrap">
                {studentIdError}
              </p>
            )}
          </div>

          {/* 이메일 입력 */}
          <div className="relative">
            <label className="block text-sm font-medium text-black1 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={() => validateEmail(email)}
              placeholder="이메일을 입력해주세요"
              className={`w-full h-12 rounded-2xl bg-white border-2 focus:border-point outline-none px-4 placeholder:text-gray3 ${
                emailError ? "border-red-500" : "border-main2"
              }`}
              required
            />
            {emailError && (
              <p className="absolute top-full left-0 mt-1 text-xs text-red-500 whitespace-nowrap">
                {emailError}
              </p>
            )}
          </div>

          {/* 전공 선택 */}
          <div>
            <label className="block text-sm font-medium text-black1 mb-2">
              전공
            </label>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full h-12 rounded-2xl bg-white border-2 border-main2 focus:border-point outline-none px-4 text-black1 appearance-none"
              required
            >
              <option value="" disabled>
                전공을 선택해주세요
              </option>
              {majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>

          {/* 제출 버튼 */}
          <div className="pt-8">
            <button
              type="submit"
              className="w-full bg-main3 hover:bg-point text-white font-semibold text-lg py-4 px-6 rounded-2xl transition-colors shadow-md active:scale-[0.98]"
            >
              인증하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

