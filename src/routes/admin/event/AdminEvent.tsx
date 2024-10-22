import { AdminContainer } from "@/components/AdminContainer";
import { format } from "date-fns";
import { ReactNode } from "react";
import { LiveSwitch } from "./LiveSwitch";
import { CreateNewEngagementButton } from "@/components/CreateNewEngagementButton";
import { EngagementsList } from "@/components/EngagementsList";
import {
  useAdminGetEventQuery,
  useAdminUpdateEventMutation,
} from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";

export function AdminEvent() {
  const { slug } = useParamsSafe("slug");
  const { data, loading, error } = useAdminGetEventQuery({
    variables: {
      slug: slug || "",
    },
  });

  const [updateEvent, { loading: updateLoading }] =
    useAdminUpdateEventMutation();

  const setLive = (live: boolean) => {
    if (data?.event) {
      updateEvent({
        variables: {
          id: data.event.id,
          data: {
            live,
          },
        },
      });
    }
  };

  let content: ReactNode = "";

  if (loading) {
    content = <p className="text-muted">Loading...</p>;
  } else if (error) {
    content = <p className="text-red-500">Error: {error.message}</p>;
  } else if (data?.event) {
    const crumbs: CrumbMeta[] = [["/admin/events", "Events"]];
    content = (
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <SimpleCrumbs crumbs={crumbs} />
          <h1 className="flex items-baseline space-x-5 text-3xl">
            <span>{data.event.name}</span>{" "}
            <LiveSwitch
              live={data.event.live}
              setLive={setLive}
              loading={updateLoading}
            />
          </h1>
        </div>

        <p className="text-foreground">{data.event.description}</p>
        <div className="flex flex-col space-y-3">
          <p className="text-foreground">📍 {data.event.location}</p>
          <p className="text-foreground">📆 {format(data.event.date, "PPP")}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="mt-10 flex items-baseline space-x-5 text-2xl">
            <span>Engagements</span>{" "}
            <CreateNewEngagementButton
              eventId={data.event.id}
              eventSlug={data.event.slug}
            />
          </h2>
          <EngagementsList
            eventSlug={data.event.slug}
            eventId={data.event.id}
          />
        </div>
      </div>
    );
  }

  return <AdminContainer section="events">{content}</AdminContainer>;
}
