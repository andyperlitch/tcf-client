import {
  EngagementType,
  PhotoCarouselAdminConfig,
  PhotoCarouselAdminData,
} from "@/gql/graphql";
import { StagePhotoCarouselEngagement } from "./stage/StagePhotoCarouselEngagement";
import { FanPhotoCarouselEngagement } from "./fan/FanPhotoCarouselEngagement";
import { EngagementDefinition } from "../base/EngagementDefinition";
import { PhotoCarouselDataHeaders } from "./admin/submissions-table";
import { PhotoCarouselDataCell } from "./admin/submissions-table";
import { CameraIcon } from "@radix-ui/react-icons";
import { PhotoCarouselAdminControlView } from "./admin/control-view";

export const photoCarouselEngagementDefinition: EngagementDefinition<
  PhotoCarouselAdminConfig,
  PhotoCarouselAdminData
> = {
  title: "Photo Carousel",
  icon: <CameraIcon />,
  type: EngagementType.PhotoCarousel,
  stageComponent: StagePhotoCarouselEngagement,
  fanComponent: FanPhotoCarouselEngagement,
  submissionsTableHeaders: PhotoCarouselDataHeaders,
  submissionsTableDataCell: PhotoCarouselDataCell,
  adminControlView: PhotoCarouselAdminControlView,
  getInitialData: () => ({
    rejectedQueue: [],
    seenQueue: [],
    seenQueuePointer: 0,
    unseenQueue: [],
    unapprovedQueue: [],
  }),
  getInitialConfig: () => ({
    maxSubmissionsPerUser: 1,
    requireApproval: false,
  }),
};
