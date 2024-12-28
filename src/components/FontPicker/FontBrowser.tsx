import FontPickerTs from "react-fontpicker-ts";
import { useState } from "react";
import { Button } from "../ui/button";

const FONT_CATEGORIES = [
  { value: "all", label: "All" },
  { value: "serif", label: "Serif" },
  { value: "sans-serif", label: "Sans-serif" },
  { value: "display", label: "Display" },
  { value: "handwriting", label: "Handwriting" },
  { value: "monospace", label: "Monospace" },
];

export function FontBrowser({
  onSubmit,
}: {
  onSubmit: (font: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>(["all"]);
  const [selectedFont, setSelectedFont] = useState<string>();

  console.log(`andy selectedCategory`, selectedCategory);

  return (
    <div className="flex flex-col gap-2">
      <div data-name="FONT_CATEGORIES" className="flex flex-wrap">
        {FONT_CATEGORIES.map((category) => (
          <div key={category.value} className="w-1/3 p-1">
            <Button
              variant={`${
                selectedCategory.includes(category.value)
                  ? "default"
                  : "outline"
              }`}
              className="w-full"
              onClick={() =>
                setSelectedCategory((prev) => {
                  if (category.value === "all") {
                    return ["all"];
                  }
                  const isAlreadySelected = prev.includes(category.value);
                  if (isAlreadySelected) {
                    const newSelected = prev.filter(
                      (c) => c !== category.value
                    );
                    if (newSelected.length === 0) {
                      return ["all"];
                    }
                    return newSelected;
                  }
                  return [...prev, category.value].filter((c) => c !== "all");
                })
              }
            >
              {category.label}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <FontPickerTs
            value={setSelectedFont}
            fontCategories={
              selectedCategory.length > 0 && selectedCategory[0] !== "all"
                ? selectedCategory
                : undefined
            }
          />
        </div>
        <Button
          size="sm"
          onClick={() => selectedFont && onSubmit(selectedFont)}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
