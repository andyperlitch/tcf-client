import { AuthContext } from "@/contexts/AuthContext";
import {
  User,
  useWhoamiQuery,
  useLogoutMutation,
  useLoginMutation,
  useFanSignupMutation,
} from "@/gql/graphql";
import { createLogger } from "@/utils/createLogger";
import { useCallback } from "react";
import useLocalStorage from "use-local-storage";

const logger = createLogger("AuthProvider");

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // trust...
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  // ...but verify
  useWhoamiQuery({
    onCompleted: (data) => {
      if (data.whoami) {
        setUser(data.whoami);
      } else {
        setUser(null);
      }
    },
    onError: () => {
      setUser(null);
    },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  const [logout] = useLogoutMutation();
  const [login] = useLoginMutation();
  const [signup] = useFanSignupMutation();

  const doLogout = useCallback(async () => {
    try {
      const result = await logout();
      if (result.data?.logout) {
        setUser(null);
        return true;
      } else {
        logger.error(
          `Logout failed. result.data: `,
          JSON.stringify(result.data, null, 2)
        );
        return false;
      }
    } catch (e) {
      logger.error(`Logout: error: `, e);
      return false;
    }
  }, [logout, setUser]);

  const doLogin = useCallback(
    async (emailOrUsername: string, password: string) => {
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
          return true;
        } else {
          logger.error(
            `Login: response from server not in expected format. result.data: `,
            JSON.stringify(result.data, null, 2)
          );
          return false;
        }
      } catch (e) {
        logger.error(`Login: error: `, e);
        return false;
      }
    },
    [login, setUser]
  );

  const doSignup = useCallback(
    async (name: string) => {
      try {
        const result = await signup({
          variables: {
            data: {
              name,
            },
          },
        });

        if (result.data?.signup) {
          setUser(result.data.signup);
          return true;
        } else {
          logger.error(
            `Signup: response from server not in expected format. result.data: `,
            JSON.stringify(result.data, null, 2)
          );
          return false;
        }
      } catch (e) {
        logger.error(`Signup: error: `, e);
        return false;
      }
    },
    [signup, setUser]
  );

  return (
    <AuthContext.Provider
      value={{ user, logout: doLogout, login: doLogin, signup: doSignup }}
    >
      {children}
    </AuthContext.Provider>
  );
}
