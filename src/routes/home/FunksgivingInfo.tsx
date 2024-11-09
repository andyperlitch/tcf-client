import { useFontLoader } from "@/hooks/useFontLoader";
import styles from "./FunksgivingInfo.module.css";
import { isMobile } from "react-device-detect";

export function FunksgivingInfo() {
  const isFontLoaded = useFontLoader({ fonts: ["Just Another Hand"] });
  return (
    <div
      onClick={() => {
        window.open(
          "https://www.facebook.com/events/428755903589853/",
          "_blank"
        );
      }}
      data-name="FUNKSGIVING-INFO"
      className={`
        flex cursor-pointer flex-col items-center justify-center space-y-4
      `}
    >
      <div
        data-name="LEFT-RIGHT-CONTENT"
        className={`
          flex items-center justify-center

          ${styles.container}
        `}
      >
        <div data-name="LEFT-TEXT" className="flex-1">
          <h2
            className={`
              ${isMobile ? "pl-4 pr-4" : "pl-8 pr-8"}

              whitespace-nowrap text-right font-hand text-6xl transition-opacity

              ${isFontLoaded ? "opacity-100" : "opacity-0"}
              ${styles.fanOutHeading}
            `}
          >
            <span className="text-3xl">Come check us out on</span>
            <br />
            Nov. 23rd
          </h2>
        </div>
        <div data-name="RIGHT-IMAGE" className="flex-1">
          <div className="pl-8 pr-8">
            <img
              className={`
                ${styles.fanOutImage}
              `}
              src="/funksgiving-flyer.jpg"
              style={{ maxHeight: "25vh", maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
      <div
        data-name="CTA"
        className={`
          font-hand text-3xl opacity-0

          ${styles.cta}
        `}
      >
        ({isMobile ? "tap" : "click"} for the event page)
      </div>
    </div>
  );
}
