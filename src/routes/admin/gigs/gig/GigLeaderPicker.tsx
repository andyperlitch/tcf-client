import { InfoIcon } from "@/components/InfoIcon";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Label } from "@/components/ui/label";
import {
  GigFragment,
  Role,
  useAdminGetUsersQuery,
  useBandUpdateGigMutation,
} from "@/gql/graphql";
import { createLogger } from "@/utils/createLogger";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useCallback, useMemo } from "react";

const logger = createLogger("GigLeaderPicker");

interface Option {
  value: string;
  id: number;
  label: string;
  keywords?: string[];
}

export function GigLeaderPicker({ gig }: { gig: GigFragment }) {
  const { data: usersData } = useAdminGetUsersQuery({
    variables: {
      filter: {
        includeRoles: [Role.Admin, Role.Bandmate],
      },
    },
  });

  const [updateGig] = useBandUpdateGigMutation();

  const users: Option[] = useMemo(() => {
    return (
      usersData?.users.map((user) => ({
        value: user.id.toString(),
        id: user.id,
        label: user.name || user.username || user.email || `user-${user.id}`,
        keywords: [user.name, user.username, user.email].filter(
          Boolean
        ) as string[],
      })) || []
    );
  }, [usersData]);

  const onLeaderSelect = useCallback(
    (selected: Option) => {
      logger.info("leader selected", selected);
      updateGig({
        variables: {
          gigId: gig.id,
          data: {
            gigLeaderId: selected.id,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ __typename: "Gig", id: gig.id }),
            fields: {
              gigLeaderId: () => selected.id,
            },
          });
        },
      }).then(() => {
        logger.info("gig leader updated");
      });
    },
    [gig.id, updateGig]
  );

  const value = users.find((user) => user.id === gig.gigLeaderId);

  logger.log(`andy value`, value, gig.gigLeaderId);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Label>
          Gig Leader{" "}
          <InfoIcon icon={InfoCircledIcon} className="inline-block">
            <div className={`max-w-[300px]`}>
              Whatever song the leader of the band is on, other members can
              "follow" them, so the active song will automatically change to
              match the leader's screen
            </div>
          </InfoIcon>
        </Label>
        <Autocomplete items={users} onSelect={onLeaderSelect} value={value} />
      </div>
    </div>
  );
}
