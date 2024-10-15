import { AuthContext } from "@/contexts/AuthContext";
import { User } from "@/gql/graphql";
import useLocalStorage from "use-local-storage";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
