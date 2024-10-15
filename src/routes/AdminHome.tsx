import { CreateNewEventButton } from "@/components/CreateNewEventButton";
import { EventsList } from "@/components/EventsList";
import { ModeToggle } from "@/components/ModeToggle";

export function AdminHome() {
  return (
    <>
      <div className="max-w-4xl mx-auto justify-center relative z-[2] p-4">
        <h1 className="text-3xl mb-8">Admin Home</h1>
        <div className="events-section">
          <h2 className="text-2xl flex flex-row align-middle">
            <span className="mr-3">Events</span>
            <CreateNewEventButton />
          </h2>
          <EventsList />
        </div>
      </div>
      <ModeToggle />
    </>
  );
}
