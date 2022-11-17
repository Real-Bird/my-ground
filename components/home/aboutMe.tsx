const AboutMe = () => {
  return (
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
                2021.04 ~ 2021.10
              </div>
              <div className="text-sm">
                혁신성장 청년인재 양성교육 빅데이터 과정 수료
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="w-32 rounded-md bg-gray-200 text-center text-sm text-red-500">
                2011.03 ~ 2014.02
              </div>
              <div className="text-sm">명지전문대학 문예창작과 졸업</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
