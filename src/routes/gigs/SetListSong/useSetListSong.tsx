import {
  DetailedGigSongFragment,
  GigSongFragment,
  useBandGigQuery,
  useBandGigSongQuery,
  useBandUpdateCurrentGigSongIdOrBreakMutation,
  useOnCurrentGigSongIdOrBreakChangedSubscription,
} from "@/gql/graphql";
import { useCallback, useEffect, useMemo } from "react";
import { SetBreak } from "./consts";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getSongOrBreakUrl } from "./utils";

export function useSetListSongOrBreak(params: {
  gigId: number;
  gigSongId?: number | null;
  lastSetId?: number | null;
  nextSetId?: number | null;
  followLeader?: boolean;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const gigId = params.gigId;
  const {
    data: gigData,
    loading: gigLoading,
    error: gigError,
    refetch: refetchGig,
  } = useBandGigQuery({
    variables: {
      id: gigId,
    },
  });

  const {
    data: gigSongData,
    loading: gigSongLoading,
    error: gigSongError,
    refetch: refetchGigSong,
  } = useBandGigSongQuery({
    skip: !params.gigSongId,
    variables: { id: params.gigSongId || -1 },
  });

  const refetch = useCallback(() => {
    refetchGig();
    params.gigSongId && refetchGigSong();
  }, [refetchGig, refetchGigSong, params.gigSongId]);

  const loading = gigLoading || gigSongLoading;
  const error = gigError || gigSongError;
  const gig = gigData?.gig || null;

  const { user } = useAuth();

  useOnCurrentGigSongIdOrBreakChangedSubscription({
    variables: {
      gigId,
    },
    skip: user?.id === gig?.gigLeaderId,
  });

  const [updateCurrentGigSongIdOrBreak] =
    useBandUpdateCurrentGigSongIdOrBreakMutation();

  const gigSongIdOrBreak = getGigSongIdOrBreakFromParams(params);

  // PUBLISH
  useEffect(() => {
    if (
      !gigId ||
      !user?.id ||
      !gig?.gigLeaderId ||
      user.id !== gig.gigLeaderId ||
      gig.currentGigSongIdOrBreak === gigSongIdOrBreak
    ) {
      console.log("!gigId", !gigId);
      console.log("!user?.id", !user?.id);
      console.log("!gig?.gigLeaderId", !gig?.gigLeaderId);
      console.log("user.id !== gig.gigLeaderId", user?.id !== gig?.gigLeaderId);
      console.log(
        "gig.currentGigSongIdOrBreak === gigSongIdOrBreak",
        gig?.currentGigSongIdOrBreak === gigSongIdOrBreak
      );
      return;
    }
    updateCurrentGigSongIdOrBreak({
      variables: {
        gigId,
        gigSongIdOrBreak,
      },
    });
  }, [
    gig?.currentGigSongIdOrBreak,
    gig?.gigLeaderId,
    gigId,
    gigSongIdOrBreak,
    updateCurrentGigSongIdOrBreak,
    user?.id,
  ]);

  // SUBSCRIBE
  useEffect(() => {
    if (
      params.followLeader &&
      gig?.currentGigSongIdOrBreak &&
      gig?.gigLeaderId !== user?.id
    ) {
      const parts = gig.currentGigSongIdOrBreak.split(":");
      const songId = parts[0] === "break" ? null : parseInt(parts[0]);
      const lastSetId = parts[1] ? parseInt(parts[1]) : null;
      const nextSetId = parts[2] ? parseInt(parts[2]) : null;
      if (
        (songId !== params.gigSongId ||
          lastSetId !== params.lastSetId ||
          nextSetId !== params.nextSetId) &&
        ((songId && !lastSetId && !nextSetId) ||
          (!songId && lastSetId && nextSetId))
      ) {
        toast({
          variant: "informational",
          title: "Current song changed",
        });

        navigate(
          getSongOrBreakUrl(
            { id: gigId },
            songId
              ? {
                  __typename: "GigSong" as const,
                  id: songId,
                }
              : {
                  __typename: "SetBreak" as const,
                  lastSetId: lastSetId!,
                  nextSetId: nextSetId!,
                }
          )
        );
      }
    }
  }, [
    gig?.currentGigSongIdOrBreak,
    gig?.gigLeaderId,
    user?.id,
    gigId,
    navigate,
    params.followLeader,
    params.gigSongId,
    params.lastSetId,
    params.nextSetId,
    toast,
  ]);

  const { previousSongOrBreak, nextSongOrBreak, gigSongOrBreak } =
    useMemo(() => {
      let gigSongOrBreak: DetailedGigSongFragment | SetBreak | null = null;

      if (params.gigSongId) {
        gigSongOrBreak = gigSongData?.gigSong || null;
      } else if (params.lastSetId && params.nextSetId) {
        gigSongOrBreak = {
          __typename: "SetBreak",
          lastSetId: params.lastSetId,
          nextSetId: params.nextSetId,
        };
      }

      let previousSongOrBreak: GigSongFragment | SetBreak | null = null;
      let nextSongOrBreak: GigSongFragment | SetBreak | null = null;

      const sets = gig?.sets || [];

      if (sets.length > 0 && gigSongOrBreak?.__typename === "GigSong") {
        const currentSetIndex = sets.findIndex(
          (set) => set.id === gigSongOrBreak.setId
        );
        const currentSet = sets[currentSetIndex];
        const currentSongIndex = currentSet.songs.findIndex(
          (song) => song.id === gigSongOrBreak.id
        );

        if (currentSongIndex > 0) {
          previousSongOrBreak = currentSet.songs[currentSongIndex - 1];
        }

        if (currentSongIndex < currentSet.songs.length - 1) {
          nextSongOrBreak = currentSet.songs[currentSongIndex + 1];
        }

        if (currentSongIndex === 0) {
          if (currentSetIndex > 0) {
            const lastSet = sets[currentSetIndex - 1];
            previousSongOrBreak = {
              __typename: "SetBreak",
              lastSetId: lastSet.id,
              nextSetId: currentSet.id,
            };
          }
        }

        if (currentSongIndex === currentSet.songs.length - 1) {
          if (currentSetIndex < sets.length - 1) {
            nextSongOrBreak = {
              __typename: "SetBreak",
              lastSetId: currentSet.id,
              nextSetId: sets[currentSetIndex + 1].id,
            };
          }
        }
      } else if (gigSongOrBreak?.__typename === "SetBreak") {
        const lastSet = sets.find((set) => set.id === gigSongOrBreak.lastSetId);
        const nextSet = sets.find((set) => set.id === gigSongOrBreak.nextSetId);

        previousSongOrBreak = lastSet?.songs[lastSet.songs.length - 1] || null;
        nextSongOrBreak = nextSet?.songs[0] || null;
      }

      return {
        previousSongOrBreak,
        nextSongOrBreak,
        gigSongOrBreak,
      };
    }, [
      gig?.sets,
      gigSongData?.gigSong,
      params.gigSongId,
      params.lastSetId,
      params.nextSetId,
    ]);

  return {
    gig,
    gigSongOrBreak,
    previousSongOrBreak,
    nextSongOrBreak,
    loading,
    error,
    refetch,
  };
}

function getGigSongIdOrBreakFromParams(params: {
  gigSongId?: number | null;
  lastSetId?: number | null;
  nextSetId?: number | null;
}): string | null {
  if (params.gigSongId) {
    return params.gigSongId.toString();
  } else if (params.lastSetId && params.nextSetId) {
    return `break:${params.lastSetId}:${params.nextSetId}`;
  }
  return null;
}
