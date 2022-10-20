import { useEffect, useState } from "react";

type isWantedSize = boolean;
type SizeProps = number;

export default function useWindowSize(size: SizeProps = 1024) {
  const [preview, setPreview] = useState<isWantedSize>();
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    if (typeof window !== undefined) {
      setPreview(window.innerWidth >= size);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  return preview;
}
