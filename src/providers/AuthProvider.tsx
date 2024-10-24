import { AuthContext } from "@/contexts/AuthContext";
import { User, useWhoamiQuery } from "@/gql/graphql";
import useLocalStorage from "use-local-storage";

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
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
