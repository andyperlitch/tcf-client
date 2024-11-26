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

export interface TableHeaderProps {
  engagement: AdminEngagementFragment;
}

export interface DataCellProps {
  submission: AdminSubmissionFragment;
  engagement: AdminEngagementFragment;
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
  /**
   * If provided, replaces the SubmissionsList on the AdminEngagementPage
   */
  submissionsTable?: FC<{ engagement: AdminEngagementFragment }>;
  /**
   * The name of the submission type (plural), used in the SubmissionsList table
   */
  submissionsName?: string;
  submissionsTableHeaders?: FC<TableHeaderProps>;
  submissionsTableDataCell?: FC<DataCellProps>;
  adminControlView?: FC<{ engagement: AdminEngagementFragment }>;
  adminSubmissionForm?: FC<{
    engagementId: number;
    existingSubmissions?: AdminSubmissionFragment[];
    onCreated: () => void;
  }>;
  /**
   * If provided, replaces the AdminSubmissionPage with a custom component
   */
  adminSubmissionPage?: FC<{ submission: AdminSubmissionFragment }>;
  getInitialData: () => TData;
  getInitialConfig: () => TConfig;
}
