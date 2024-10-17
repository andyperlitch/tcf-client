export interface EngagementViewConfigDefinition {
  type: string;
  title: string;
  description: string;
  defaultConfig: () => Record<string, PhotoCarouselConfig | VoteForConfig>;
}

export interface CommmonViewConfig {
  type: string;
}

export interface PhotoCarouselConfig extends CommmonViewConfig {
  maxPhotos: number;
  maxPhotosPerUser: number;
}

export interface VoteForConfig extends CommmonViewConfig {
  options: string[];
  maxVotes: number;
}

export const ENGAGEMENT_VIEW_TYPES: EngagementViewConfigDefinition[] = [
  {
    type: "photoCarousel",
    title: "Photo Carousel",
    description: "An engagement asking users to upload photos",
    defaultConfig: (): PhotoCarouselConfig => ({
      type: "photoCarousel",
      maxPhotos: 100,
      maxPhotosPerUser: 1,
    }),
    initialData: (config: PhotoCarouselConfig) => ({}),
  },
  {
    type: "voteFor",
    title: "Vote For",
    description: "An engagement asking users to vote for a single option",
    defaultConfig: (): VoteForConfig => ({
      type: "voteFor",
      options: [],
      maxVotes: 1,
    }),
  },
];
