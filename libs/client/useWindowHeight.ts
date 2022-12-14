import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (typeof window !== undefined) {
      setHeight(window.outerHeight);
    }
  }, [height]);
  return height;
}
