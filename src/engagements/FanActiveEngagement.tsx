import { FanEngagementFragment } from "@/gql/graphql";
import { engagementDefinitions } from "./index";

export function FanActiveEngagement({
  engagement,
}: {
  engagement: FanEngagementFragment;
}) {
  const EngagementDefinition = engagementDefinitions[engagement.type];
  const Component = EngagementDefinition?.fanComponent;

  if (!Component) throw new Error(`No fan component for ${engagement.type}`);

  return <Component engagement={engagement} />;
}
