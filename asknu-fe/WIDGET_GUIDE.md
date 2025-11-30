# AsKNU 위젯 임베드 가이드

## 개요
AsKNU 채팅 위젯을 다른 웹사이트에 임베드하는 방법입니다.
위젯은 우측 하단에 동그란 버튼으로 표시되며, 클릭 시 채팅창이 모달로 열립니다.

## 빌드 방법

### 1. 위젯 빌드
```bash
pnpm build
```

빌드 후 `dist/` 폴더에 다음 파일들이 생성됩니다:
- `widget.html` - 위젯 전용 HTML
- `assets/widget-*.js` - 위젯 JavaScript 번들
- `assets/widget-*.css` - 위젯 스타일

## 웹사이트에 임베드하기

### 방법 1: 직접 스크립트 임베드 (권장)

배포된 위젯 파일을 CDN이나 서버에 올린 후, 아래 코드를 웹사이트의 `</body>` 태그 바로 앞에 추가하세요:

```html
<!-- AsKNU 채팅 위젯 -->
<div id="asknu-widget-root"></div>
<script type="module" src="https://your-domain.com/assets/widget-[hash].js"></script>
<link rel="stylesheet" href="https://your-domain.com/assets/widget-[hash].css">
```

### 방법 2: iframe 사용

```html
<iframe 
  src="https://your-domain.com/widget.html" 
  width="390" 
  height="600" 
  frameborder="0"
  style="position: fixed; bottom: 20px; right: 20px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); z-index: 9999;"
></iframe>
```

## 커스터마이징

### 버튼 위치 변경
위젯 컴포넌트(`src/components/ChatWidget.tsx`)에서 플로팅 버튼의 위치를 변경할 수 있습니다:

```tsx
// 우측 하단 (기본)
className="fixed bottom-6 right-6 ..."

// 좌측 하단으로 변경하려면
className="fixed bottom-6 left-6 ..."
```

### 모달 크기 조정
```tsx
// ChatWidget.tsx에서
className="... w-[390px] h-[600px] ..."
```

## 배포 예시

### Vercel 배포
1. 프로젝트를 GitHub에 푸시
2. Vercel에 연결
3. 빌드 설정:
   - Build Command: `pnpm build`
   - Output Directory: `dist`
4. 배포 후 URL을 위젯 임베드 코드에 사용

### Netlify 배포
1. 프로젝트를 GitHub에 푸시
2. Netlify에 연결
3. 빌드 설정:
   - Build command: `pnpm build`
   - Publish directory: `dist`

## 경북대 컴퓨터학부 사이트에 적용

`https://cse.knu.ac.kr/index.php` 사이트에 적용하려면:

1. 위젯을 배포 (예: `https://asknu.knu.ac.kr`)
2. 사이트 관리자에게 아래 코드 제공:

```html
<!-- AsKNU 채팅 위젯 -->
<div id="asknu-widget-root"></div>
<script type="module" src="https://asknu.knu.ac.kr/assets/widget-[hash].js"></script>
<link rel="stylesheet" href="https://asknu.knu.ac.kr/assets/widget-[hash].css">
```

3. 사이트의 전역 푸터나 `</body>` 태그 앞에 추가

## 주의사항

- 위젯은 `z-index: 50`을 사용하므로, 사이트의 다른 요소와 겹치지 않도록 주의
- 모바일 반응형을 고려하여 모달 크기를 조정할 수 있습니다
- CORS 설정이 필요할 수 있습니다 (외부 도메인에서 로드하는 경우)

