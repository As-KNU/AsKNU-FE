import { Link } from "react-router-dom";
import logo from "../assets/KNUlogo.svg";
import { employees } from "../data/employees";

export default function EmployeePage() {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* 헤더 */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
            <h1 className="text-xl font-bold text-black1">AsKNU</h1>
          </div>
          <Link
            to="/"
            className="text-gray3 text-sm hover:text-black1 transition"
          >
            &lt; 뒤로
          </Link>
        </div>
      </div>

      {/* 제목 및 카운트 */}
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-2xl font-bold text-black1 mb-1">직원 현황</h2>
        <p className="text-gray3 text-sm">Total {employees.length}건</p>
      </div>

      {/* 직원 목록 */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-3">
          {employees.map((employee, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-black1 mb-3">
                {employee.name}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray3">전화</span>
                  <span className="text-black1 font-medium">
                    {employee.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray3">위치</span>
                  <span className="text-black1 font-medium">
                    {employee.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray3">이메일</span>
                  <a
                    href={`mailto:${employee.email}`}
                    className="text-point font-medium hover:underline"
                  >
                    {employee.email}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray3">담당</span>
                  <span className="text-black1 font-medium text-right max-w-[60%] whitespace-pre-line">
                    {employee.responsibility}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray3">근무시간</span>
                  <span className="text-black1 font-medium">
                    {employee.workingHours}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

