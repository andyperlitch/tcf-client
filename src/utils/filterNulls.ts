export function filterNulls<T extends Record<string, unknown>>(
  data: T
): { [K in keyof T]: Exclude<T[K], null> } {
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== null)
  ) as { [K in keyof T]: Exclude<T[K], null> };
}
