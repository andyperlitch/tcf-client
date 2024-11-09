import { ModeToggle } from "@/components/ModeToggle";
import { useAuth } from "@/hooks/useAuth";
import { SetListPicker } from "@/components/SetListPicker";
import { hasRole } from "@/utils/hasRole";
import { Role } from "@/gql/graphql";

export default function Root() {
  const { user } = useAuth();
  return (
    <>
      <ModeToggle />
      {hasRole(user, [Role.Admin, Role.Bandmate]) && <SetListPicker />}
      <div
        className={`
          relative z-[2] flex min-h-screen flex-col items-center justify-center
        `}
      >
        <h1
          className={`
            relative right-4 mb-4 h-[300px] w-[300px]
            bg-[url('/logo_with_text_light.svg')] bg-contain bg-top bg-no-repeat
            text-6xl text-transparent opacity-[0.8]

            dark:bg-[url('/logo_with_text.svg')]
          `}
        >
          The Casual Funk
        </h1>
        <h2 className="mb-8 font-hand text-5xl">📍 Santa Cruz, CA</h2>
        <h3 className="font-hand text-4xl">
          <a href="https://www.instagram.com/thecasualfunk/" target="_blank">
            @TheCasualFunk
          </a>
        </h3>
      </div>
      <div id="detail"></div>
    </>
  );
}
