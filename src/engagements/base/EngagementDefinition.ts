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

export interface AdminSubmissionFormProps {
  engagementId: number;
  existingSubmissions?: AdminSubmissionFragment[];
  onCreated: () => void;
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
  submissionsTableTopLevelActions?: FC<{
    engagement?: AdminEngagementFragment;
    submissions?: AdminSubmissionFragment[];
  }>;
  submissionsTableDataCell?: FC<DataCellProps>;
  adminControlView?: FC<{ engagement: AdminEngagementFragment }>;
  /**
   * If provided, will be placed in a table row of the TableHead,
   * above the Row headers (see src/components/SubmissionsList.tsx)
   */
  adminSubmissionForm?: FC<AdminSubmissionFormProps>;
  /**
   * If provided, replaces the AdminSubmissionPage with a custom component
   */
  adminSubmissionPage?: FC<{ submission: AdminSubmissionFragment }>;
  getInitialData: () => TData;
  getInitialConfig: () => TConfig;
}
