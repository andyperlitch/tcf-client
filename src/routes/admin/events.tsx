import { AdminContainer } from "@/components/AdminContainer";
import { CreateNewEventButton } from "@/components/CreateNewEventButton";
import { EventsList } from "@/components/EventsList";

export function AdminEvents() {
  return (
    <AdminContainer section="events">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-row items-baseline space-x-2">
          <h1 className="text-3xl">Events</h1>
          <CreateNewEventButton />
        </div>
        <EventsList />
      </div>
    </AdminContainer>
  );
}

export default AdminEvents;
