export interface ParsedImageDetail {
  url: string;
  width?: number;
  height?: number;
  constraintDimension: "width" | "height";
}
export const DEFAULT_IMAGE_DETAIL: ParsedImageDetail = {
  url: "",
  constraintDimension: "width",
};

export const DEFAULT_IMAGE_WIDTH = 300;
export const DEFAULT_IMAGE_HEIGHT = 50;
