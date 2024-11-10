import { ModeToggle } from "@/components/ModeToggle";
import { useAuth } from "@/hooks/useAuth";
import { SetListPicker } from "@/components/SetListPicker";
import { hasRole } from "@/utils/hasRole";
import { Role } from "@/gql/graphql";
import { FunksgivingInfo } from "./FunksgivingInfo";
import { useFontLoader } from "@/hooks/useFontLoader";

export default function Home() {
  const { user } = useAuth();
  const isFontLoaded = useFontLoader({ fonts: ["Just Another Hand"] });
  return (
    <>
      <ModeToggle />
      {hasRole(user, [Role.Admin, Role.Bandmate]) && <SetListPicker />}
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
            relative right-4 mb-4 h-[300px] w-[300px]
            bg-[url('/logo_with_text_light.svg')] bg-contain bg-top bg-no-repeat
            text-6xl text-transparent opacity-[0.8]

            dark:bg-[url('/logo_with_text.svg')]
          `}
        >
          The Casual Funk
        </h1>

        <h2
          data-name="SANTA-CRUZ"
          className="relative -top-16 font-hand text-2xl"
        >
          📍 Santa Cruz, CA
        </h2>

        {<FunksgivingInfo />}

        <div
          data-name="BOTTOM-INFO"
          className={`
            fixed bottom-2 flex h-[6vh] max-h-10 w-screen items-center
            justify-center space-x-8
          `}
        >
          <h3
            data-name="INSTAGRAM"
            className={`
              flex items-baseline justify-center space-x-2 font-hand text-2xl
            `}
          >
            <a
              href="https://www.instagram.com/thecasualfunk/"
              target="_blank"
              className={`inline-flex items-baseline justify-center space-x-1`}
            >
              <img
                src="/insta.png"
                className="flex-0"
                style={{ width: "1.3rem" }}
              />
              <span
                className={`
                  hidden

                  md:inline
                `}
              >
                @TheCasualFunk
              </span>
            </a>
          </h3>
          <h3
            data-name="FACEBOOK"
            className={`
              flex items-baseline justify-center space-x-2 font-hand text-2xl
            `}
          >
            <a
              href="https://www.facebook.com/people/The-Casual-Funk/61564085013918/?_rdr"
              target="_blank"
              className={`inline-flex items-baseline justify-center space-x-1`}
            >
              <img src="/facebook.png" style={{ width: "1.3rem" }} />
              <span
                className={`
                  hidden

                  md:inline
                `}
              >
                Facebook Page
              </span>
            </a>
          </h3>
        </div>
      </div>
      <div id="detail"></div>
    </>
  );
}
