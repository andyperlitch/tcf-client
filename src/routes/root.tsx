import { Background } from "@/components/background";
import { ModeToggle } from "@/components/ModeToggle";

export default function Root() {
  return (
    <>
      <Background />
      <div className="flex flex-col items-center justify-center h-screen relative z-[2]">
        <div className="absolute bottom-2 left-2">
          <ModeToggle />
        </div>
        <h1 className="text-6xl dark:bg-[url('/logo_with_text.svg')] bg-[url('/logo_with_text_light.svg')] bg-top bg-no-repeat bg-contain text-transparent mb-4 w-[300px] h-[300px] opacity-[0.8] relative right-4">
          The Casual Funk
        </h1>
        <h2 className="text-5xl mb-8 font-hand">📍 Santa Cruz, CA</h2>
        <h3 className="text-4xl font-hand">
          <a href="https://www.instagram.com/thecasualfunk/" target="_blank">
            @TheCasualFunk
          </a>
        </h3>
      </div>
      <div id="detail"></div>
    </>
  );
}
