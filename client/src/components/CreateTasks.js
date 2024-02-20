import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useGlobalState } from "./context";
import TaskCard from "./TaskCard";

function CreateTasks() {
    const { selectedUsers } = useGlobalState();
    const { event_id } = useParams();
    const [tasks, setTasks] = useState([]);
  
    const formSchema = yup.object({
      description: yup.string().required("Description is required").max(250),
      dueDate: yup.date().required("Due date is required"),
      assignedTo: yup.string(),
    });
  
    const sortedSelectedUsers = selectedUsers.slice().sort((a, b) => {
      return a.last_name.localeCompare(b.last_name);
    });
  
    const formik = useFormik({
      initialValues: {
        description: "",
        dueDate: "",
        assignedTo: "",
      },
      validationSchema: formSchema,
      onSubmit: (values) => {
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            description: values.description,
            dueDate: values.dueDate,
            assignedTo: values.assignedTo,
          },
        ]);
  
        formik.resetForm();
      },
    });
  
    return (
      <div>
        <div className="task-form-container">
          <h1 className="task-header">Tasks</h1>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                rows={4}
                cols={50}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="error-message">{formik.errors.description}</div>
              )}
            </div><br></br>
  
            <div>
              <label htmlFor="dueDate" style={{ fontSize: '16px' }}>Due Date:</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dueDate}
              />
              {formik.touched.dueDate && formik.errors.dueDate && (
                <div className="error-message">{formik.errors.dueDate}</div>
              )}
            </div><br></br>
  
            <div>
              <label htmlFor="assignedTo">Assigned To (Optional):</label>
              <select
                id="assignedTo"
                name="assignedTo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.assignedTo}
              >
                <option value="" label="Select an option" />
                {sortedSelectedUsers.map((user) => (
                  <option
                    key={user.id}
                    value={`${user.first_name} ${user.last_name}`}
                    label={`${user.first_name} ${user.last_name}`}
                  />
                ))}
              </select>
              {formik.touched.assignedTo && formik.errors.assignedTo && (
                <div className="error-message">{formik.errors.assignedTo}</div>
              )}
            </div><br></br><br></br>
            <div className="submit-button-container">
              <button type="submit" className="submit-button">Create Task</button>
              <button type="submit" className="submit-button">Submit Tasks</button>
            </div>
          </form>
        </div>
  
        {tasks.length > 0 ? (
          <div className="task-container">
            {tasks.map((task, index) => (
              <TaskCard
                key={index}
                description={task.description}
                dueDate={task.dueDate}
                assignedTo={task.assignedTo}
              />
            ))}
          </div>
        ) : null}
        
      </div>
    );
  }
  
  export default CreateTasks;