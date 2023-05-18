import { IPortfolios } from "interface/IPortfolios";

export const portfolios: IPortfolios.Payload[] = [
  {
    title: "My Ground",
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
    ],
    details: [
      "`SSR`, `ISR`을 이용한 `blog` 페이지 구현",
      "`Meta` 컴포넌트를 추가하여 SEO 향상",
    ],
  },
];

const template: (typeof portfolios)[0] = {
  title: "",
  createdAt: "",
  lastUpdated: "",
  github: "",
  deploy: "",
  summary: "",
  stacks: [],
  details: [],
};
