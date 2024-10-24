import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Role, useLoginMutation } from "@/gql/graphql";

const HOME_ROUTES: Record<Role, string> = {
  ADMIN: "/admin",
  BANDMATE: "/bandmate",
  ANON: "/",
};

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser, user } = useAuth();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useLoginMutation();

  const updateEmailOrUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrUsername(e.target.value);
  };
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const doLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login({
        variables: {
          emailOrUsername,
          password,
        },
      });

      if (result.data?.login) {
        // set the user in the auth context
        setUser(result.data.login);
      } else {
        throw new Error(`Login: response from server not in expected format`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user && user.role) {
      navigate(searchParams.get("redirect") || HOME_ROUTES[user.role]);
    }
  }, [navigate, searchParams, user]);

  return (
    <div
      className={`
        relative z-[2] flex min-h-screen flex-col items-center justify-center
      `}
    >
      <h1 className="mb-4 text-3xl">Login</h1>
      <form onSubmit={doLogin} className="text-center">
        {error && <div className="mb-3 text-red-500">{error.message}</div>}
        <Input
          className="mb-3"
          type="text"
          value={emailOrUsername}
          placeholder="Email or Username"
          onChange={updateEmailOrUsername}
        />
        <Input
          className="mb-3"
          type="password"
          value={password}
          placeholder="Password"
          onChange={updatePassword}
        />
        <Button type="submit" disabled={loading}>
          Login
        </Button>
      </form>
    </div>
  );
}
