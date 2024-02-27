import React, { useEffect } from "react";
import { useGlobalState } from "./context";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";

function DisplayMyEvents(){
    const { hostedEvents, setHostedEvents, user } = useGlobalState()
    useEffect(() => {
      fetch('/hosted_events')
      .then(r => r.json())
      .then(events => setHostedEvents(events))
    }, [])
    if (!user || hostedEvents.length === 0) {
      return (
        <div className="no-events-container">
          <div className="no-events-message">No Events</div>
          {user && (
            <div>
              <p>
                <Link to="/create-event" className="create-event-button">
                  Create Event
                </Link>
              </p>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="event-container">
        {hostedEvents.map((event, index) => (
          <EventCard key={index} event={event} status={event.status} />
        ))}
      </div>
    );
}

export default DisplayMyEvents