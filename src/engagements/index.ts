import { EngagementType } from "@/gql/graphql";
import { photoCarouselEngagementDefinition } from "./photo-carousel/definition";
import { voteForEngagementDefinition } from "./vote-for/definition";
import { slidesEngagementDefinition } from "./slides/definition";
import { EngagementDefinition } from "./base/EngagementDefinition";

export const engagementDefinitionsArray = [
  photoCarouselEngagementDefinition,
  voteForEngagementDefinition,
  slidesEngagementDefinition,
];

export const engagementDefinitions = engagementDefinitionsArray.reduce(
  (acc, definition) => {
    acc[definition.type] = definition;
    return acc;
  },
  {} as Record<EngagementType, EngagementDefinition<any, any>>
);
