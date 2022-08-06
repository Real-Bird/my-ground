import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Footer() {
  const router = useRouter();
  useEffect(() => {
    const footer = document.querySelector("footer");
    const body = document.querySelector("body");
    const layout = document.getElementById("layout");
    if (footer.offsetHeight + body.offsetHeight >= window.outerHeight) {
      footer.style.top = `${layout.clientHeight}px`;
    } else {
      footer.style.bottom = "0px";
    }
  }, [router]);
  return (
    <footer className="absolute hidden max-h-40 min-h-[5rem] w-full items-center justify-center bg-amber-500 xl:flex">
      <div>&copy; 2022.07 My Ground by Real-Bird</div>
    </footer>
  );
}
