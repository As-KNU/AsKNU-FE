import logo from "../assets/KNUlogo.svg";

// 직원 데이터 (웹사이트에서 가져온 정보)
const staffMembers = [
  {
    name: "공미화",
    phone: "+82-53-950-6420",
    location: "E9-413",
    email: "mhkong@knu.ac.kr",
    responsibility: "교무, 연구, 대학원",
  },
  {
    name: "김경민",
    phone: "053-950-7375",
    location: "E9-519호",
    email: "gmgeem@knu.ac.kr",
    responsibility: "대학원지원사업(BK21)",
  },
  {
    name: "김미영",
    phone: "+82-53-950-6370",
    location: "IT5-317",
    email: "mykim@knu.ac.kr",
    responsibility: "수업, 교직, 심컴(ABEEK)",
  },
  {
    name: "김채원",
    phone: "+82-53-950-6446",
    location: "E9-413",
    email: "rejoice12345@knu.ac.kr",
    responsibility: "데이터융합컴퓨팅학과, 홈페이지, 기획(데이터분석)",
  },
  {
    name: "노휘",
    phone: "+82-53-950-6605",
    location: "IT5-317",
    email: "crotus@knu.ac.kr",
    responsibility: "국립대학육성사업, 장학(근로), 진로·취업",
  },
  {
    name: "박지혜",
    phone: "+82-53-950-6142",
    location: "E9-413",
    email: "wisdom@knu.ac.kr",
    responsibility: "RISE사업",
  },
  {
    name: "방원길",
    phone: "+82-53-950-7670",
    location: "IT5-402",
    email: "bk6722@knu.ac.kr",
    responsibility: "학부지원사업(SW교육원)",
  },
  {
    name: "성민기",
    phone: "+82 53-950-7388",
    location: "IT5-402",
    email: "Jerryyann@knu.ac.kr",
    responsibility: "학부지원사업(SW교육원)",
  },
  {
    name: "이명화",
    phone: "+82-53-950-7679",
    location: "IT5-402",
    email: "ori272@knu.ac.kr",
    responsibility: "학부지원사업(SW교육원)",
  },
  {
    name: "이민승",
    phone: "+82-53-950-5550",
    location: "IT5-317",
    email: "rosetum2nd@knu.ac.kr",
    responsibility: "학적, 복수전공, 부전공, 학사지원",
  },
  {
    name: "이아림",
    phone: "053-950-6691",
    location: "IT5-317",
    email: "leearim@knu.ac.kr",
    responsibility: "RISE 사업, 장학, 국제",
  },
  {
    name: "이왕태",
    phone: "+82-53-950-6349",
    location: "IT5-317",
    email: "dhkdxo12@knu.ac.kr",
    responsibility: "국립대학육성사업(KNU 교육선도학과), 정보화본부",
  },
  {
    name: "임초록",
    phone: "+82-53-950-6509",
    location: "IT5-317",
    email: "imgreen@knu.ac.kr",
    responsibility: "입시, 글로벌SW융합전공(글솝)",
  },
  {
    name: "장혜진",
    phone: "053-950-6671",
    location: "IT4-103",
    email: "jinjin@knu.ac.kr",
    responsibility: "ICT계약학과, 수성알파시티 SW융합캠퍼스 구축사업",
  },
  {
    name: "정성범",
    phone: "+82-53-950-6690",
    location: "IT5-317",
    email: "jsb8590@knu.ac.kr",
    responsibility: "시설/기자재, 정보화본부, 국립대학육성사업 프로그램 운영",
  },
  {
    name: "하은주",
    phone: "053-950-7551",
    location: "IT5-317",
    email: "hanju923@knu.ac.kr",
    responsibility: "RISE 사업, 현장실습, 국립대육성사업(KNU선도브랜드)",
  },
  {
    name: "허선미",
    phone: "053-950-7685",
    location: "IT5-402",
    email: "heosm12@knu.ac.kr",
    responsibility: "학부지원사업(SW교육원), 융합전공",
  },
  {
    name: "황영문",
    phone: "+82-53-950-7382",
    location: "E9-519",
    email: "88baboso@knu.ac.kr",
    responsibility: "대학원지원사업(BK21)",
  },
];

export default function EmployeePage() {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* 헤더 */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white ring-2 ring-main3 grid place-items-center overflow-hidden">
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-xl font-semibold text-black1">AsKNU</h1>
          </div>
          <a
            href="https://computer.knu.ac.kr/bbs/board.php?bo_table=sub2_5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray3 text-sm hover:text-gray-900 transition"
          >
            담당자 현황 &gt;
          </a>
        </div>
      </div>

      {/* 직원 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-black1 mb-1">직원 현황</h2>
          <p className="text-sm text-gray3">Total {staffMembers.length}건</p>
        </div>

        <div className="space-y-3">
          {staffMembers.map((staff, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-black1">
                  {staff.name}
                </h3>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray3 w-16">전화</span>
                  <a
                    href={`tel:${staff.phone.replace(/[^0-9]/g, "")}`}
                    className="text-black1 hover:text-point transition"
                  >
                    {staff.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray3 w-16">위치</span>
                  <span className="text-black1">{staff.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray3 w-16">이메일</span>
                  <a
                    href={`mailto:${staff.email}`}
                    className="text-black1 hover:text-point transition break-all"
                  >
                    {staff.email}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray3 w-16">담당</span>
                  <span className="text-black1">{staff.responsibility}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

