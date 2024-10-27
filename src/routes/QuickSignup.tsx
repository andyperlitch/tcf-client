import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFanSignupMutation, useRandomNameLazyQuery } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

export function QuickSignup() {
  const [searchParams] = useSearchParams();
  const { user, setUser } = useAuth();
  const [nickname, setNickname] = useState("");
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const [signup, { loading }] = useFanSignupMutation();

  const [fetchNewNickname] = useRandomNameLazyQuery({
    onCompleted: (data) => {
      setNickname(data.randomName);
      setTimeout(() => {
        nicknameInputRef.current?.focus();
        nicknameInputRef.current?.select();
      });
    },
  });

  useEffect(() => {
    fetchNewNickname();
  }, [fetchNewNickname]);

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
      <div className="flex w-full justify-center space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => fetchNewNickname({ fetchPolicy: "no-cache" })}
        >
          Suggest another
        </Button>
        <Button
          size="lg"
          variant="constructive"
          onClick={doSignup}
          disabled={nickname === "" || loading}
        >
          Looks good
        </Button>
      </div>
    </div>
  );
}
