import { EngagementType } from "@/gql/graphql";
import { photoCarouselEngagementDefinition } from "./photo-carousel/definition";
import { voteForEngagementDefinition } from "./vote-for/definition";
import { EngagementDefinition } from "./base/EngagementDefinition";

export const ENGAGEMENT_DEFINITIONS = [
  photoCarouselEngagementDefinition,
  voteForEngagementDefinition,
].reduce((acc, definition) => {
  acc[definition.type] = definition;
  return acc;
}, {} as Record<EngagementType, EngagementDefinition<any, any>>);
