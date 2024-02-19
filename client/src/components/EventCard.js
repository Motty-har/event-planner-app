// EventCard.js

import React from "react";

function EventCard({ event, status }) {
  const { title, description, date, time, location } = event;

  return (
    <div className="event-card">
      <h2 className="event-card-title">{title}</h2>
      <hr></hr>
      
      <div className="event-card-details">
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
      </div>
      <hr></hr>
      <p className="event-card-description">{description}</p>
      <hr></hr>
      <p className="event-card-status">
        <strong>Status:</strong> {status}
      </p>
    </div>
  );
}

export default EventCard;
