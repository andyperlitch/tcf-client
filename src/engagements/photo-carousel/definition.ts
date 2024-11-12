import { EngagementType } from "@/gql/graphql";
import { StagePhotoCarouselEngagement } from "./stage/StagePhotoCarouselEngagement";
import { FanPhotoCarouselEngagement } from "./fan/FanPhotoCarouselEngagement";
import { EngagementDefinition } from "../base/EngagementDefinition";
import { PhotoCarouselDataHeaders } from "./admin/submissions-table";
import { PhotoCarouselDataCell } from "./admin/submissions-table";

export const photoCarouselEngagementDefinition: EngagementDefinition = {
  type: EngagementType.PhotoCarousel,
  stageComponent: StagePhotoCarouselEngagement,
  fanComponent: FanPhotoCarouselEngagement,
  submissionsTableHeaders: PhotoCarouselDataHeaders,
  submissionsTableDataCell: PhotoCarouselDataCell,
};
