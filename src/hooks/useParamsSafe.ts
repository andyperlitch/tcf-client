import { useParams } from "react-router-dom";

// Helper type to map expectedParams to a record with string values
type ParamsFromKeys<K extends string[]> = { [Key in K[number]]: string };

/**
 * Hook to get params from the URL and check if they exist.
 * If any of the expected params are not found, it will throw an error.
 * @param expectedParams - An array of strings representing the expected params in the URL.
 * @returns An object with the expected params as keys and their values as values.
 * @throws An error if any of the expected params are not found in the URL.
 */
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
