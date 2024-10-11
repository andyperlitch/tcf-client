import { ModeToggle } from "@/components/ModeToggle";

export default function Root() {
  return (
    <>
      <div className="absolute inset-0 bg-[url('/logo.svg')] bg-[length:200%] bg-[position:100%_50%] bg-no-repeat opacity-[0.04] z-[1]" />
      <div className="flex flex-col items-center justify-center h-screen relative z-[2]">
        <div className="absolute bottom-2 left-2">
          <ModeToggle />
        </div>
        <h1 className="text-6xl bg-[url('/logo_with_text.svg')] bg-top bg-no-repeat bg-contain text-transparent mb-4 w-[300px] h-[300px] opacity-[0.8] relative right-4">
          The Casual Funk
        </h1>
        <h2 className="text-2xl mb-8">📍 Santa Cruz, CA</h2>
        <p>
          <a href="https://www.instagram.com/thecasualfunk/" target="_blank">
            @TheCasualFunk
          </a>
        </p>
      </div>
      <div id="detail"></div>
    </>
  );
}
