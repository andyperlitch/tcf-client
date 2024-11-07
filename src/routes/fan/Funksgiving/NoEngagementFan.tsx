export function NoEngagementFan() {
  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center justify-center space-y-10
      `}
    >
      <img
        className=""
        src="/funksgiving-fan-title.png"
        style={{ width: "90vw" }}
      />
      {/* top right logo and text */}
      <div className="flex flex-col space-y-8">
        <p className="relative text-center font-hand text-5xl text-yellow-100">
          ...an evening with
        </p>
        <img src="/logo_with_text.svg" style={{ width: "80vw" }} />
      </div>
    </div>
  );
}
