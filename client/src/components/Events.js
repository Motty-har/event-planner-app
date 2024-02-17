import React from "react";
import EventCard from "./EventCard";
import { useGlobalState } from "./context";
import LoadingPage from "./LoadingPage";

function Event() {
  const { events, user } = useGlobalState();

  if (events.length === 0) {
    return (
      <div className="event-container no-events">
        <div className="no-events-message">No Events</div>
      </div>
    );
  }

  return (
    <div className="event-container">
      {events.map((event, index) => (
        <EventCard key={index} event={event.event} status={event.status} />
      ))}
    </div>
  );
}

export default Event;
