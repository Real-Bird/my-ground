import { IEducations } from "interface/IEducations";

export const educations: IEducations.Payload[] = [
  {
    title: "혁신성장 청년인재 양성교육 빅데이터 과정",
    status: "수료",
    startedAt: "2021.04",
    endedAt: "2021.10",
    addition: "한국생산성본부",
    details: [
      "Java, Python 기반 프로그래밍",
      "JSP, Django, HTML, CSS, JavaScript 기반 웹 프로그래밍",
      "Numpy, Pandas 활용 데이터 분석",
      "scikit-learn 활용 머신러닝",
      "tensorflow 활용 딥러닝",
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

const template = {
  title: "",
  startedAt: "",
  endedAt: "",
  addition: "",
  details: [""],
};
