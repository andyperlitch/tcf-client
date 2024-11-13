import { Beacon } from "@/components/beacon/Beacon";
import { Loader } from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ENGAGEMENT_DEFINITIONS } from "@/engagements";
import { AdminEngagementFragment, useAdminGetEventQuery } from "@/gql/graphql";
import { useParamsSafe } from "@/hooks/useParamsSafe";
import { useSetActiveEngagement } from "@/hooks/useSetActiveEngagement";
import { useSortedAdminEngagements } from "@/hooks/useSortedEngagements";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export function AdminEventControlPage() {
  const { slug } = useParamsSafe("slug");
  // const navigate = useNavigate();

  const { data, loading, error } = useAdminGetEventQuery({
    fetchPolicy: "network-only",
    variables: {
      slug: slug || "",
    },
  });

  const sortedEngagements = useSortedAdminEngagements(
    data?.event?.engagements || []
  );

  const { setActive } = useSetActiveEngagement({
    activeId: data?.event?.activeEngagementId,
    eventId: data?.event?.id,
  });

  if (loading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );

  if (error) return <div>Error</div>;

  if (!data?.event) return <div>Event not found</div>;

  if (!sortedEngagements.length) return <div>No engagements</div>;

  const event = data.event;

  const activeEngagementId = event.activeEngagementId;

  if (activeEngagementId && !event.activeEngagement) {
    console.error(
      `event.activeEngagementId is set but no active engagement found`
    );
    throw new Error(
      `event.activeEngagementId is set but no active engagement found`
    );
  }

  if (event.activeEngagement && !event.activeEngagement?.type) {
    throw new Error("activeEngagement.type is not set");
  }

  const definition = event.activeEngagement
    ? ENGAGEMENT_DEFINITIONS[event.activeEngagement.type]
    : null;

  return (
    <div
      data-name="ADMIN-EVENT-CONTROL-PAGE"
      className={`flex h-screen w-screen flex-col items-stretch overflow-hidden`}
    >
      <Button className="absolute left-2 top-2">
        <Link to={`/admin/events/${event.slug}`}>
          <ResetIcon />
        </Link>
      </Button>
      <div className="flex-1">
        {activeEngagementId && event.activeEngagement ? (
          <>
            {definition?.adminControlView ? (
              <definition.adminControlView
                key={activeEngagementId}
                engagement={event.activeEngagement}
              />
            ) : (
              <>Active Engagement...</>
            )}
          </>
        ) : (
          <>
            <div
              data-name="EVENT-NAME"
              className={`p-4 pb-0 text-center text-lg font-bold`}
            >
              {event.name}
            </div>
            <p
              data-name="CHOOSE-ENGAGEMENT"
              className={`p-2 text-center text-sm italic`}
            >
              Tap an engagement to activate
            </p>
            {sortedEngagements.length && (
              <div
                data-name="ENGAGEMENT-ITEMS"
                className={`flex flex-1 flex-col items-stretch justify-end`}
              >
                {sortedEngagements.map((e) => {
                  return (
                    <div
                      key={e.id}
                      data-name="ENGAGEMENT-ITEM"
                      className="flex justify-between border-t p-4"
                      onClick={() => setActive(e.id)}
                    >
                      <span>
                        {e.order + 1}. {e.title}
                      </span>{" "}
                      <Badge>{e.type}</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <div
        data-name="BOTTOM-EVENT-CONTROLS"
        className={`
          flex-0 flex items-center

          ${activeEngagementId ? `justify-between` : `justify-center`}

          border-t p-4
        `}
      >
        {activeEngagementId ? (
          <BottomEngagementControls
            key={activeEngagementId}
            activeEngagement={event.activeEngagement!}
            setActive={setActive}
            sortedEngagements={sortedEngagements}
          />
        ) : (
          <Button
            variant="constructive"
            onClick={() => setActive(sortedEngagements[0].id)}
          >
            Start "{sortedEngagements[0].title}"
          </Button>
        )}
      </div>
    </div>
  );
}

function BottomEngagementControls({
  activeEngagement,
  setActive,
  sortedEngagements,
}: {
  activeEngagement: AdminEngagementFragment;
  setActive: (id: number) => void;
  sortedEngagements: AdminEngagementFragment[];
}) {
  const { prevEngagementId, nextEngagementId } = useMemo(() => {
    if (!activeEngagement?.id)
      return { prevEngagementId: null, nextEngagementId: null };

    const activeIndex = sortedEngagements.findIndex(
      (e) => e.id === activeEngagement.id
    );

    let prevEngagementId = null;
    let nextEngagementId = null;

    if (activeIndex > 0) {
      prevEngagementId = sortedEngagements[activeIndex - 1].id;
    }

    if (activeIndex < sortedEngagements.length - 1) {
      nextEngagementId = sortedEngagements[activeIndex + 1].id;
    }

    return { prevEngagementId, nextEngagementId };
  }, [sortedEngagements, activeEngagement?.id]);

  return (
    <>
      <Button
        variant="ghost"
        disabled={!prevEngagementId}
        onClick={() => {
          if (prevEngagementId) setActive(prevEngagementId);
        }}
      >
        <ArrowLeftIcon />
      </Button>

      <ActiveEngagementPicker
        activeEngagement={activeEngagement}
        sortedEngagements={sortedEngagements}
        setActive={setActive}
      />

      <Button
        variant="ghost"
        disabled={!nextEngagementId}
        onClick={() => {
          if (nextEngagementId) setActive(nextEngagementId);
        }}
      >
        <ArrowRightIcon />
      </Button>
    </>
  );
}

function ActiveEngagementPicker({
  activeEngagement,
  sortedEngagements,
  setActive,
}: {
  activeEngagement: AdminEngagementFragment | null;
  sortedEngagements: AdminEngagementFragment[];
  setActive: (id: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className="p-2"
          onClick={() => setIsOpen((lastValue) => !lastValue)}
        >
          {activeEngagement?.title}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className={`flex flex-col items-stretch`}>
          {sortedEngagements.map((e) => {
            const { icon } = ENGAGEMENT_DEFINITIONS[e.type];

            return (
              <div
                className={`
                  flex min-w-64 items-center justify-between space-x-2 border-t
                  p-4

                  first:border-none
                `}
                key={e.id}
                onClick={() => setActive(e.id)}
              >
                <Beacon
                  state={e.id === activeEngagement?.id ? "active" : "inactive"}
                />
                <span>{e.title}</span>
                {icon}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
