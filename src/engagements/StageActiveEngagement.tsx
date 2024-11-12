import { StageEventFragment } from "@/gql/graphql";
import { ENGAGEMENT_DEFINITIONS } from "./index";
import { AnimatePresence, motion } from "framer-motion";

export function StageActiveEngagement({
  event,
}: {
  event: StageEventFragment;
}) {
  const engagement = event?.activeEngagement;

  if (!engagement) return null;

  const EngagementDefinition = ENGAGEMENT_DEFINITIONS[engagement.type];
  const Component = EngagementDefinition?.stageComponent;

  if (!Component) throw new Error(`No stage component for ${engagement.type}`);

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
        <Component key={engagement.id} engagement={engagement} />
      </motion.div>
    </AnimatePresence>
  );
}
