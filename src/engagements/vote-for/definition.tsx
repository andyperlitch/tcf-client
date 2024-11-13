import { EngagementDefinition } from "../base/EngagementDefinition";
import { StageVoteForEngagement } from "./stage/StageVoteForEngagement";
import { FanVoteForEngagement } from "./fan/FanVoteForEngagement";
import { EngagementType } from "@/gql/graphql";
import { VoteForDataHeaders } from "./admin/submissions-table";
import { VoteForDataCell } from "./admin/submissions-table";
import { BarChartIcon } from "@radix-ui/react-icons";

export const voteForEngagementDefinition: EngagementDefinition = {
  icon: <BarChartIcon />,
  type: EngagementType.VoteFor,
  stageComponent: StageVoteForEngagement,
  fanComponent: FanVoteForEngagement,
  submissionsTableHeaders: VoteForDataHeaders,
  submissionsTableDataCell: VoteForDataCell,
};
