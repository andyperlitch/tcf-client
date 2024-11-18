import { AdminSubmissionFragment, SlidesSubmissionData } from "@/gql/graphql";

export function SlidePage({
  submission,
}: {
  submission: AdminSubmissionFragment;
}) {
  const submissionData = submission.data as SlidesSubmissionData;

  return (
    <div data-name="ADMIN-SLIDE-PAGE">
      <h2 className="text-3xl">{submissionData.title}</h2>
      <div className="flex flex-col space-y-4"></div>
    </div>
  );
}
