export declare namespace ITechStacks {
  export interface Payload {
    fields?: StackList[];
  }

  export type Field = "Front" | "Back" | "ETC";

  export interface StackList {
    type?: Field;
    stackAndDescriptions?: StackDescriptions[];
  }

  export interface StackDescriptions {
    stack: string;
    descriptions?: string[];
  }
}
