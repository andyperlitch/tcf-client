import { AdminEngagementFragment } from "@/gql/graphql";

import { useMemo } from "react";

export function useSortedAdminEngagements(
  engagements: AdminEngagementFragment[]
) {
  const sortedEngagements = useMemo(() => {
    const unsortedEngagements = engagements.slice();
    unsortedEngagements.sort((a, b) => a.order - b.order);
    return unsortedEngagements;
  }, [engagements]);
  return sortedEngagements;
}
