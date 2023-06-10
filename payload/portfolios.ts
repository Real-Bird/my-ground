import { IPortfolios } from "interface/IPortfolios";

export const portfolios: IPortfolios.Payload[] = [
  {
    title: "Bookcase in the Phone",
    classify: "개인",
    createdAt: "2023.01",
    lastUpdated: "현재",
    github: "https://github.com/Real-Bird/bookcase-in-the-phone",
    deploy: "https://huchu.link/LgVUcpM",
    stacks: [
      { stack: "TypeScript" },
      { stack: "React" },
      { stack: "Styled Components" },
      { stack: "Zxing Library" },
      { stack: "Express" },
      { stack: "Passport" },
      { stack: "MongoDB" },
    ],
    description:
      "`Zxing-js`을 이용한 바코드 인식 혹은 직접 입력한 'ISBN'으로 검색한 책의 서지 정보를 저장하는 웹 책장 서비스입니다. 서지 정보는 '국립중앙도서관'의 Open API를 이용했습니다.",
    issues: [
      {
        issue:
          "후면 카메라가 여러 개 있고, 저화질의 카메라가 먼저 선택되어 카메라 기능 사용 시 편의성 부족",
        solution:
          "고화질 카메라가 배열 마지막에 위치하는 것을 이용하여 해당 카메라만 선택되도록 고정. 검색 단계까지 클릭/터치 횟수 4번 ➡️ 2번 감소",
      },
      {
        issue: "브라우저로 접근해야 하는 까닭에 접근성 낮음",
        solution: "`PWAbuilder`를 이용하여 'manifest' 생성 후 `PWA` 적용",
      },
    ],
  },
  {
    title: "My Ground",
    classify: "개인",
    createdAt: "2022.07",
    lastUpdated: "현재",
    github: "https://github.com/Real-Bird/my-ground",
    deploy: "https://real-bird.vercel.app/",
    stacks: [
      { stack: "TypeScript" },
      { stack: "Next.js" },
      { stack: "Tailwind CSS" },
      { stack: "Prisma" },
      { stack: "PlanetScale" },
      { stack: "SWR" },
      { stack: "Iron Session" },
    ],
    description:
      "`serverless` 환경을 주축으로 `Tailwind CSS`를 활용하여 반응형으로 구현한 블로그입니다.",
    issues: [
      {
        issue:
          "`SSR` 페이지에서 서버 시간과 클라이언트 시간이 다를 때 발생하는 `React Error #418, #423, #425`발생",
        solution:
          "`Next.js` 깃허브에서 해당 Discussions 확인 후 `useEffect`로 1차 해결했으나 여러 개의 날짜 컴포넌트에 적용하기에 부적절함을 느낌. 추후 다시 이슈를 방문하여 다른 해결 방안 확인 후 `suppressHydrationWarning` 적용하여 해결",
      },
      {
        issue: "`SSG` 페이지의 데이터 수정 후 반영되지 않는 문제 발생",
        solution:
          "공식 문서의 `ISR`을 찾아 보고 `POST` 요청 시 `revalidate`하여 해결",
      },
    ],
  },
  {
    title: "거북목 멈춰",
    classify: "팀",
    people: 3,
    createdAt: "2021.07",
    lastUpdated: "2021.10",
    github: "https://github.com/Real-Bird/IITP_Fianl_Project_StopTurtleNeck",
    description:
      "'빅데이터 교육' 파이널 프로젝트로, 수집한 이미지 자료를 바탕으로 학습시킨 `CNN 모델`을 `Tensorflow.js`로 로드하여 웹캠과 연동 후, 실시간으로 자세를 판단하는 프로그램과 커뮤니티를 제공하는 웹사이트입니다.",
    stacks: [
      { stack: "HTML5" },
      { stack: "CSS3" },
      { stack: "JavaScript" },
      { stack: "Tensorflow" },
      { stack: "Tensorflow.js" },
      { stack: "OpenCV" },
      { stack: "Python" },
      { stack: "Django" },
    ],
    issues: [
      {
        issue:
          "학습을 위한 `이미지 데이터 부족`과 `weight 부족`한 레이어 학습으로 인한 모델의 정확도 낮은 현상 발생",
        solution:
          " '바른 자세'와 '거북목 자세' 사진을 여러 지인에게 부탁하여 추가 수집(총 56인/3,000여 장)하고, Tensorflow의 기존 모델 중 'VGG19'에 '전이 학습'하여 정확도 개선 (0.76 ➡️ 0.98)",
      },
      {
        issue: "`OpenCV.js`로 연동한 웹캠 화면의 심각한 속도 저하",
        solution:
          "`Tensorflow.js`를 활용하여 클라이언트에서 학습 모델과 웹캠 연동함",
      },
    ],
  },
];
