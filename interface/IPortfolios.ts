import { ITechStacks } from "interface/ITechStacks";

export declare namespace IPortfolios {
  export interface Payload {
    title: string;
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
