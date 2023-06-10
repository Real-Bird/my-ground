import { ITechStacks } from "interface/ITechStacks";

export const stacks: ITechStacks.Payload = {
  fields: [
    {
      type: "Front",
      stackAndDescriptions: [
        {
          stack: "JavaScript",
          descriptions: [
            "`ES6+` 문법에 능숙합니다.",
            "`스코프`와 `클로저`의 개념을 이해하고 있습니다.",
            "`DOM` 구조를 이해하고 능숙하게 다룰 수 있습니다.",
          ],
        },
        {
          stack: "TypeScript",
          descriptions: [
            "`any`와 `타입 단언`을 지양합니다.",
            "`유틸리티 타입`과 `제네릭`을 적절히 사용할 수 있습니다.",
          ],
        },
        {
          stack: "React",
          descriptions: [
            "함수형 컴포넌트에 익숙합니다.",
            "반복되는 컴포넌트를 따로 분리해 사용합니다.",
            "공통적으로 사용하는 기능을 `hook`으로 제작합니다.",
          ],
        },
        {
          stack: "Next.js",
          descriptions: [
            "`SSR`, `SSG`, `ISR`을 이용한 페이지를 구현할 수 있습니다.",
          ],
        },
        {
          stack: "Tailwind CSS",
          descriptions: [
            "커스텀 클래스를 만들어 사용할 수 있습니다.",
            "반응형 웹을 만들어 본 경험이 있습니다.",
          ],
        },
      ],
    },
    {
      type: "Back",
      stackAndDescriptions: [
        {
          stack: "Node.js",
          descriptions: [
            "간단한 서버를 만들 수 있습니다.",
            "`REST API`를 만들어 클라이언트와 통신한 경험이 있습니다.",
          ],
        },
      ],
    },
    {
      type: "ETC",
      stackAndDescriptions: [
        { stack: "Express" },
        { stack: "Git" },
        { stack: "GitHub" },
        { stack: "MongoDB" },
        { stack: "Prisma" },
        { stack: "Sass" },
        { stack: "Tailwind CSS" },
        { stack: "Styled Components" },
      ],
    },
  ],
};
