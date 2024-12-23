import { useCallback } from "react";
import { createLogger } from "@/utils/createLogger";
import { AdminStageConfig } from "./useAdminStageState";
import { StageElementFragment } from "@/gql/graphql";

const logger = createLogger("useStageElementHandlers");

export function useStageElementHandlers({
  setSavedConfig,
  setSelectedElementId,
  selectedElementId,
}: {
  setSavedConfig: AdminStageConfig["setSavedConfig"];
  setSelectedElementId: AdminStageConfig["setSelectedElementId"];
  selectedElementId: AdminStageConfig["selectedElementId"];
}) {
  const handleNewTextElement = useCallback(() => {
    setSavedConfig((prev) => {
      const newSavedConfig = {
        ...prev,
        elements: [
          ...(prev.elements || []),
          {
            id: Math.random().toString(),
            name: "Text element",
            type: "text",
            text: "New element",
            fontFamily: "Arial",
            defaultStyles: {
              fontSize: "1.5vw",
              textAlign: "center",
            },
            engagementStyles: {
              fontSize: "1.5vw",
              textAlign: "center",
            },
          },
        ],
      };

      logger.info("handleNewTextElement", { newSavedConfig });
      return newSavedConfig;
    });
  }, [setSavedConfig]);

  const handleNewImageElement = useCallback(() => {
    logger.info("handleNewImageElement");
    setSavedConfig((prev) => ({
      ...prev,
      elements: [
        ...(prev.elements || []),
        {
          id: Math.random().toString(),
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
      ],
    }));
  }, [setSavedConfig]);

  const handleUpdateElement = useCallback(
    (element: StageElementFragment) => {
      logger.info("handleUpdateElement", element);
      setSavedConfig((prev) => ({
        ...prev,
        elements:
          prev.elements?.map((e) => (e.id === element.id ? element : e)) || [],
      }));
    },
    [setSavedConfig]
  );

  const handleDeleteElement = useCallback(
    (element: StageElementFragment) => {
      setSavedConfig((prev) => {
        const newElements =
          prev.elements?.filter((e) => e.id !== element.id) || [];
        logger.info("handleDeleteElement", element, newElements);
        if (selectedElementId === element.id) {
          setSelectedElementId(undefined);
        }
        return {
          ...prev,
          elements: newElements,
        };
      });
    },
    [selectedElementId, setSavedConfig, setSelectedElementId]
  );

  return {
    handleNewTextElement,
    handleNewImageElement,
    handleUpdateElement,
    handleDeleteElement,
  };
}
