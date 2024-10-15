import { AdminContainer } from "@/components/AdminContainer";
import { CreateNewEventButton } from "@/components/CreateNewEventButton";
import { EventsList } from "@/components/EventsList";

export function AdminEvents() {
  return (
    <AdminContainer section="events">
      <h1 className="text-3xl">Events</h1>
      <CreateNewEventButton />
      <EventsList />
    </AdminContainer>
  );
}
