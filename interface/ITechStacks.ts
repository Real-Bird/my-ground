export declare namespace ITechStacks {
  export interface Payload {
    main: Classify;
    sub: Classify;
    knowledge: Classify;
  }

  export interface Classify {
    languages?: Stack[];
    librariesAndFrameworks?: Stack[];
    tools?: Stack[];
  }

  export interface Stack {
    stack: string;
    color: string;
  }
}
