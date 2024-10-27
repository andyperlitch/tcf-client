import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFanSignupMutation, useRandomNameQuery } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { useRef, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

export function QuickSignup() {
  const [searchParams] = useSearchParams();
  const { user, setUser } = useAuth();
  const [nickname, setNickname] = useState("");
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const [signup, { loading }] = useFanSignupMutation();

  useRandomNameQuery({
    skip: nickname !== "",
    onCompleted: (data) => {
      if (nickname === "") {
        setNickname(data.randomName);
        setTimeout(() => {
          nicknameInputRef.current?.focus();
          nicknameInputRef.current?.select();
        });
      }
    },
  });

  function updateNickname(e: React.ChangeEvent<HTMLInputElement>) {
    setNickname(e.target.value);
  }

  function doSignup() {
    signup({
      variables: {
        data: {
          name: nickname,
        },
      },
    }).then((result) => {
      if (result.data?.signup) {
        setUser(result.data.signup);
      }
    });
  }

  if (user) {
    return <Navigate to={searchParams.get("returnUrl") || "/"} />;
  }
  return (
    <div
      className={`
        mx-auto flex h-screen max-w-md flex-col items-center justify-start
        space-y-4 p-8 pt-24
      `}
    >
      <h1 className="mb-0 font-hand text-5xl font-bold">
        You'll need a nickname...
      </h1>
      <Input
        ref={nicknameInputRef}
        value={nickname}
        onChange={updateNickname}
        className="pb-8 pt-8 text-center text-xl"
      />
      <Button
        size="lg"
        onClick={doSignup}
        disabled={nickname === "" || loading}
      >
        Proceed
      </Button>
    </div>
  );
}
