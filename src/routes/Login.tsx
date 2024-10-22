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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useLoginMutation();

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const doLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login({
        variables: {
          email: username,
          password,
        },
      });

      if (result.data?.login) {
        // set the user in the auth context
        setUser(result.data.login);
      } else {
        throw new Error(`response data: ${JSON.stringify(result.data)}`);
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
          value={username}
          placeholder="Username"
          onChange={updateUsername}
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
