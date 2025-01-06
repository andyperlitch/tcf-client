import { AdminContainer } from "@/components/AdminContainer";
import { ReactNode, useRef } from "react";
import { LiveSwitch } from "./LiveSwitch";
import { CreateNewEngagementButton } from "@/components/CreateNewEngagementButton";
import { EngagementsList } from "@/components/EngagementsList";
import { useAdminGetEventQuery } from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { CrumbMeta, SimpleCrumbs } from "@/components/SimpleCrumbs";
import { EditableText } from "@/components/EditableText";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAdminEventHandlers } from "./useAdminEventHandlers";
import { EditableTextarea } from "@/components/EditableTextarea";
import { EditableDate } from "@/components/EditableDate";
import { Button } from "@/components/ui/button";
import {
  MixerVerticalIcon,
  MobileIcon,
  SectionIcon,
} from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { StageEditor } from "./StageEditor/StageEditor";
import { StageStateProvider } from "@/providers/StageStateProvider";
import { AdminStageStateProvider } from "@/providers/StageStateProvider/AdminStageStateProvider";

const enableControlView = false;

export function AdminEventPage() {
  const { slug } = useParamsSafe("slug");
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { data, loading, error } = useAdminGetEventQuery({
    fetchPolicy: "network-only",
    variables: {
      slug: slug || "",
    },
  });

  const {
    setLive,
    updateEventName,
    updateEventDescription,
    updateEventSlug,
    updateEventDate,
    updateEventLocation,
    updateLocked,
    updateLoading,
  } = useAdminEventHandlers({ event: data?.event });

  let content: ReactNode = "";

  if (loading) {
    content = <p className="text-muted">Loading...</p>;
  } else if (error) {
    content = <p className="text-red-500">Error: {error.message}</p>;
  } else if (data?.event) {
    const crumbs: CrumbMeta[] = [["/admin/events", "Events"]];
    content = (
      <div data-name="ADMIN-EVENT-PAGE" className="flex flex-col space-y-2">
        <SimpleCrumbs crumbs={crumbs} />
        <div data-name="CONTROLS" className="flex flex-col space-y-8">
          <div
            data-name="NAME-SLUG-SWITCHES"
            className={`flex flex-col space-y-2`}
          >
            <div
              data-name="NAME-SLUG-SWITCHES-INNER"
              className={`
                flex flex-col items-baseline justify-between space-x-5

                md:flex-row
              `}
            >
              <EditableText
                locked={data.event.locked}
                element="h1"
                elementProps={{ className: "text-3xl" }}
                value={data.event.name}
                setValue={updateEventName}
              />
              <div className="flex flex-col space-y-2">
                <div data-name="SLUG" className="flex space-x-0">
                  <pre className="text-muted text-md">slug: </pre>
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
                {/* react router link to stage view, which is `/stage/${data.event.slug}`, should be target="_blank" */}
                <div className="flex space-x-2">
                  <Link
                    to={`/stage/${data.event.slug}`}
                    target="_blank"
                    className="text-muted-foreground"
                  >
                    <SectionIcon className="mr-2 inline-block h-4 w-4" />
                    stage view
                  </Link>
                  {/* react router link to mobile view, which is `/e/${data.event.slug}`, should be target="_blank" */}
                  <Link
                    to={`/e/${data.event.slug}`}
                    target="_blank"
                    className="text-muted-foreground"
                  >
                    <MobileIcon className="mr-2 inline-block h-4 w-4" />
                    mobile view
                  </Link>
                </div>
              </div>
            </div>
            <div data-name="SWITCHES" className="flex items-center space-x-2">
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

          <EditableTextarea
            locked={data.event.locked}
            element="div"
            elementProps={{ className: "text-foreground" }}
            value={data.event.description || ""}
            setValue={updateEventDescription}
            placeholder="Description"
          />
          <div
            data-name="LOCATION-AND-DATE"
            className="flex flex-col space-y-3"
          >
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
            {/* <div className="text-foreground">
              📆 {format(data.event.date, "PPP")}
            </div> */}
            <EditableDate
              locked={data.event.locked}
              value={data.event.date}
              setValue={updateEventDate}
            />
          </div>

          <div
            className={`
              fixed bottom-4 left-1/2 flex -translate-x-1/2 justify-center
              space-x-2
            `}
          >
            {enableControlView && (
              <Button
                variant="default"
                onClick={() =>
                  navigate(`/admin/events/${data.event?.slug}/control`)
                }
              >
                <MixerVerticalIcon className="mr-2 h-4 w-4" />
                Enter Control View
              </Button>
            )}
          </div>
          <h2 className="mt-10 flex items-baseline space-x-5 text-2xl">
            Stage Editor
          </h2>
          <StageStateProvider event={data.event}>
            <AdminStageStateProvider event={data.event} iframeRef={iframeRef}>
              <StageEditor event={data.event} ref={iframeRef} />
            </AdminStageStateProvider>
          </StageStateProvider>

          <div
            data-name="ENGAGEMENTS"
            className="flex flex-col space-y-2 pb-36"
          >
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

export default AdminEventPage;
