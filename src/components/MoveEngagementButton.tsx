import {
  AdminEngagementFragment,
  useAdminMoveEngagementMutation,
  AdminGetEventDocument,
} from "@/gql/graphql";
import { Button } from "./ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";

type MoveEngagementButtonProps = {
  id: number;
  engagements: AdminEngagementFragment[];
  index: number;
  eventId: number;
  direction: "up" | "down";
};

export function MoveEngagementButton({
  id,
  engagements,
  index,
  eventId,
  direction,
}: MoveEngagementButtonProps) {
  const [moveEngagement] = useAdminMoveEngagementMutation({
    update: (cache, { data }) => {
      if (!data?.moveEngagement) return;

      cache.updateQuery(
        {
          query: AdminGetEventDocument,
          variables: { slug: eventId.toString() },
        },
        (existingData) => {
          if (!existingData?.event) return existingData;
          return {
            ...existingData,
            event: {
              ...existingData.event,
              engagements: data.moveEngagement,
            },
          };
        }
      );
    },
  });

  const handleClick = useMemo(
    () => () => moveEngagement({ variables: { engagementId: id, direction } }),
    [id, direction, moveEngagement]
  );

  const isDisabled =
    direction === "up" ? index === 0 : index === engagements.length - 1;

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleClick}
      disabled={isDisabled}
    >
      {direction === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}
    </Button>
  );
}
