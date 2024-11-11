import { StageEventFragment } from "@/gql/graphql";
import { EngagementType } from "@/gql/graphql";
import { StagePhotoCarouselEngagement } from "./StagePhotoCarouselEngagement";
import { StageVoteForEngagement } from "./StageVoteForEngagement";
import { AnimatePresence, motion } from "framer-motion";

export function StageActiveEngagement({
  event,
}: {
  event: StageEventFragment;
}) {
  const engagement = event?.activeEngagement;

  if (!engagement) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="h-full w-full"
        key={engagement.type}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {(() => {
          switch (engagement.type) {
            case EngagementType.PhotoCarousel:
              return (
                <StagePhotoCarouselEngagement
                  key={engagement.id}
                  engagement={engagement}
                />
              );
            case EngagementType.VoteFor:
              return (
                <StageVoteForEngagement
                  key={engagement.id}
                  engagement={engagement}
                />
              );
            default:
              return <div>{engagement.title}</div>;
          }
        })()}
      </motion.div>
    </AnimatePresence>
  );
}
