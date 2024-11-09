import { Role } from "@/gql/graphql";

import { User } from "@/gql/graphql";

export function hasRole(
  user: Partial<User> | null | undefined,
  roleOrRoles: Role | Role[]
): boolean {
  const roles = ([] as Role[]).concat(roleOrRoles);
  return Boolean(user && user.role && roles.includes(user.role));
}
