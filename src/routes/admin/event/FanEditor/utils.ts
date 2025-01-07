import { ScreenElementFragment } from "@/gql/graphql";
import { nanoid } from "nanoid";

const defaultTextStyles = () => ({
  color: "#FFFFFFFF",
  fontSize: "3.5vw",
  width: "30vw",
  height: "10vh",
});

const defaultImageStyles = () => ({
  width: "30vw",
  height: "30vw",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

export function createDefaultFanTextElement(): ScreenElementFragment {
  const defaultStyles = defaultTextStyles();
  return {
    id: nanoid(),
    name: "Text element",
    type: "text",
    text: "New element",
    defaultClassNames: "text-center",
    engagementClassNames: "text-center",
    defaultStyles,
    engagementStyles: defaultStyles,
  };
}

export function createDefaultFanImageElement(): ScreenElementFragment {
  const defaultStyles = defaultImageStyles();
  return {
    id: nanoid(),
    type: "image",
    name: "Image element",
    imageUrl: "https://via.placeholder.com/150",
    defaultStyles,
    engagementStyles: defaultStyles,
  };
}
