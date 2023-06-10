import { IEducations } from "interface/IEducations";

export const educations: IEducations.Payload[] = [
  {
    title: "혁신성장 청년인재 양성교육 빅데이터 과정",
    status: "수료",
    startedAt: "2021.04",
    endedAt: "2021.10",
    addition: "한국생산성본부",
    details: [
      "(1~4주 차) 저장기술 및 기초 프로그래밍 : DBMS 기초 및 SQL / JSP, Javascript, HTML5",
      "(5주 차) JSP, JavaScript, HTML5, CSS3, Open API를 활용한 미니 프로젝트",
      "(6~7주 차) 빅데이터 분석 : 통계 / R 프로그래밍 / 데이터 실전분석 with Python",
      "(8~9주 차) 머신러닝 활용 및 실습 : 지도학습 / 비지도학습 / 사례기반 학습",
      "(10~11주 차) 딥러닝 활용 및 실습 : DNN, CNN, RNN / Keras를 활용한 딥러닝 실습",
      "(12~마지막 주 차) 파이널 프로젝트",
    ],
  },
  {
    title: "명지전문대학",
    status: "졸업",
    startedAt: "2011.03",
    endedAt: "2014.02",
    addition: "문예창작과",
  },
  {
    title: "예산고등학교",
    status: "졸업",
    startedAt: "2008.03",
    endedAt: "2010.02",
  },
];
