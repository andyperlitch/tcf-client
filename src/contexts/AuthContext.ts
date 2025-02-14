import { User } from "@/gql/graphql";
import { createContext } from "react";

export interface AuthContextType {
  user: User | null;
  logout: () => Promise<boolean>;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  signup: (name: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => false,
  login: async () => false,
  signup: async () => false,
});
