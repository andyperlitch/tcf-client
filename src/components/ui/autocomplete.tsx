import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function Autocomplete<
  TItem extends { value: string; label: string; keywords?: string[] }
>({
  items,
  searchValue,
  onSearchValueChange,
  open,
  setOpen,
  onSelect,
  value,
  placeholder,
  searchPlaceholder,
  filterFn = (_value, _search, _keywords) => {
    const value = _value.toLowerCase();
    const search = _search.toLowerCase();
    const keywords = _keywords?.map((keyword) => keyword.toLowerCase());
    if (
      value.includes(search) ||
      keywords?.some((keyword) => keyword.includes(search))
    ) {
      return 1;
    }
    return 0;
  },
}: {
  items: TItem[];
  onSelect: (item: TItem, currentValue: string) => void;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  value?: TItem | null;
  placeholder?: string;
  searchPlaceholder?: string;
  // the type of the prop `filter` on the `Command` component
  filterFn?: (value: string, search: string, keywords?: string[]) => number;
}) {
  const [internalSearchValue, setInternalSearchValue] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);

  const currentSearchValue = searchValue ?? internalSearchValue;
  const isOpen = open ?? internalOpen;
  const handleOpenChange = (newOpen: boolean) => {
    setOpen?.(newOpen);
    if (open === undefined) {
      setInternalOpen(newOpen);
    }
  };

  const handleSearchValueChange = (value: string) => {
    onSearchValueChange?.(value);
    if (!searchValue) {
      setInternalSearchValue(value);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[200px] justify-between"
        >
          {value?.label || placeholder || "search..."}
          <CaretSortIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command filter={filterFn}>
          <CommandInput
            placeholder={searchPlaceholder ?? "search..."}
            className="h-9"
            value={currentSearchValue}
            onValueChange={handleSearchValueChange}
          />
          <CommandList>
            <CommandEmpty>Nothing found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  keywords={item.keywords}
                  onSelect={(currentValue) => {
                    onSelect(item, currentValue);
                    // if open is not controlled, close the popover
                    if (open === undefined) {
                      setInternalOpen(false);
                    }
                  }}
                >
                  {item.label}
                  <CheckIcon
                    className={`
                      ml-auto

                      ${
                        value?.value === item.value
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    `}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
