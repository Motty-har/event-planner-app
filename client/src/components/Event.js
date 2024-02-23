import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useGlobalState } from "./context";



function Event() {
  const { event_id } = useParams();
  const { user } = useGlobalState()
  const [event, setEvent] = useState();
  const [tasks, setTasks] = useState();
  const [invites, setInvites] = useState()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/get_event/${event_id}`)
      .then((resp) => resp.json())
      .then((eventData) => {
        setEvent(eventData);
        setTasks(eventData.tasks);
  
        const sortedInvites = eventData.invitations.sort((a, b) =>
          a.user.last_name.localeCompare(b.user.last_name)
        );
        setInvites(sortedInvites);
        setIsLoading(false);
      });
  }, [event_id]);
  
  function handleCompleted(taskId) {
    fetch(`/task_status/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to mark task as completed');
      }
      setTasks(prevTasks => prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed 
          };
        }
        return task;
      }));
    })
    .catch(error => {
      console.error('Error marking task as completed:', error);
    });
  }
  
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
    </div><br></br>
    <div>
    </div>
    <h1 className="invite-header">Tasks:</h1>
    
    {tasks && tasks.map(task => {
    return (
        <div className="invite-card" key={task.id}>
            <p><strong>Description:</strong> {task.description}</p>
            <hr />
            <br />
            <p><strong>Due Date:</strong> {task.due_date}</p>
            <br />
            <p><strong>Assigned To:</strong> {task.assigned_to}</p>
            <p><strong>Completed:</strong> {task.completed ? "Yes" : "No"} {task.assigned_to === user.id && (
                <button onClick={() => handleCompleted(task.id)}>{!task.completed ? "Mark as Completed" : "↩"}</button>
            )}</p>
        </div>
    );
})}

    </div>
  );
}

export default Event;
