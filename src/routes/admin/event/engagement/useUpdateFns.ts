import { useAdminUpdateEngagementMutation } from "@/gql/graphql";
import { AdminGetEngagementQuery } from "@/gql/graphql";

export function useUpdateFns({ data }: { data?: AdminGetEngagementQuery }) {
  // Get the engagmenet update function
  const [updateEngagement] = useAdminUpdateEngagementMutation();

  const updateEngagementTitle = (title: string) => {
    if (data?.engagement) {
      return updateEngagement({
        variables: { id: data.engagement.id, data: { title } },
      });
    }
  };

  const updateEngagementDescription = (description: string) => {
    if (data?.engagement) {
      return updateEngagement({
        variables: { id: data.engagement.id, data: { description } },
      });
    }
  };

  const updateEngagementConfig = (config: any) => {
    if (data?.engagement) {
      return updateEngagement({
        variables: {
          id: data.engagement.id,
          data: { config },
        },
      });
    }
  };

  const updateEngagementData = (dataValue: any) => {
    if (data?.engagement) {
      return updateEngagement({
        variables: {
          id: data.engagement.id,
          data: { data: dataValue },
        },
      });
    }
  };

  const updateEngagementQrCodeCta = (qrCodeCta: string) => {
    if (data?.engagement) {
      return updateEngagement({
        variables: { id: data.engagement.id, data: { qrCodeCta } },
      });
    }
  };

  return {
    updateEngagementTitle,
    updateEngagementDescription,
    updateEngagementConfig,
    updateEngagementData,
    updateEngagementQrCodeCta,
  };
}
