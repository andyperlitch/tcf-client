import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useValidateGoogleFontLazyQuery } from "@/gql/graphql";

export function NamedFontInput({
  onSubmit,
  className = "",
}: {
  onSubmit: (font: string) => void;
  className?: string;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);

  const [validateGoogleFont] = useValidateGoogleFontLazyQuery();

  const handleSubmit = () => {
    setError(null);
    setValidating(true);

    validateGoogleFont({ variables: { fontName: value } })
      .then((res) => {
        if (res.data?.validateGoogleFont) {
          onSubmit(value);
          setValue("");
        } else {
          setError("Font not found");
        }
      })
      .catch(() => setError("Could not connect to Google Fonts"))
      .finally(() => setValidating(false));
  };

  return (
    <div
      className={`
        ${className}

        flex flex-col gap-2
      `}
    >
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Font Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button
          size="sm"
          disabled={validating}
          type="button"
          onClick={handleSubmit}
          className={`self-start`}
        >
          {validating ? "Validating..." : error ? "Try again" : "Add"}
        </Button>
      </div>
      {error && (
        <p className="text-[0.8rem] font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
