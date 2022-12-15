# My Ground

개인 포트폴리오/블로그 사이트입니다.

개발 기간 : 2022.07 ~ 
지속해서 개선 중입니다.

[RB's Ground](https://real-bird.vercel.app)

## 1.구현 화면

PC 버전과 Mobile 버전으로 화면을 구성했습니다.

### 1-1.Home
<details>
<summary>이미지 보기</summary>

![01-home](https://user-images.githubusercontent.com/83404864/205239068-a527a590-9749-40e0-91f4-ffed4c18b497.jpg)

</details>

- 처음 접속 시 노출되는 메인입니다.
- 마크업 태그만 사용했습니다.

### 1-2.Portfolio

[portfolio.webm](https://user-images.githubusercontent.com/83404864/205243644-c557da07-b2eb-498a-a8bf-282abaea918d.webm)

<details>
<summary>이미지 보기</summary>

![02-portfolio](https://user-images.githubusercontent.com/83404864/205244617-811b4da0-3bbc-4c9f-b006-1853ea54c8fd.jpg)

**초기 UI**
![03-portfolio-upload](https://user-images.githubusercontent.com/83404864/205244882-226e3fc0-6bd1-4cad-97e7-98ed030ac215.jpg)

![03-portfolio-revised](https://user-images.githubusercontent.com/83404864/205244991-1a6aa442-04f1-47f2-bb9f-05fc53564eaf.jpg)

**변경 UI**
![03-portfolio-upload](https://user-images.githubusercontent.com/83404864/207894112-bc41cda9-54c1-4062-ba4c-6b4e3a3bd5b5.jpg)

![03-portfolio-revised](https://user-images.githubusercontent.com/83404864/207894132-1bf76eea-7faf-4ee9-9df7-c0e44442bd7c.jpg)

</details>

- 포트폴리오를 기록한 화면입니다.
- 데이터 양이 많지 않고, `SEO`를 고려할 필요가 없다고 판단하여 `CSR`로 렌더링했습니다.
- 작성 페이지는 UI를 한 화면에서 확인할 수 있도록 멀티스텝 폼으로 개선했습니다.

### 1-3.Blog

[blog.webm](https://user-images.githubusercontent.com/83404864/205252747-d8d3e87e-07d0-447a-94c3-c0d112145fc8.webm)

<details>
<summary>이미지 보기</summary>

![04-blog](https://user-images.githubusercontent.com/83404864/205253162-168df69c-9151-4eee-9e50-b73042cad367.jpg)

![04-blog-upload](https://user-images.githubusercontent.com/83404864/205253340-d672fb1d-bb66-4274-a157-ed9d9767c5a4.jpg)

![04-blog-revised](https://user-images.githubusercontent.com/83404864/205253349-3868a6d8-88ca-491f-b44b-7d1fdfa82d33.jpg)

</details>

- 공부한 기술을 기록하는 블로그 화면입니다.
- 데이터 양이 지속적으로 늘어날 것을 대비하여 `SSR`로 렌더링했습니다.

### 1-4.Posts List

[posts.webm](https://user-images.githubusercontent.com/83404864/205255350-53c26ffd-f862-45e6-acea-a2aa611f5555.webm)

<details>

<summary>이미지 보기</summary>

![06-contact](https://user-images.githubusercontent.com/83404864/205257254-c35278ae-18f4-4b78-bfda-42e3b493a99c.jpg)

</details>

- 누구나 간단한 글을 쓸 수 있는 게시판입니다.
- 데이터 양이 지속적으로 늘어날 것을 대비하여 `SSR`로 렌더링했습니다.
- 간단함이 목적인 만큼 피드 형식으로 화면을 구성했습니다.

### 1-5.Post Detail

[post-upload.webm](https://user-images.githubusercontent.com/83404864/205256197-db05aa4d-7440-4589-82a6-2d07f848b4e8.webm)

[post-UD.webm](https://user-images.githubusercontent.com/83404864/205256223-eee58df8-dbb5-48bc-bf6f-3ceb086ca023.webm)

<details>

<summary>이미지 보기</summary>

![07-contact_detail](https://user-images.githubusercontent.com/83404864/205258301-3c9afa54-b3f9-46f7-a35d-cb85d12c776f.jpg)

</details>

- 게시판의 게시글을 클릭하였을 때의 화면입니다.
- 모달로 구성했습니다.
- 에러는 토스트 메세지로 알립니다.

### 1-6.Notice

<details>

<summary>이미지 보기</summary>

![08-notice](https://user-images.githubusercontent.com/83404864/205270840-5c62a39e-34c8-4b2a-9747-5aea9a95d3bb.jpg)

![09-notice_detail](https://user-images.githubusercontent.com/83404864/205270870-a766e7f3-9393-4d49-8e95-2f00ed2d20b7.jpg)

</details>

- 공지사항 페이지입니다.
- 잦은 변경 및 추가가 없는 페이지여서 `SSG`로 구현했습니다.

## 2.프레임워크 / 라이브러리

- ![Next.js](https://img.shields.io/badge/Next%2Ejs-000000?style=flat&logo=nextjs&logoColor=white)
  - `React` 프레임워크이며 `serverless`를 통한 `full stack` 개발에 유리하여 선택했습니다.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
  - 스타일링이 간단하며 직관적인 `className`을 사용으로 접근이 쉬워 선택했습니다.
- ![Planet Scale](https://img.shields.io/badge/PlanetScale-000000?style=flat&logo=planetscale&logoColor=white)
  - `serverless`의 `DB`로 활용하며 1개까지 무료로 사용할 수 있어 선택했습니다.
  - `cli` 제공으로 러닝 커브가 낮은 이유도 있습니다.
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
  - `PlanetScale`과 연결하여 개발 환경에서 `DB`를 다루기 위해 사용했습니다.
- ![SWR](https://img.shields.io/badge/SWR-ffffff?style=flat&logo=swr&logoColor=black)
  - 패치한 데이터의 상태 관리를 위해 사용했습니다.
- ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat&logo=reacthookform&logoColor=black)
  - 패치한 데이터의 상태 관리를 위해 사용했습니다.
- ![MUI](https://img.shields.io/badge/MUI%2fmaterial-007FFF?style=flat&logo=mui&logoColor=white)
  - `Skeleton` 사용을 위해 선택했습니다.
- ![iron-session](https://img.shields.io/badge/iron-session-6E6E6E?style=flat&logoColor=white)
  - `admin`의 `session` 유지를 위해 사용했습니다.
- ![@uiw/react-md-editor](https://img.shields.io/badge/react-md-editor-8b949e?style=flat&logoColor=white)
  - 포트폴리오와 블로그의 업로드와 뷰를 위해 선택했습니다.
  
## 3.비고

- 지속적으로 변경 및 개선 중입니다.
