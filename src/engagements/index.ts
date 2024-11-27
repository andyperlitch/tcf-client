import { EngagementType } from "@/gql/graphql";
import { EngagementDefinition } from "./base/EngagementDefinition";

import { photoCarouselEngagementDefinition } from "./photo-carousel/definition";
import { voteForEngagementDefinition } from "./vote-for/definition";
import { slidesEngagementDefinition } from "./slides/definition";
import { nowPlayingEngagementDefinition } from "./now-playing/definition";

export const engagementDefinitionsArray = [
  photoCarouselEngagementDefinition,
  voteForEngagementDefinition,
  slidesEngagementDefinition,
  nowPlayingEngagementDefinition,
];

export const engagementDefinitions = engagementDefinitionsArray.reduce(
  (acc, definition) => {
    acc[definition.type] = definition;
    return acc;
  },
  {} as Record<EngagementType, EngagementDefinition<any, any>>
);
