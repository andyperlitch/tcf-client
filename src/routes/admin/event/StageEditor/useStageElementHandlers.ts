import { useMemo } from "react";
import { createLogger } from "@/utils/createLogger";
import { nanoid } from "nanoid";
import { StageElementFragment } from "@/gql/graphql";
import {
  ActionType,
  addImageElement,
  addTextElement,
  changeDefaultFont,
  deleteStageElement,
  selectStageElement,
  setBackgroundPreview,
  updateStageElement,
} from "@/providers/StageStateProvider/actions";

const logger = createLogger("useStageElementHandlers");

export function useStageElementHandlers({
  dispatch,
}: {
  dispatch: (message: ActionType) => void;
}) {
  return useMemo(() => {
    const handleNewTextElement = () => {
      logger.info("handleNewTextElement");
      dispatch(
        addTextElement({
          element: {
            id: nanoid(),
            name: "Text element",
            type: "text",
            text: "New element",
            fontFamily: ["Arial", "sans-serif"],
            defaultClassNames: "text-center",
            engagementClassNames: "text-center",
            defaultStyles: {
              color: "#FFFFFFFF",
              fontSize: "1.5vw",
              width: "30vw",
              height: "10vh",
            },
            engagementStyles: {
              color: "#FFFFFFFF",
              fontSize: "1.5vw",
              width: "30vw",
              height: "10vh",
            },
          },
        })
      );
    };

    const handleNewImageElement = () => {
      logger.info("handleNewImageElement");
      dispatch(
        addImageElement({
          element: {
            id: nanoid(),
            type: "image",
            name: "Image element",
            imageUrl: "https://via.placeholder.com/150",
            defaultStyles: {
              width: "30vw",
              height: "30vw",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            },
            engagementStyles: {
              width: "30vw",
              height: "30vw",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            },
          },
        })
      );
    };

    const handleUpdateElement = (element: StageElementFragment) => {
      logger.info("handleUpdateElement", element);
      dispatch(updateStageElement({ element }));
    };

    const handleDeleteElement = (id: string) => {
      logger.info("handleDeleteElement", id);
      dispatch(deleteStageElement({ id }));
    };

    const handleBackgroundPreview = (uri: string | null) => {
      dispatch(setBackgroundPreview({ backgroundImage: uri }));
    };

    const handleBackgroundSave = (url: string) => {
      dispatch(setBackgroundPreview({ backgroundImage: url }));
    };

    const handleFontChange = (fontFamily: string[] | null | undefined) => {
      dispatch(changeDefaultFont({ fontFamily: fontFamily ?? [] }));
    };

    const handleSelectElement = (id: string | undefined | null) => {
      dispatch(selectStageElement({ id }));
    };

    return {
      handleNewTextElement,
      handleNewImageElement,
      handleUpdateElement,
      handleDeleteElement,
      handleBackgroundPreview,
      handleBackgroundSave,
      handleFontChange,
      handleSelectElement,
    };
  }, [dispatch]);
}

export type StageElementHandlers = ReturnType<typeof useStageElementHandlers>;
