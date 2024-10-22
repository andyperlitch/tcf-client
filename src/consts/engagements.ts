export enum ViewType {
  PhotoCarousel = "photoCarousel",
  VoteFor = "voteFor",
}

export interface EngagementViewConfigDefinition<
  TConfig extends CommonViewConfig,
  TData extends CommonViewData
> {
  type: ViewType;
  title: string;
  description: string;
  defaultConfig: () => TConfig;
  initialData: (config: TConfig) => TData;
}

export interface CommonViewConfig {
  type: ViewType;
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
  type: ViewType.PhotoCarousel,
  title: "Photo Carousel",
  description: "An engagement asking users to upload photos",
  defaultConfig: () => ({
    type: ViewType.PhotoCarousel,
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
  type: ViewType.VoteFor,
  title: "Vote For",
  description: "An engagement asking users to vote for a single option",
  defaultConfig: () => ({
    type: ViewType.VoteFor,
    options: [],
    maxVotes: 1,
  }),
  initialData: () => ({}),
};

export const EngagementDefinitions = {
  [ViewType.PhotoCarousel]: photoCarouselDef,
  [ViewType.VoteFor]: voteForDef,
};
