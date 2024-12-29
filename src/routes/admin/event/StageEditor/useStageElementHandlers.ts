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
      const newElementId = Math.random().toString();
      const newSavedConfig = {
        ...prev,
        elements: [
          ...(prev.elements || []),
          {
            id: newElementId,
            name: "Text element",
            type: "text",
            text: "New element",
            fontFamily: ["Arial", "sans-serif"],
            defaultClassNames: "text-center",
            defaultStyles: {
              fontSize: "1.5vw",
            },
            engagementStyles: {
              fontSize: "1.5vw",
            },
          },
        ],
      };
      setSelectedElementId(newElementId);
      logger.info("handleNewTextElement", { newSavedConfig });
      return newSavedConfig;
    });
  }, [setSavedConfig, setSelectedElementId]);

  const handleNewImageElement = useCallback(() => {
    logger.info("handleNewImageElement");
    setSavedConfig((prev) => {
      const newElementId = Math.random().toString();
      const newSavedConfig = {
        ...prev,
        elements: [
          ...(prev.elements || []),
          {
            id: newElementId,
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
      };
      setSelectedElementId(newElementId);
      logger.info("handleNewImageElement", { newSavedConfig });
      return newSavedConfig;
    });
  }, [setSavedConfig, setSelectedElementId]);

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
