import { IPortfolios } from "interface/IPortfolios";

export const portfolios: IPortfolios.Payload[] = [
  {
    title: "My Ground",
    classify: "개인",
    createdAt: "2022.07",
    lastUpdated: "2023.05",
    github: "https://github.com/Real-Bird/my-ground",
    deploy: "https://real-bird.vercel.app/",
    summary: "개인 포트폴리오 및 블로그 웹사이트",
    stacks: [
      { stack: "TypeScript", color: "3178C6" },
      { stack: "Next.js", color: "000000" },
      { stack: "Tailwind CSS", color: "06B6D4" },
      { stack: "Prisma", color: "2D3748" },
      { stack: "PlanetScale", color: "000000" },
      { stack: "Visual Studio Code", color: "007ACC" },
      { stack: "Git", color: "F05032" },
      { stack: "Github", color: "181717" },
    ],
    details: [
      "`SSR`, `ISR`을 이용한 `blog` 페이지 구현",
      "`Meta` 컴포넌트를 추가하여 SEO 향상",
    ],
  },
  {
    title: "Bookcase in the Phone",
    classify: "개인",
    createdAt: "2023.01",
    lastUpdated: "2023.02",
    github: "https://github.com/Real-Bird/bookcase-in-the-phone",
    deploy: "https://huchu.link/LgVUcpM",
    summary:
      "바코드 및 ISBN으로 검색한 책의 서지 정보를 저장하는 웹 책장 서비스",
    stacks: [
      { stack: "TypeScript", color: "3178C6" },
      { stack: "React", color: "61DAFB" },
      { stack: "Styled Components", color: "DB7093" },
      { stack: "Zxing Library", color: "000000" },
      { stack: "Express", color: "000000" },
      { stack: "Passport", color: "34E27A" },
      { stack: "MongoDB", color: "47A248" },
      { stack: "Visual Studio Code", color: "007ACC" },
      { stack: "Git", color: "F05032" },
      { stack: "Github", color: "181717" },
    ],
    details: [
      "`Passport.js`를 이용한 Google 로그인 구현",
      "`REST API` 형식으로 클라이언트와 서버 통신",
      "`Media Stream`과 `Zxing Libarary`를 이용한 바코드 인식 구현",
    ],
  },
  {
    title: "거북목 멈춰",
    classify: "팀",
    peaple: 3,
    createdAt: "2021.07",
    lastUpdated: "2021.10",
    github: "https://github.com/Real-Bird/IITP_Fianl_Project_StopTurtleNeck",
    summary:
      "CNN 학습 모델을 이용한 웹캠 기반 거북목 판단 및 커뮤니티 웹사이트",
    stacks: [
      { stack: "HTML5", color: "E34F26" },
      { stack: "CSS3", color: "1572B6" },
      { stack: "JavaScript", color: "F7DF1E" },
      { stack: "Tensorflow", color: "FF6F00" },
      { stack: "Tensorflow.js", color: "FF6F00" },
      { stack: "OpenCV", color: "5C3EE8" },
      { stack: "Python", color: "3776AB" },
      { stack: "Django", color: "092E20" },
    ],
    details: [
      "데이터 수집 : 이미지 학습을 위한 '바른 자세'와 '거북목 자세' 사진을 여러 지인에게 부탁하여 촬영하여 수집함(총 56인, 3천 여장)",
      "학습 모델 구현 : Tensorflow의 기존 모델 중 'VGG19'에 전이 학습하여 정확도 향상(사전 모델 정확도 0.76 ➡️ 0.98)",
      "웹사이트 구현 : Tensorflow.js를 활용하여 학습 모델과 웹캠 연동함",
      "성과 : 교육 내 발표회에서 '최우수상' 수상, 개발과 직면하는 문제 해결에 필요한 지식 획득 방법 및 협업에 필요한 커뮤니케이션 경험 습득",
    ],
  },
];

const template: (typeof portfolios)[0] = {
  title: "",
  classify: "개인",
  peaple: 3,
  createdAt: "",
  lastUpdated: "",
  github: "",
  deploy: "",
  summary: "",
  stacks: [],
  details: [],
};
