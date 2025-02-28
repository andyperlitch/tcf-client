import { EngagementDefinition } from "../base/EngagementDefinition";
import { StageVoteForEngagement } from "./stage/StageVoteForEngagement";
import { FanVoteForEngagement } from "./fan/FanVoteForEngagement";
import {
  EngagementType,
  VoteForAdminConfig,
  VoteForAdminData,
} from "@/gql/graphql";
import { VoteForDataHeaders } from "./admin/submissions-table";
import { VoteForDataCell } from "./admin/submissions-table";
import { BarChartIcon } from "@radix-ui/react-icons";
import { CreateVoteForChoiceForm } from "./admin/CreateVoteForChoiceForm";
import { RandomizeChoiceColorsButton } from "@/components/RandomizeChoiceColorsButton";
export const voteForEngagementDefinition: EngagementDefinition<
  VoteForAdminConfig,
  VoteForAdminData
> = {
  title: "Vote For",
  icon: <BarChartIcon />,
  type: EngagementType.VoteFor,
  stageComponent: StageVoteForEngagement,
  fanComponent: FanVoteForEngagement,
  submissionsTableHeaders: VoteForDataHeaders,
  submissionsTableDataCell: VoteForDataCell,
  adminSubmissionForm: CreateVoteForChoiceForm,
  submissionsTableTopLevelActions: RandomizeChoiceColorsButton,
  submissionsName: "Choices",
  getInitialData: () => ({
    votes: [],
  }),
  getInitialConfig: () => ({
    allowUserSubmissions: false,
    votesPerUser: 1,
    maxSubmissionsPerUser: 1,
  }),
};
