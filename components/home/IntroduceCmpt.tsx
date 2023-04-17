import Link from "next/link";

interface IntroduceProps {
  ok: boolean;
}

export const Introduce = ({ ok }: IntroduceProps) => {
  return (
    <>
      <div>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Introduce</h1>
          {ok && <div className="h-2 w-2 rounded-full bg-green-500" />}
        </div>
        <div className="flex flex-col flex-wrap space-y-2">
          <h2 className="text-xl font-medium">
            <div>안녕하세요!🙋‍♂️</div>
            <div>
              어제보다 오늘 더 발전하는 개발자,
              <span className="rounded-md bg-amber-500 px-1.5 font-bold">
                김진영
              </span>
              입니다.
            </div>
          </h2>
          <div className="flex flex-row">
            <div className="flex h-fit w-48 flex-col items-center space-y-3">
              <img
                src="https://raw.githubusercontent.com/Real-Bird/pb/master/%EC%A6%9D%EB%AA%85.jpg"
                className="h-40 w-32 bg-slate-500"
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
            <ul className="space-y-1 px-1">
              <li className="pb-1">
                <span className="rounded-md bg-amber-500 px-1.5 font-bold">
                  한국생산성본부
                </span>
                와{" "}
                <span className="rounded-md bg-amber-500 px-1.5 font-bold">
                  정보통신기획평가원
                </span>
                에서 주관한 ICT 교육을 수료했습니다.
              </li>
              <li className="pb-1">
                <span className="rounded-md bg-amber-500 px-1.5 font-bold">
                  TypeScript
                </span>
                와{" "}
                <span className="rounded-md bg-amber-500 px-1.5 font-bold">
                  React
                </span>{" "}
                주로 사용하는 웹 프론트엔드 개발자를 지향합니다.
              </li>
              <li className="pb-1">
                <span className="rounded-md bg-amber-500 px-1.5 font-bold">
                  정보처리산업기사
                </span>{" "}
                자격증을 취득하여 부족한 CS 지식을 보충했습니다.
              </li>
              <li className="pb-1">
                문제가 발생할 경우 회피하지 않고{" "}
                <span className="rounded-md bg-amber-500 px-1.5 font-bold">
                  집요하게 해결
                </span>
                하는 자세를 갖고 있습니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
