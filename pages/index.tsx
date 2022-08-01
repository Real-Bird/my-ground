import type { NextPage } from "next";
import Layout from "@components/layout";

const Home: NextPage = () => {
  return (
    <Layout title="HOME">
      <div className="mx-3 flex flex-col space-y-3">
        <div className="space-y-5 divide-y-2">
          <div>
            <h1 className="text-2xl font-bold">Introduce</h1>
            <div className="flex flex-col flex-wrap space-y-2">
              <h2 className="text-xl font-medium">
                <div>안녕하세요!🙋‍♂️</div>
                <div>프론트엔드 개발자를 꿈꾸는 김진영의 놀이터입니다.</div>
              </h2>
              <div className="flex flex-row">
                <img
                  src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f839e2f-12df-4547-ae58-05ff7f5c6c4a/%EC%A6%9D%EB%AA%85.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220801%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220801T171809Z&X-Amz-Expires=86400&X-Amz-Signature=75a4a22f7611365e65e2d2bc928ce149aa15bcdbb20467d7a311cdc098f1f0f5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25EC%25A6%259D%25EB%25AA%2585.jpg%22&x-id=GetObject"
                  className="h-44 w-40 bg-slate-500"
                />
                <div className="px-2">
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
                    매일 <b>Github</b>에 잔디를 심으며 꾸준히 공부하고 있습니다.
                  </p>
                  <p className="pb-1 text-sm">
                    최신 트렌드에 뒤처지지 않는 개발자가 되는 것이 목표입니다.
                  </p>
                  <p className="pb-1 text-sm">
                    풀스택 개발자로서 손색 없는 그날까지 개발 공부를
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
                <div className="flex flex-row flex-wrap space-x-1 py-1">
                  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
                  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white" />
                  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
                  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
                  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white" />
                  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=Tailwind%20CSS&logoColor=white" />
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
                <div className="flex flex-row flex-wrap space-x-1 py-1">
                  {/* <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white" /> */}
                  <img
                    src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=Python&logoColor=white"
                    alt="Python"
                  />
                  <img
                    src="https://img.shields.io/badge/Django-092E20?style=flat&logo=Django&logoColor=white"
                    alt="Django"
                  />
                  <img
                    src="https://img.shields.io/badge/FireBase-FFCA28?style=flat&logo=FireBase&logoColor=white"
                    alt="FireBase"
                  />
                  <img
                    src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=Prisma&logoColor=white"
                    alt="Prisma"
                  />
                  <img
                    src="https://img.shields.io/badge/PlanetScale-000000?style=flat&logo=PlanetScale&logoColor=white"
                    alt="PlanetScale"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <img src="https://ghchart.rshah.org/339933/real-bird" />
            <span>🌱 Github Progress</span>
          </div>
          <div className="flex flex-col flex-wrap space-y-3">
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
