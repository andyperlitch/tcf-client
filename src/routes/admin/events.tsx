import { AdminContainer } from "@/components/AdminContainer";
import { CreateNewEventButton } from "@/components/CreateNewEventButton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { EventsList } from "@/components/EventsList";
import { Loader } from "@/components/Loader";
import { useAdminGetEventsQuery } from "@/gql/graphql";

export function AdminEvents() {
  const { loading, error, data, refetch } = useAdminGetEventsQuery();
  return (
    <AdminContainer section="events">
      {loading && <Loader />}
      {error && <ErrorMessage error={error} retry={refetch} />}
      {data?.events && (
        <div className="flex flex-col space-y-8">
          <div className="flex flex-row items-baseline space-x-2">
            <h1 className="text-3xl">Events</h1>
            <CreateNewEventButton />
          </div>
          <h2>Upcoming Events</h2>
          <EventsList
            events={
              data.events.filter(
                (event) => new Date(event.date) > new Date()
              ) || []
            }
          />
          <h2>Past Events</h2>
          <EventsList
            events={
              data.events.filter(
                (event) => new Date(event.date) < new Date()
              ) || []
            }
          />
        </div>
      )}
    </AdminContainer>
  );
}

export default AdminEvents;
