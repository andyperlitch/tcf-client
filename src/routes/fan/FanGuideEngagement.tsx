import { useMemo } from "react";

export function FanGuideEngagement() {
  const mainAreaStyles = useMemo(
    () => ({
      boxShadow: "#c7a21c 0px 0px 0px 3px inset",
      backgroundColor: "rgb(215 171 31 / 50%)",
    }),
    []
  );

  return (
    <div
      className={`flex h-[83vh] w-full flex-col items-stretch justify-center`}
    >
      <div
        data-name="FAN_GUIDE_MAIN_ENGAGEMENT_AREA"
        style={mainAreaStyles}
        className={`flex flex-1 flex-col items-center justify-center`}
      >
        Main Engagement Area
      </div>
    </div>
  );
}
