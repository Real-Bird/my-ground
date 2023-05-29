import { createContext, type Dispatch } from "react";

export const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: Dispatch<"light" | "dark">;
}>({ theme: "light", setTheme: () => null });
