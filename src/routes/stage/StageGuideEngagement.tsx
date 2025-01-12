import { useMemo } from "react";

export function StageGuideEngagement() {
  const extendedAreaStyle = useMemo(
    () => ({
      boxShadow: "inset 0 0 0 3px steelblue",
      backgroundColor: "rgba(70, 130, 180, 0.2)",
    }),
    []
  );

  const mainAreaStyle = useMemo(
    () => ({
      boxShadow: "#c7a21c 0px 0px 0px 3px inset",
      backgroundColor: "rgb(215 171 31 / 50%)",
    }),
    []
  );

  return (
    <div
      data-name="STAGE_GUIDE_ENGAGEMENT"
      className={`absolute flex h-full w-full flex-col items-stretch`}
    >
      <div
        data-name="STAGE_GUIDE_EXTENDED_ENGAGEMENT_AREA"
        className={`flex h-[10vh] flex-0 flex-col items-center justify-center`}
        style={extendedAreaStyle}
      >
        <div className="text-center">Extended Engagement Area</div>
      </div>
      <div
        data-name="STAGE_GUIDE_MAIN_ENGAGEMENT_AREA"
        className={`flex flex-1 flex-col items-center justify-center`}
        style={mainAreaStyle}
      >
        <div className="text-center">Main Engagement Area</div>
      </div>
    </div>
  );
}
