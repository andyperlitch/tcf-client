import {
  AdminEngagementFragment,
  PhotoCarouselAdminConfig,
  PhotoCarouselSubmissionData,
  usePhotoCarouselDownloadLazyQuery,
} from "@/gql/graphql";

import { Button } from "@/components/ui/button";
import { AdminSubmissionFragment } from "@/gql/graphql";
import { DownloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";

export function DownloadShareablePhotosButton({
  engagement,
  submissions,
}: {
  engagement?: AdminEngagementFragment;
  submissions?: AdminSubmissionFragment[];
}) {
  const { toast } = useToast();

  const [downloadShareablePhotos] = usePhotoCarouselDownloadLazyQuery();

  const handleClick = () => {
    if (!engagement || !submissions) {
      return;
    }

    // get the engagement config as the proper PhotoCarousel type
    const config = engagement.config as PhotoCarouselAdminConfig;

    if (config.askSharePermission) {
      // get the submissions that have sharing permission granted
      const shareableSubmissions = submissions.filter(
        (submission) =>
          (submission.data as PhotoCarouselSubmissionData)
            .sharingPermissionGranted
      );
      if (shareableSubmissions.length === 0) {
        toast({
          title: `No shareable photos found (${submissions.length} total)`,
          description: `If you want to bypass this, you can change "askSharePermission" to \`false\` in the configuration.`,
          variant: "destructive",
        });
        return;
      }
    }

    downloadShareablePhotos({
      fetchPolicy: "network-only",
      variables: { engagementId: engagement.id },
    }).then((result) => {
      if (result.data?.photoCarouselDownload.success) {
        window.open(result.data.photoCarouselDownload.downloadUrl, "_blank");
      } else {
        toast({
          title: "Error downloading photos",
          description: result.data?.photoCarouselDownload.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button variant="informational" onClick={handleClick}>
      <DownloadIcon className="mr-2 h-4 w-4" />
      Download Shareable Photos
    </Button>
  );
}
