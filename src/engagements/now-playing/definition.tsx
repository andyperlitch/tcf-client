import {
  EngagementType,
  NowPlayingAdminConfig,
  NowPlayingAdminData,
} from "@/gql/graphql";
import { StageNowPlayingEngagement } from "./stage/StageNowPlayingEngagement";
import { FanNowPlayingEngagement } from "./fan/FanNowPlayingEngagement";
import { EngagementDefinition } from "../base/EngagementDefinition";
import { PlayIcon } from "@radix-ui/react-icons";

export const nowPlayingEngagementDefinition: EngagementDefinition<
  NowPlayingAdminConfig,
  NowPlayingAdminData
> = {
  title: "Now Playing",
  icon: <PlayIcon />,
  type: EngagementType.NowPlaying,
  stageComponent: StageNowPlayingEngagement,
  fanComponent: FanNowPlayingEngagement,
  submissionsName: "Songs",
  getInitialData: () => ({
    currentSong: null,
  }),
  getInitialConfig: () => ({
    allowComments: true,
    allowedReactions: ["😍", "👏", "🤯", "🔥", "🎶"],
    visualizationType: "default",
  }),
};
