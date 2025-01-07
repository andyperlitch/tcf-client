import { ScreenElementFragment } from "@/gql/graphql";
import { nanoid } from "nanoid";

export function createDefaultFanTextElement(): ScreenElementFragment {
  return {
    id: nanoid(),
    name: "Text element",
    type: "text",
    text: "New element",
    defaultClassNames: "text-center",
    engagementClassNames: "text-center",
    defaultStyles: {
      color: "#FFFFFFFF",
      fontSize: "3.5vw",
      width: "30vw",
      height: "10vh",
    },
    engagementStyles: {
      color: "#FFFFFFFF",
      fontSize: "1.5vw",
      width: "30vw",
      height: "10vh",
    },
  };
}

export function createDefaultFanImageElement(): ScreenElementFragment {
  return {
    id: nanoid(),
    type: "image",
    name: "Image element",
    imageUrl: "https://via.placeholder.com/150",
    defaultStyles: {
      width: "30vw",
      height: "30vw",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    engagementStyles: {
      width: "30vw",
      height: "30vw",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
  };
}
