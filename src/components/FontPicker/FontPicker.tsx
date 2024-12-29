import "react-fontpicker-ts/dist/index.css";
import "./FontPicker.css";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FontBrowser } from "./FontBrowser";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";
import {
  Cross2Icon,
  FontFamilyIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useCallback, useState } from "react";
import { NamedFontInput } from "./NamedFontInput";

interface Props {
  label?: string;
  title?: string;
  description?: string;
  value: string[] | null | undefined;
  onChange: (value: string[] | null | undefined) => void;
}

export function FontPicker({
  label,
  title = "Select Fonts",
  description = "Select the google fonts you want to use.",
  value,
  onChange,
}: Props) {
  const [internalValue, setInternalValue] = useState<string[]>(value || []);
  const [open, setOpen] = useState(false);

  const handleAddFont = useCallback((font: string) => {
    setInternalValue((prev) => {
      if (prev.includes(font)) return prev;
      return [...prev, font];
    });
  }, []);

  const handleRemoveFont = useCallback((font: string) => {
    setInternalValue((prev) => prev.filter((f) => f !== font));
  }, []);

  return (
    <div data-name="FONT_PICKER" className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <div title={title}>
              <FontFamilyIcon className="size-6" />
            </div>
            <Input type="text" value={(value || []).join(",")} readOnly />
            <Button size="sm" type="button">
              Select...
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="named">Named</TabsTrigger>
            </TabsList>
            <TabsContent value="browse">
              <Card>
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <FontBrowser onSubmit={handleAddFont} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="named">
              <Card>
                <CardHeader>
                  <CardTitle>Named Fonts</CardTitle>
                  <CardDescription>
                    Provide the exact name of a font that can be found on{" "}
                    <a
                      href="https://fonts.google.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Google Fonts
                    </a>
                    .
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <NamedFontInput onSubmit={handleAddFont} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div>
            <Label className="mb-2 flex items-center gap-2">
              <span>Selected Fonts</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoCircledIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    You can supply multiple values in the event that the first
                    one or two do not load from google (unlikely but can
                    happen).
                  </p>
                </TooltipContent>
              </Tooltip>
            </Label>
            <div className="flex flex-col gap-2">
              {internalValue?.map((font, index) => (
                <div
                  className={`
                    flex items-center justify-between rounded-md border pl-2
                  `}
                  key={font}
                >
                  <span>
                    {index + 1}. {font}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFont(font)}
                  >
                    <Cross2Icon />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="default"
              onClick={() => {
                onChange(internalValue);
                setInternalValue([]);
                setOpen(false);
              }}
            >
              Save
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setInternalValue([]);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
