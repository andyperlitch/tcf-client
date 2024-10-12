export type PropsWithClassName<T = Record<string, never>> = T & {
  className?: string;
};

export type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];
