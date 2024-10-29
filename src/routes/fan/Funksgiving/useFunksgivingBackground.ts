import { useEffect } from "react";

export function useFunksgivingBackground() {
  useEffect(() => {
    const body = window.document.body;
    const originalClassName = body.className;
    body.className = "";
    body.classList.add("bg-[url('/funksgiving-fan-bg.png')]");
    body.classList.add("bg-contain");
    body.classList.add("bg-repeat-y");
    body.classList.add("bg-[position:0_0]");

    return () => {
      body.className = originalClassName;
    };
  }, []);
}
