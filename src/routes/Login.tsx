import { Input } from "@/components/ui/input";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { LoginMutation, LoginMutationVariables, Role } from "@/gql/graphql";
import { useNavigate } from "react-router-dom";

const USE_LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
      username
      role
    }
  }
`;

const HOME_ROUTES: Record<Role, string> = {
  ADMIN: "/admin",
  BANDMATE: "/bandmate",
  ANON: "/",
};

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(USE_LOGIN_MUTATION);

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
      console.log("Result", result);

      if (result.data?.login) {
        // use react-router to route to the home page based on the user's role
        navigate(HOME_ROUTES[result.data.login.role]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative z-[2] min-h-screen">
      <h1 className="text-3xl mb-4">Login</h1>
      <form onSubmit={doLogin} className="text-center">
        {error && <div className="text-red-500 mb-3">{error.message}</div>}
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
