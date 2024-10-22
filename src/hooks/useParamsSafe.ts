import { useParams } from "react-router-dom";

// Helper type to map expectedParams to a record with string values
type ParamsFromKeys<K extends string[]> = { [Key in K[number]]: string };

export function useParamsSafe<T extends string[]>(
  ...expectedParams: T
): ParamsFromKeys<T> {
  const allParams = useParams();

  // Check if all expectedParams exist in useParams()
  for (const expectedParam of expectedParams) {
    if (!allParams[expectedParam]) {
      throw new Error(
        `useParamsSafe: Did not find param ${expectedParam} in URL`
      );
    }
  }

  // Cast and return with the expected shape
  return allParams as ParamsFromKeys<T>;
}
