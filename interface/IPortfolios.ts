import { ITechStacks } from "interface/ITechStacks";

export declare namespace IPortfolios {
  export interface Payload {
    title: string;
    classify: "개인" | "팀";
    people?: number;
    createdAt: string;
    lastUpdated?: string;
    github: string;
    deploy?: string;
    stacks: ITechStacks.StackDescriptions[];
    description: string;
    issues: IssueDetail[];
  }

  export interface IssueDetail {
    issue: string;
    solution: string;
  }
}
