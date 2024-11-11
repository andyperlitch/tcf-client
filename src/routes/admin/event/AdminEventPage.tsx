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
import { EditableText } from "@/components/EditableText";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function AdminEventPage() {
  const { slug } = useParamsSafe("slug");
  const { data, loading, error } = useAdminGetEventQuery({
    fetchPolicy: "network-only",
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

  const updateEventName = (name: string) => {
    if (data?.event) {
      return updateEvent({ variables: { id: data.event.id, data: { name } } });
    }
  };

  const updateEventDescription = (description: string) => {
    if (data?.event) {
      return updateEvent({
        variables: { id: data.event.id, data: { description } },
      });
    }
  };

  const updateEventSlug = (slug: string) => {
    if (data?.event) {
      return updateEvent({ variables: { id: data.event.id, data: { slug } } });
    }
  };

  const updateEventLocation = (location: string) => {
    if (data?.event) {
      return updateEvent({
        variables: { id: data.event.id, data: { location } },
      });
    }
  };

  const updateLocked = (locked: boolean) => {
    if (data?.event) {
      return updateEvent({
        variables: { id: data.event.id, data: { locked } },
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
      <div className="flex flex-col space-y-2">
        <SimpleCrumbs crumbs={crumbs} />
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <div className={`flex items-baseline justify-between space-x-5`}>
              <div className="flex items-baseline space-x-2">
                <EditableText
                  locked={data.event.locked}
                  element="h1"
                  elementProps={{ className: "text-3xl" }}
                  value={data.event.name}
                  setValue={updateEventName}
                />
                <div className="flex space-x-0">
                  <pre className="text-muted text-md">/event/</pre>
                  <EditableText
                    locked={data.event.locked}
                    element="pre"
                    elementProps={{
                      className: "text-md text-muted-foreground",
                    }}
                    value={data.event.slug}
                    setValue={updateEventSlug}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <LiveSwitch
                  live={data.event.live}
                  setLive={setLive}
                  loading={updateLoading}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edits-locked"
                    checked={data.event.locked}
                    onCheckedChange={updateLocked}
                    disabled={loading}
                    className="data-[state=checked]:bg-destructive"
                  />
                  <Label htmlFor="edits-locked">Lock</Label>
                </div>
              </div>
            </div>
          </div>

          <EditableText
            locked={data.event.locked}
            element="div"
            elementProps={{ className: "text-foreground" }}
            value={data.event.description || ""}
            setValue={updateEventDescription}
          />
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-1 text-foreground">
              <div>📍</div>
              <EditableText
                locked={data.event.locked}
                element="div"
                elementProps={{ className: "text-foreground" }}
                value={data.event.location || ""}
                setValue={updateEventLocation}
              />
            </div>
            <div className="text-foreground">
              📆 {format(data.event.date, "PPP")}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="mt-10 flex items-baseline space-x-5 text-2xl">
              <span>Engagements</span>{" "}
              <CreateNewEngagementButton
                eventId={data.event.id}
                eventSlug={data.event.slug}
              />
            </h2>
            {data.event && <EngagementsList event={data.event} />}
          </div>
        </div>
      </div>
    );
  }

  return <AdminContainer section="events">{content}</AdminContainer>;
}
