import { EngagementType } from "@/gql/graphql";

export interface EngagementViewConfigDefinition<
  TConfig extends CommonViewConfig,
  TData extends CommonViewData
> {
  type: EngagementType;
  title: string;
  description: string;
  defaultConfig: () => TConfig;
  initialData: (config: TConfig) => TData;
}

export interface CommonViewConfig {
  type: EngagementType;
}

export interface CommonViewData {}

///////////
// CAROUSEL
export interface PhotoCarouselConfig extends CommonViewConfig {
  maxPhotos: number;
  maxPhotosPerUser: number;
}
export interface PhotoCarouselData extends CommonViewData {}
const photoCarouselDef: EngagementViewConfigDefinition<
  PhotoCarouselConfig,
  PhotoCarouselData
> = {
  type: EngagementType.PhotoCarousel,
  title: "Photo Carousel",
  description: "An engagement asking users to upload photos",
  defaultConfig: () => ({
    type: EngagementType.PhotoCarousel,
    maxPhotos: 100,
    maxPhotosPerUser: 1,
  }),
  initialData: () => ({}),
};

/////////////////
// VOTE FOR
export interface VoteForConfig extends CommonViewConfig {
  options: string[];
  maxVotes: number;
}
export interface VoteForData extends CommonViewData {}
const voteForDef: EngagementViewConfigDefinition<VoteForConfig, VoteForData> = {
  type: EngagementType.VoteFor,
  title: "Vote For",
  description: "An engagement asking users to vote for a single option",
  defaultConfig: () => ({
    type: EngagementType.VoteFor,
    options: [],
    maxVotes: 1,
  }),
  initialData: () => ({}),
};

export const EngagementDefinitions = {
  [EngagementType.PhotoCarousel]: photoCarouselDef,
  [EngagementType.VoteFor]: voteForDef,
};
