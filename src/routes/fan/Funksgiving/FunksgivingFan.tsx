import { CodeBlock } from "@/components/CodeBlock";
import { useFanEvent } from "@/hooks/useFanEvent";
import { useEffect } from "react";

export function FunksgivingFanScreen() {
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

  const { data } = useFanEvent("funksgiving");

  return (
    <div>
      <h1
        className={`
          m-4 h-12 bg-[url('/funksgiving-fan-title.png')] bg-contain bg-center
          bg-no-repeat -indent-[1000px] text-4xl font-bold
        `}
      >
        Funksgiving
      </h1>
      {/* <CodeBlock json={data} /> */}
    </div>
  );
}
