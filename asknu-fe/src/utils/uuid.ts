/**
 * UUID 생성 함수 (crypto.randomUUID 폴리필 포함)
 * 
 * crypto.randomUUID()가 지원되지 않는 환경에서도 동작하도록
 * 폴백 구현을 포함합니다.
 */
export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // crypto.randomUUID 미지원 환경 fallback
  return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

