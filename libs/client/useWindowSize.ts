import { useEffect, useState } from "react";

type WindowSize = boolean;

export default function useWindowSize() {
  const [preview, setPreview] = useState<WindowSize>(false);
  const handleResize = () => {
    setPreview(window.innerWidth >= 1280 ? true : false);
  };
  useEffect(() => {
    setPreview(window.innerWidth >= 1280 ? true : false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return preview;
}
