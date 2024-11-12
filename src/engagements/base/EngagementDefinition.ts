import {
  AdminSubmissionFragment,
  EngagementType,
  FanEngagementFragment,
  StageEngagementFragment,
} from "@/gql/graphql";
import { FC } from "react";

export interface DataCellProps {
  submission: AdminSubmissionFragment;
}

export interface EngagementDefinition {
  type: EngagementType;
  stageComponent: FC<{ engagement: StageEngagementFragment }>;
  fanComponent: FC<{ engagement: FanEngagementFragment }>;
  submissionsTableHeaders?: FC;
  submissionsTableDataCell?: FC<DataCellProps>;
}
