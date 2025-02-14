import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/gql/graphql";

const HOME_ROUTES: Record<Role, string> = {
  ADMIN: "/admin",
  BANDMATE: "/bandmate",
  ANON: "/",
};

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, logout, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateEmailOrUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrUsername(e.target.value);
  };
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const doLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(emailOrUsername, password);
    setLoading(false);
    if (success) {
      // check for redirect param
      const redirect = searchParams.get("redirect");
      if (redirect) {
        navigate(redirect);
      } else {
        navigate(HOME_ROUTES[user?.role || "ANON"]);
      }
    }
  };

  const doLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    // refresh the page
    window.location.reload();
  };

  return (
    <div
      className={`
        relative z-[2] flex min-h-screen flex-col items-center justify-center
      `}
    >
      {user ? (
        <div>
          <h1 className="mb-4 text-xl">
            Logged in as {user.name || user.username || user.email}
          </h1>
          <Button onClick={doLogout} disabled={loading}>
            Logout
          </Button>
        </div>
      ) : (
        <>
          <h1 className="mb-4 text-3xl">Login</h1>
          <form onSubmit={doLogin} className={`text-center`}>
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
        </>
      )}
    </div>
  );
}
