import {
  AdminEngagementFragment,
  AdminSubmissionFragment,
  EngagementAdminConfig,
  EngagementAdminData,
  EngagementType,
  FanEngagementFragment,
  StageEngagementFragment,
} from "@/gql/graphql";
import { FC } from "react";

export interface DataCellProps {
  submission: AdminSubmissionFragment;
}

export interface EngagementDefinition<
  TConfig extends EngagementAdminConfig,
  TData extends EngagementAdminData
> {
  title: string;
  icon: React.ReactNode;
  type: EngagementType;
  stageComponent: FC<{ engagement: StageEngagementFragment }>;
  fanComponent: FC<{ engagement: FanEngagementFragment }>;
  submissionsTableHeaders?: FC;
  submissionsTableDataCell?: FC<DataCellProps>;
  adminControlView?: FC<{ engagement: AdminEngagementFragment }>;
  getInitialData: () => TData;
  getInitialConfig: () => TConfig;
}
