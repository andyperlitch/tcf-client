import { EngagementType } from "@/gql/graphql";
import { StagePhotoCarouselEngagement } from "./stage/StagePhotoCarouselEngagement";
import { FanPhotoCarouselEngagement } from "./fan/FanPhotoCarouselEngagement";
import { EngagementDefinition } from "../base/EngagementDefinition";
import { PhotoCarouselDataHeaders } from "./admin/submissions-table";
import { PhotoCarouselDataCell } from "./admin/submissions-table";
import { CameraIcon } from "@radix-ui/react-icons";
import { PhotoCarouselAdminControlView } from "./admin/control-view";

export const photoCarouselEngagementDefinition: EngagementDefinition = {
  icon: <CameraIcon />,
  type: EngagementType.PhotoCarousel,
  stageComponent: StagePhotoCarouselEngagement,
  fanComponent: FanPhotoCarouselEngagement,
  submissionsTableHeaders: PhotoCarouselDataHeaders,
  submissionsTableDataCell: PhotoCarouselDataCell,
  adminControlView: PhotoCarouselAdminControlView,
};
