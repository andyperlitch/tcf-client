export function keyBy<T>(arr: T[], key: keyof T) {
  return arr.reduce((acc, item) => {
    const k = String(item[key]);
    acc[k] = item;
    return acc;
  }, {} as Record<string, T>);
}
