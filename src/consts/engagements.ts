import {
  EngagementData,
  EngagementConfig,
  EngagementType,
  PhotoCarouselConfig,
  PhotoCarouselData,
  VoteForConfig,
  VoteForData,
} from "@/gql/graphql";

export interface EngagementViewConfigDefinition<
  TConfig extends EngagementConfig,
  TData extends EngagementData
> {
  type: EngagementType;
  title: string;
  description: string;
  defaultConfig: () => TConfig;
  initialData: (config: TConfig) => TData;
}

///////////
// CAROUSEL
const photoCarouselDef: EngagementViewConfigDefinition<
  PhotoCarouselConfig,
  PhotoCarouselData
> = {
  type: EngagementType.PhotoCarousel,
  title: "Photo Carousel",
  description: "An engagement asking users to upload photos",
  defaultConfig: () => ({
    maxSubmissionsPerUser: 1,
  }),
  initialData: () => ({
    visibleSubmission: null,
  }),
};

/////////////////
// VOTE FOR
const voteForDef: EngagementViewConfigDefinition<VoteForConfig, VoteForData> = {
  type: EngagementType.VoteFor,
  title: "Vote For",
  description: "An engagement asking users to vote for a single option",
  defaultConfig: () => ({
    votesPerUser: 1,
  }),
  initialData: () => ({
    votes: [],
  }),
};

export const EngagementDefinitions = {
  [EngagementType.PhotoCarousel]: photoCarouselDef,
  [EngagementType.VoteFor]: voteForDef,
};
