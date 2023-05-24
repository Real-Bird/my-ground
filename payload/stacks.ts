import { ITechStacks } from "interface/ITechStacks";

export const stacks: ITechStacks.Payload = {
  main: {
    languages: [
      { stack: "HTML5", color: "E34F26" },
      { stack: "CSS3", color: "1572B6" },
      { stack: "JavaScript", color: "F7DF1E" },
      { stack: "TypeScript", color: "3178C6" },
    ],
    librariesAndFrameworks: [
      { stack: "React", color: "61DAFB" },
      { stack: "Next.js", color: "000000" },
      { stack: "Styled Components", color: "DB7093" },
      { stack: "Tailwind CSS", color: "06B6D4" },
    ],
    tools: [
      { stack: "Visual Studio Code", color: "007ACC" },
      { stack: "Git", color: "F05032" },
      { stack: "Github", color: "181717" },
    ],
  },
  sub: {
    languages: [{ stack: "Sass", color: "CC6699" }],
    librariesAndFrameworks: [
      { stack: "Prisma", color: "2D3748" },
      { stack: "Node.js", color: "339933" },
      { stack: "Express", color: "000000" },
      { stack: "Passport", color: "34E27A" },
      { stack: "Zxing Library", color: "ffffff" },
    ],
    tools: [{ stack: "PlanetScale", color: "000000" }],
  },
  knowledge: {
    languages: [
      { stack: "Java", color: "4b7696" },
      { stack: "Python", color: "3776AB" },
    ],
    librariesAndFrameworks: [
      { stack: "Tensorflow", color: "FF6F00" },
      { stack: "Django", color: "092E20" },
      { stack: "OpenCV", color: "5C3EE8" },
      { stack: "Bootstrap", color: "7952B3" },
    ],
    tools: [
      { stack: "MongoDB", color: "47A248" },
      { stack: "FireBase", color: "FFCA28" },
    ],
  },
};

const template = { stack: "", color: "" };
