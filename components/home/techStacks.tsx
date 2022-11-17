const TechStacks = () => {
  return (
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
              src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=white"
              className="min-h-[28px] min-w-[64px] p-1"
              alt="javascript"
            />
            <img
              src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"
              className="min-h-[28px] min-w-[64px] p-1"
              alt="javascript"
            />
            <img
              src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"
              className="min-h-[28px] min-w-[64px] p-1"
              alt="html5"
            />
            <img
              src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"
              className="min-h-[28px] min-w-[64px] p-1"
              alt="css3"
            />
            <img
              src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"
              className="min-h-[28px] min-w-[64px] p-1"
              alt="react"
            />
            <img
              src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=Tailwind%20CSS&logoColor=white"
              className="min-h-[28px] min-w-[64px] p-1"
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
              src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white"
              className="min-h-[28px] min-w-[64px] p-1"
              alt="nextjs"
            />
            <img
              src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=Prisma&logoColor=white"
              alt="Prisma"
              className="min-h-[28px] min-w-[64px] p-1"
            />
            <img
              src="https://img.shields.io/badge/PlanetScale-000000?style=flat&logo=PlanetScale&logoColor=white"
              alt="PlanetScale"
              className="min-h-[28px] min-w-[64px] p-1"
            />
            <img
              src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=Python&logoColor=white"
              alt="Python"
              className="min-h-[28px] min-w-[64px] p-1"
            />
          </div>
        </div>
        <div className="py-1">
          <div className="flex flex-row space-x-2 font-medium">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                />
              </svg>
            </span>
            <div>Knowledge</div>
          </div>
          <div className="flex flex-row flex-wrap justify-start py-1">
            <img
              src="https://img.shields.io/badge/Django-092E20?style=flat&logo=Django&logoColor=white"
              alt="Django"
              className="min-h-[28px] min-w-[64px] p-1"
            />
            <img
              src="https://img.shields.io/badge/FireBase-FFCA28?style=flat&logo=FireBase&logoColor=white"
              alt="FireBase"
              className="min-h-[28px] min-w-[64px] p-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStacks;
