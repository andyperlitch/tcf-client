import { useStageGetEventsQuery } from "@/gql/graphql";
import { Link } from "react-router-dom";

export function EventStagesPage() {
  const { data } = useStageGetEventsQuery();

  const events = data?.events ?? [];

  return (
    <div
      className={`flex h-screen w-screen flex-col items-center justify-center`}
    >
      <h1 className="mb-4 border-b font-hand text-7xl font-bold">
        Event Stages
      </h1>
      <div className="flex flex-col space-y-4">
        {events.map((event) => (
          <Link className="text-4xl" key={event.id} to={`/stage/${event.slug}`}>
            {event.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
