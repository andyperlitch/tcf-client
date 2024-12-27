import { useCallback } from "react";
import { Input, InputProps } from "./input";

export function NumberInput<T>({
  value,
  fromValue = (value: T) => Number(value),
  toValue = (value: number) => value as T,
  onChange,
  className,
  ...props
}: {
  value: T;
  fromValue?: (value: T) => number;
  toValue?: (value: number) => T;
  onChange: (value: T) => void;
  className?: string;
} & Omit<InputProps, "type" | "onChange">) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(toValue(Number(e.target.value))),
    [onChange, toValue]
  );

  return (
    <Input
      type="number"
      value={fromValue(value)}
      onChange={handleChange}
      className={className}
      {...props}
    />
  );
}
