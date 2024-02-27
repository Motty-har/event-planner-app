import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import TaskCard from "./TaskCard";
import { useGlobalState } from "./context";


function Event() {
  const { event_id } = useParams();
  const [event, setEvent] = useState();
  const [tasks, setTasks] = useState();
  const [invites, setInvites] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useGlobalState()
  useEffect(() => {
    fetch(`/get_event/${event_id}`)
      .then((resp) => resp.json())
      .then((eventData) => {
        setEvent(eventData);
        setTasks(eventData.tasks);
        setIsLoading(false);
      });
  }, [event_id]);
  console.log(event)
  return (
    <div>
    <div className="centered-container">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="single-event-card">
          <div className="single-event-card-details">
            <h1 className="single-event-card-title">{event.title}</h1><hr></hr>
            <p className="single-event-card-text">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="single-event-card-text">
              <strong>Time:</strong> {event.time}
            </p>
            <p className="single-event-card-text">
              <strong>Location:</strong> {event.location}
            </p><hr></hr>
            <p className="single-event-card-description">
              <strong>Description:</strong> {event.description}
            </p>
          </div>
        </div>
      )}
    </div><hr></hr>
    <div>
    <h1 className="invite-header">Invites</h1>
    {invites && invites.map((invite) => {
  return (
    <div key={invite.id} className="invite-card">
      <h3>
        {invite.user.first_name} {invite.user.last_name}
      </h3>
      <p>
        <strong>Email:</strong> {invite.user.email}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
      </p>
    </div>
  );
})}
    </div><hr></hr>
    {tasks && user.id === event.host_id && tasks.map(task => {
       return (
        <div className="invite-card">
          <p><strong>Description:</strong> {task.description}</p><hr></hr><br></br>
          <p><strong>Due Date:</strong> {task.due_date}</p><br></br>
          <p><strong>Assigned To:</strong> {task.assigned_to}</p>
          <p><strong>Completed:</strong> {!task.completed}</p>
        </div>
      );
    })}
    </div>
  );
}

export default Event;
