import { CodeBlock } from "@/components/CodeBlock";
import { AdminEngagementFragment } from "@/gql/graphql";

export function PhotoCarouselAdminControlView({
  engagement,
}: {
  engagement: AdminEngagementFragment;
}) {
  const data = engagement.data;
  return (
    <div className="flex h-full w-full items-center justify-center">
      <CodeBlock json={data} />
    </div>
  );
}
