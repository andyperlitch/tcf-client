import { EngagementDefinition } from "../base/EngagementDefinition";
import {
  EngagementType,
  SlidesAdminConfig,
  SlidesAdminData,
} from "@/gql/graphql";
import { StageSlidesEngagement } from "./stage/StageSlidesEngagement";
import { FanSlidesEngagement } from "./fan/FanSlidesEngagement";
import { CardStackIcon } from "@radix-ui/react-icons";
import { SlidesDataHeaders, SlidesDataCells } from "./admin/submissions-table";
import { CreateSlideForm } from "./admin/CreateSlideForm";
import { AdminSlidePage } from "./admin/AdminSlidePage";

export const slidesEngagementDefinition: EngagementDefinition<
  SlidesAdminConfig,
  SlidesAdminData
> = {
  title: "Slides",
  icon: <CardStackIcon />,
  type: EngagementType.Slides,
  stageComponent: StageSlidesEngagement,
  fanComponent: FanSlidesEngagement,
  submissionsTableHeaders: SlidesDataHeaders,
  submissionsTableDataCell: SlidesDataCells,
  adminSubmissionForm: CreateSlideForm,
  submissionsName: "Slides",
  adminSubmissionPage: AdminSlidePage,
  getInitialData: () => ({
    currentSlide: 0,
  }),
  getInitialConfig: () => ({
    autoPlay: false,
  }),
};
