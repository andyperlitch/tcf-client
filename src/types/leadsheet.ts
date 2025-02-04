export interface ParsedImageDetail {
  url: string;
  width?: number;
  height?: number;
  constraintDimension: "width" | "height";
}
