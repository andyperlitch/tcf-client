import { useEffect } from "react";

export function useFunksgivingBackground() {
  useEffect(() => {
    const body = window.document.body;
    const originalClassName = body.className;
    body.className = "";
    body.classList.add("bg-[url('/funksgiving-stage-bg.png')]");
    body.classList.add("bg-cover");
    body.classList.add("bg-[position:0_0]");

    return () => {
      body.className = originalClassName;
    };
  }, []);
}
