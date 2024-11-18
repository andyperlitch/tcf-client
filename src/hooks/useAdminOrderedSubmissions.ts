import { useMemo } from "react";
import { useAdminGetSubmissionsQuery } from "@/gql/graphql";

export function useAdminOrderedSubmissions({
  engagementId,
}: {
  engagementId: number | undefined | null;
}) {
  const { data, loading, refetch } = useAdminGetSubmissionsQuery({
    variables: { engagementId: engagementId! },
    skip: !engagementId,
  });

  const sortedSubmissions = useMemo(() => {
    if (!data) return [];
    return data.submissions.slice().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [data]);

  return {
    data,
    loading,
    refetch,
    sortedSubmissions,
  };
}
