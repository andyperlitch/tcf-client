import { Input } from "@/components/ui/input";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
    }
  }
`;

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  console.log(`andy data, loading, error`, data, loading, error);

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
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative z-[2] min-h-screen">
      <h1 className="text-3xl mb-4">Login</h1>
      <form onSubmit={doLogin} className="text-center">
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
