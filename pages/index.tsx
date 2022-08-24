import type { NextPage } from "next";
import Layout from "@components/layout";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout title="HOME" isFooter>
      <div className="mx-3 flex flex-col space-y-3">
        <div className="my-5 space-y-5 divide-y-2">
          <div>
            <h1 className="text-2xl font-bold">Introduce</h1>
            <div className="flex flex-col flex-wrap space-y-2">
              <h2 className="text-xl font-medium">
                <div>안녕하세요!🙋‍♂️</div>
                <div>프론트엔드 개발자를 꿈꾸는 김진영의 놀이터입니다.</div>
              </h2>
              <div className="flex flex-row">
                <div className="flex h-fit w-60 flex-col items-center space-y-3">
                  <img
                    src="https://raw.githubusercontent.com/Real-Bird/pb/master/%EC%A6%9D%EB%AA%85.jpg"
                    className="w-54 h-48 bg-slate-500"
                    alt="portrait"
                  />
                  <Link href="/resume">
                    <a target={"_blank"}>
                      <div className="flex flex-row">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                          />
                        </svg>
                        <span>이력서 보기</span>
                      </div>
                    </a>
                  </Link>
                  <div className="flex h-10 w-40 flex-row justify-evenly">
                    <Link href="https://github.com/real-bird">
                      <a className="h-8 w-8 cursor-pointer" target="_blank">
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      </a>
                    </Link>
                    <Link href="https://velog.io/@real-bird">
                      <a className="h-8 w-8 cursor-pointer" target="_blank">
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#20C997"
                        >
                          <path d="M3 0C1.338 0 0 1.338 0 3v18c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3V3c0-1.662-1.338-3-3-3H3Zm6.883 6.25c.63 0 1.005.3 1.125.9l1.463 8.303c.465-.615.846-1.133 1.146-1.553.465-.66.893-1.418 1.283-2.273.405-.855.608-1.62.608-2.295 0-.405-.113-.727-.338-.967-.21-.255-.608-.577-1.193-.967.6-.765 1.35-1.148 2.25-1.148.48 0 .878.143 1.193.428.33.285.494.704.494 1.26 0 .93-.39 2.093-1.17 3.488-.765 1.38-2.241 3.457-4.431 6.232l-2.227.156-1.711-9.628h-2.25V7.24c.6-.195 1.305-.406 2.115-.63.81-.24 1.358-.36 1.643-.36Z" />
                        </svg>
                      </a>
                    </Link>
                    <Link href="https://blog.naver.com/illiill1i1l">
                      <a className="h-8 w-8 cursor-pointer" target="_blank">
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#03C75A"
                        >
                          <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="space-y-1 px-2">
                  <p className="pb-1 text-sm">
                    <i>국비지원 ICT 교육</i>으로 코딩 공부를 시작했습니다.
                  </p>
                  <p className="pb-1 text-sm">
                    <b>Python</b>으로 코딩에 재미를 붙였고, <b>React</b>를
                    익히면서{" "}
                    <big>
                      <b>Front-End Develoer</b>
                    </big>
                    를 꿈꾸게 되었습니다.
                  </p>
                  <p className="pb-1 text-sm">
                    하루하루 작성한 코드를 <b>Github</b>에 커밋하여 잔디밭을
                    가꾸는 중입니다.
                  </p>
                  <p className="pb-1 text-sm">
                    기술과 관련해 새로 배운 지식은 <b>Velog</b>에 기록합니다.
                  </p>
                  <p className="pb-1 text-sm">
                    <b>Naver Blog</b>는 자기관리와 서평 저장소입니다.
                  </p>
                  <p className="pb-1 text-sm">
                    프론트엔드 개발자로서 손색 없는 그날까지 개발 공부를
                    계속하겠습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="py-2 text-2xl font-bold">Tech Stack</h2>
            <div className="flex flex-col">
              <div>
                <div className="flex flex-row space-x-2 font-medium">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span>Main</span>
                </div>
                <div className="flex flex-row flex-wrap justify-start py-1">
                  <img
                    src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"
                    className="px-1 pt-1"
                    alt="html5"
                  />
                  <img
                    src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white"
                    className="px-1 pt-1"
                    alt="javascript"
                  />
                  <img
                    src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"
                    className="px-1 pt-1"
                    alt="css3"
                  />
                  <img
                    src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"
                    className="px-1 pt-1"
                    alt="react"
                  />
                  <img
                    src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white"
                    className="px-1 pt-1"
                    alt="nextjs"
                  />
                  <img
                    src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=Tailwind%20CSS&logoColor=white"
                    className="px-1 pt-1"
                    alt="tailwind-css"
                  />
                </div>
              </div>
              <div className="py-1">
                <div className="flex flex-row space-x-2 font-medium">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    </svg>
                  </span>
                  <div>Sub</div>
                </div>
                <div className="flex flex-row flex-wrap justify-start py-1">
                  <img
                    src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=Python&logoColor=white"
                    alt="Python"
                    className="px-1 pt-1"
                  />
                  <img
                    src="https://img.shields.io/badge/Django-092E20?style=flat&logo=Django&logoColor=white"
                    alt="Django"
                    className="px-1 pt-1"
                  />
                  <img
                    src="https://img.shields.io/badge/FireBase-FFCA28?style=flat&logo=FireBase&logoColor=white"
                    alt="FireBase"
                    className="px-1 pt-1"
                  />
                  <img
                    src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=Prisma&logoColor=white"
                    alt="Prisma"
                    className="px-1 pt-1"
                  />
                  <img
                    src="https://img.shields.io/badge/PlanetScale-000000?style=flat&logo=PlanetScale&logoColor=white"
                    alt="PlanetScale"
                    className="px-1 pt-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <img
              src="https://ghchart.rshah.org/339933/real-bird"
              alt="github-grass"
            />
            <span>🌱 Github Progress</span>
          </div>
          <div className="flex flex-col flex-wrap space-y-3" id="about">
            <h1 className="text-2xl font-bold">About me</h1>
            <div className="flex flex-col space-y-4">
              <div className="space-y-3">
                <div className="flex flex-row space-x-2 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Certificate</span>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-row space-x-2">
                    <div className="w-16 rounded-md bg-gray-200 text-center text-sm text-red-500">
                      2022.06
                    </div>
                    <div className="text-sm">정보처리산업기사 최종 합격</div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <div className="w-16 rounded-md bg-gray-200 text-center text-sm text-red-500">
                      2021.02
                    </div>
                    <div className="text-sm">컴퓨터활용능력 1급 취득</div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <div className="w-16 rounded-md bg-gray-200 text-center text-sm text-red-500">
                      2019.10
                    </div>
                    <div className="text-sm">
                      정보기술자격 ITQ(한글,엑셀,파워포인트) 취득
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex flex-row space-x-2 font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  <span>Education</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-row space-x-2">
                    <div className="w-32 rounded-md bg-gray-200 text-center text-sm text-red-500">
                      2011.03 ~ 2014.02
                    </div>
                    <div className="text-sm">명지전문대학 문예창작과 졸업</div>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <div className="w-32 rounded-md bg-gray-200 text-center text-sm text-red-500">
                      2021.04 ~ 2021.10
                    </div>
                    <div className="text-sm">
                      혁신성장 청년인재 양성교육
                      <span className="font-bold">빅데이터 과정</span> 수료
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
