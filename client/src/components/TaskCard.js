import React from "react";

function TaskCard({ description, dueDate, assignedTo }) {
  return (
    <div className="task-card">
      <p><strong>Description:</strong> {description}</p><hr></hr><br></br>
      <p><strong>Due Date:</strong> {dueDate}</p><br></br>
      {assignedTo && <p><strong>Assigned To:</strong> {assignedTo}</p>}
    </div>
  );
}

export default TaskCard;
