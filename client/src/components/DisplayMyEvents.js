import React from "react";
import { useGlobalState } from "./context";
import EventCard from "./EventCard";

function DisplayMyEvents(){
    const { hostedEvents } = useGlobalState()
    return (
        <div className="event-container">
          {hostedEvents.map((event, index) => (
            <EventCard key={index} event={event.event} status={event.status} />
          ))}
        </div>
      );
}

export default DisplayMyEvents