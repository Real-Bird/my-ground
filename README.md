# (개인 프로젝트) My Ground (2022.07 ~ 2022.08)

![SmallTile scale-400](https://github.com/Real-Bird/my-ground/assets/83404864/b9e9a462-1745-42af-b680-3cb528e67aa9)

**개요**

- 개인 블로깅 웹사이트

**배포**

<https://real-bird.vercel.app>

**역할**

- 프론트엔드
- `Vercel` 배포

**사용 스택**

- TypeScript, Next.js, TailwindCSS, Prisma, SWR, PlanetScale

## 주요 기능

---

- **목차**
    1. [`Tailwind CSS`를 이용한 UI 구현](#tailwind-css를-이용한-ui-구현)
    2. [`Table of Contents` 구현](#table-of-contents-구현)
    3. [`Serverless` 환경에서 블로그 구현](#serverless-환경에서-블로그-구현)

### `Tailwind CSS`를 이용한 UI 구현

**전반적인 UI 구현**

- 클래스명으로 inline 스타일링할 수 있고 다루기 쉬워 `Tailwind CSS`를 선택해 전반적인 UI를 구현했습니다.

**커스텀 클래스**

- 제공되는 클래스를 사용하되 커스텀이 필요한 부분은 `config`에 추가하여 사용했습니다. 주로 애니메이션 효과를 만들었습니다.

**반응형 웹**

- 모바일을 기준으로 두고 태블릿은 `md`, PC는 `xl` prefix를 사용해 반응형 웹을 구현했습니다.

**React Select를 클론하여 Tailwind CSS로 구현**

- input 태그 안에서 여러 개의 태그가 나열되는 부분이 부러워 `React Select`의 스타일을 클론하여 `Tailwind CSS`로 구현했습니다.

### `Table of Contents` 구현

**Intersection Observer API를 사용**

- `Intersection Observer`를 통해 파싱된 마크업 태그 중 heading 태그를 감지하고 하이라이트를 통해 현재 어느 heading을 보고 있는지 파악할 수 있습니다.

### `Serverless` 환경에서 블로그 구현

**`PlanetScale`과 `Prisma`를 이용해 `Serverless` 환경 구축**

- 인터넷 강의(`노마드 코더 - 캐럿마켓 클론 코딩`)에서 배운 내용을 바탕으로, 사용한 환경을 재사용하여 블로그 환경을 구축했습니다.
