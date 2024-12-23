export function stripTypename<T extends { __typename?: string }>(
  obj: T
): Omit<T, "__typename"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, ...rest } = obj;
  return rest;
}
