import { ModeToggle } from "@/components/ModeToggle";
import { useAuth } from "@/hooks/useAuth";
import { GigPicker } from "@/components/GigPicker";
import { hasRole } from "@/utils/hasRole";
import { Role } from "@/gql/graphql";
import { useFontLoader } from "@/hooks/useFontLoader";
import { useInView } from "@/hooks/useInView";
import styles from "./stretch.module.css";
import { createContext, useContext, useRef, useState } from "react";
import { ScrollDownIndicator } from "@/components/ScrollDownIndicator/ScrollDownIndicator";
import { useImageLoader } from "@/hooks/useImageLoader";
import socialBtnStyles from "./socialButtons.module.css";
// import { EventInfo } from "./EventInfo";

export default function JapanHomePage() {
  const { user } = useAuth();
  const isFontLoaded = useFontLoader({ fonts: ["Just Another Hand"] });
  const { imageLoaded } = useImageLoader({
    url: "/jp_logo.svg",
  });
  return (
    <>
      <ModeToggle />
      {hasRole(user, [Role.Admin, Role.Bandmate]) && <GigPicker />}
      <div
        data-name="MAIN-CONTENT"
        className={`
          relative z-[2] mx-auto flex min-h-screen max-w-screen-md flex-col
          items-center justify-center

          ${isFontLoaded ? "opacity-100" : "opacity-0"}

          transition-opacity duration-1000
        `}
      >
        <h1
          data-name="LOGO"
          className={`
            relative left-3 mb-[10vh] mt-[30vh] h-[200px] w-[300px]
            bg-[url('/jp_logo.svg')] bg-contain bg-top bg-no-repeat text-6xl
            text-transparent

            ${imageLoaded ? "opacity-[0.8]" : "opacity-0"}

            dark:bg-[url('/jp_logo.svg')]
          `}
        >
          The Casual Funk
        </h1>

        <ScrollDownIndicator />

        <JapaneseMessage />

        <SocialButtons />
      </div>
      <div id="detail"></div>
    </>
  );
}

const AnimatedText = ({
  children,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  const { ref } = useInView({
    onVisible: () => {
      console.log(
        `andy activeAnimationsRef.current`,
        activeAnimationsRef.current
      );
      const delay = activeAnimationsRef.current * 1000;
      increment();
      setTimeout(() => {
        setAddAnimation(true);
        setTimeout(() => {
          decrement();
        }, 1000);
      }, delay);
    },
  });
  const { increment, decrement, activeAnimationsRef } = useAnimatedText();

  const [addAnimation, setAddAnimation] = useState(false);

  return (
    <span
      ref={ref}
      className={`
        ${addAnimation ? styles.stretch : ""}

        inline-block
      `}
      // style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
};

const JapaneseMessage = () => {
  const startDelay = 3;
  return (
    <AnimatedTextProvider>
      <p className="px-6 text-center text-4xl leading-loose">
        カリフォルニア州サンタクルーズより
        <AnimatedText delay={startDelay}>ご挨拶</AnimatedText>
        申し上げます。 私たちは
        <AnimatedText delay={startDelay + 3}>謙虚な気持ち</AnimatedText>
        で音楽に向き合うファンクバンドです。 現在、
        <AnimatedText delay={startDelay + 6}>少しずつ</AnimatedText>
        自分たちの音楽を磨き、
        <AnimatedText delay={startDelay + 9}>レパートリー</AnimatedText>
        を広げている最中です。 まだ
        <AnimatedText delay={startDelay + 12}>始まったばかり</AnimatedText>
        のバンドではございますが、 いつか
        <AnimatedText delay={startDelay + 15}>日本をツアー</AnimatedText>し、
        <AnimatedText delay={startDelay + 18}>言葉や国境を超えて</AnimatedText>
        人々と
        <AnimatedText delay={startDelay + 21}>素晴らしい音楽</AnimatedText>
        を分かち合うことが私たちの
        <AnimatedText delay={startDelay + 24}>夢</AnimatedText>のひとつです。
      </p>
    </AnimatedTextProvider>
  );
};

const AnimatedTextContext = createContext<{
  activeAnimationsRef: React.MutableRefObject<number>;
  increment: () => void;
  decrement: () => void;
}>({
  activeAnimationsRef: { current: 0 },
  increment: () => {},
  decrement: () => {},
});

const AnimatedTextProvider = ({ children }: { children: React.ReactNode }) => {
  const activeAnimationsRef = useRef(0);
  const increment = () => activeAnimationsRef.current++;
  const decrement = () => activeAnimationsRef.current--;
  return (
    <AnimatedTextContext.Provider
      value={{ activeAnimationsRef: activeAnimationsRef, increment, decrement }}
    >
      {children}
    </AnimatedTextContext.Provider>
  );
};

function useAnimatedText() {
  const { activeAnimationsRef, increment, decrement } =
    useContext(AnimatedTextContext);
  return { activeAnimationsRef, increment, decrement };
}

const INSTAGRAM_URL = "https://www.instagram.com/thecasualfunk/";
const FACEBOOK_URL =
  "https://www.facebook.com/p/The-Casual-Funk-61564085013918/";

const YOUTUBE_URL = "https://www.youtube.com/@TheCasualFunk";
function SocialButtons() {
  return (
    <div className="mb-[10vh] mt-[30vh] flex flex-col gap-8">
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        className={`
          ${socialBtnStyles.socialBtn}
          ${socialBtnStyles.instagram}
        `}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              fill="#ffffff"
            />
            <path
              d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
              fill="#ffffff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
              fill="#ffffff"
            />
          </g>
        </svg>
        <span>インスタをフォロー</span>
      </a>

      <a
        href={FACEBOOK_URL}
        target="_blank"
        className={`
          ${socialBtnStyles.socialBtn}
          ${socialBtnStyles.facebook}
        `}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
              fill="#ffffff"
            />
          </g>
        </svg>
        <span>フェイスブックでいいね！</span>
      </a>

      <a
        href={YOUTUBE_URL}
        target="_blank"
        className={`
          ${socialBtnStyles.socialBtn}
          ${socialBtnStyles.youtube}
        `}
      >
        <svg
          width="24"
          height="24"
          fill="#ffffff"
          viewBox="0 -4 32 32"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M30.722,20.579 C30.137,21.894 28.628,23.085 27.211,23.348 C27.066,23.375 23.603,24.000 16.010,24.000 L15.990,24.000 C8.398,24.000 4.932,23.375 4.788,23.349 C3.371,23.085 1.861,21.894 1.275,20.578 C1.223,20.461 0.001,17.647 0.001,12.000 C0.001,6.353 1.223,3.538 1.275,3.421 C1.861,2.105 3.371,0.915 4.788,0.652 C4.932,0.625 8.398,-0.000 15.990,-0.000 C23.603,-0.000 27.066,0.625 27.210,0.651 C28.628,0.915 30.137,2.105 30.723,3.420 C30.775,3.538 32.000,6.353 32.000,12.000 C32.000,17.647 30.775,20.461 30.722,20.579 ZM28.893,4.230 C28.581,3.529 27.603,2.759 26.845,2.618 C26.813,2.612 23.386,2.000 16.010,2.000 C8.615,2.000 5.185,2.612 5.152,2.618 C4.394,2.759 3.417,3.529 3.104,4.234 C3.094,4.255 2.002,6.829 2.002,12.000 C2.002,17.170 3.094,19.744 3.106,19.770 C3.417,20.471 4.394,21.241 5.153,21.382 C5.185,21.388 8.615,22.000 15.990,22.000 L16.010,22.000 C23.386,22.000 26.813,21.388 26.846,21.382 C27.604,21.241 28.581,20.471 28.894,19.766 C28.904,19.744 29.998,17.170 29.998,12.000 C29.998,6.830 28.904,4.255 28.893,4.230 ZM13.541,17.846 C13.379,17.949 13.193,18.000 13.008,18.000 C12.842,18.000 12.676,17.959 12.525,17.875 C12.206,17.699 12.008,17.364 12.008,17.000 L12.008,7.000 C12.008,6.637 12.204,6.303 12.521,6.127 C12.838,5.950 13.227,5.958 13.534,6.149 L21.553,11.105 C21.846,11.286 22.026,11.606 22.027,11.951 C22.028,12.296 21.852,12.618 21.560,12.801 L13.541,17.846 ZM14.009,8.794 L14.009,15.189 L19.137,11.963 L14.009,8.794 Z" />
          </g>
        </svg>
        <span>チャンネル登録</span>
      </a>
    </div>
  );
}
