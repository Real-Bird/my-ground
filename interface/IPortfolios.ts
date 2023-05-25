import { ITechStacks } from "interface/ITechStacks";

export declare namespace IPortfolios {
  export interface Payload {
    title: string;
    classify: "개인" | "팀";
    people?: number;
    createdAt: string;
    lastUpdated?: string;
    summary: string;
    github: string;
    deploy?: string;
    stacks: ITechStacks.Stack[];
    details: Detail[];
  }

  export type Detail = string;
}
