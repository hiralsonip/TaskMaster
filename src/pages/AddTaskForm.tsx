import React, { FormEvent, useState } from "react";
import axios from "axios";
import "./AddTaskForm.css";
import AuthService from "../services/auth.service";



interface Task {
  title: string;
  description: string;
  priority: string;
  status: string;
  start_date: string;
  end_date: string;
  subTasks: SubTask[];
}

interface SubTask {
  title: string;
  description: string;
  priority: string;
  status: string;
  start_date: string;
  end_date: string;
}

interface AddTaskFormProps {
  onCloseForm: () => void;
  onAddTask: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onCloseForm,
  onAddTask,
}) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    priority: "",
    status: "",
    start_date: "",
    end_date: "",
    subTasks: [],
  });

  const [formDataVisible, setFormDataVisible] = useState(true);
  const [submitformDataVisible, setsubmitformDataVisible] = useState(false);

  const handleTaskChange = (field: keyof Task, value: string) => {
    setTask({ ...task, [field]: value });
  };

  const handleSubTaskChange = (
    index: number,
    field: keyof SubTask,
    value: string
  ) => {
    const updatedSubTasks = [...task.subTasks];
    updatedSubTasks[index][field] = value;
    setTask({ ...task, subTasks: updatedSubTasks });
  };

  const handleSubmit = async () => {
    onAddTask(task);
    onCloseForm();
    resetForm();

    // API Call

    try {

      console.log("Task On Api - ", task);
      // Make the POST request to the server API
      const params = new URLSearchParams();
      params.append('description', task.description);
      params.append('title', task.title);
      params.append('priority', task.priority);
      params.append('status', task.status);
      params.append('start_date', task.start_date);
      params.append('end_date', task.end_date);

      task.subTasks.forEach((subTask, index) => {
        params.append(`subtasks[${index}][description]`, subTask.description);
        params.append(`subtasks[${index}][title]`, subTask.title);
        params.append(`subtasks[${index}][priority]`, subTask.priority);
        params.append(`subtasks[${index}][status]`, subTask.status);
        params.append(`subtasks[${index}][start_date]`, subTask.start_date);
        params.append(`subtasks[${index}][end_date]`, subTask.end_date);
      });

      const response = await axios.post(
        "http://localhost:3000/task/addTask", params.toString(),
        {
          headers:
          {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      console.log("RES - ", response);


      // Check the response and handle accordingly
      if (response.status === 200) {
        // Task added successfully
        console.log("Task added successfully");
        onAddTask(task);
        onCloseForm();
        resetForm();
      } else {
        // Handle other status codes or error cases
        console.log("Error adding task");
      }
    } catch (error) {
      // Handle any errors
      console.error("Error adding task:", error);
    }
  };
  const handleAddTask = () => {
    onCloseForm;
    setFormDataVisible(false);
    setsubmitformDataVisible(true);
  };
  const handleAddSubTask = () => {
    const newSubTask: SubTask = {
      title: "",
      description: "",
      priority: "",
      status: "",
      start_date: "",
      end_date: "",
    };
    setTask({ ...task, subTasks: [...task.subTasks, newSubTask] });
  };

  const resetForm = () => {
    setTask({
      title: "",
      description: "",
      priority: "",
      status: "",
      start_date: "",
      end_date: "",
      subTasks: [],
    });
  };

  const canAddSubTask = task.title === "";

  return (
    <div>
      {formDataVisible && (
        <div className="add-task-container">
          <form onSubmit={handleSubmit} className="add-task-form">
            <h3>Add Task</h3>

            <div className="display-grid">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-Title"
                  placeholder="Title"
                  value={task.title}
                  onChange={(e) => handleTaskChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="form-description">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  placeholder="Description"
                  value={task.description}
                  onChange={(e) =>
                    handleTaskChange("description", e.target.value)
                  }
                  required
                ></textarea>
              </div>
              <div className="form-row">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  className="form-control"
                  value={task.priority}
                  onChange={(e) => handleTaskChange("priority", e.target.value)}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  className="form-control"
                  value={task.status}
                  onChange={(e) => handleTaskChange("status", e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="start_date">Start Date</label>
                <input
                  type="date"
                  id="start_date"
                  className="form-control"
                  value={task.start_date}
                  onChange={(e) =>
                    handleTaskChange("start_date", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="end_date">End Date</label>
                <input
                  type="date"
                  id="end_date"
                  className="form-control"
                  value={task.end_date}
                  onChange={(e) => handleTaskChange("end_date", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-buttons">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
            <div className="form-buttons">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCloseForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Display form data */}
      {submitformDataVisible && (
        <div className="form-data-container">
          <form className="add-task-form">
            <p>
              <h3>
                <strong>Title:</strong> {task.title}
              </h3>
            </p>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}&nbsp; &nbsp; &nbsp;
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Start Date:</strong> {task.start_date}&nbsp; &nbsp; &nbsp;
              <strong>End Date:</strong> {task.end_date}
            </p>
            <div className="subtasks-section">
              {task.subTasks.map((subTask, index) => (
                <div key={index} className="subtask">
                  <h3>Sub Tasks</h3>

                  <div className="display-grid">
                    <div className="form-group">
                      <label htmlFor={`subtaskTitle${index}`}>Title</label>
                      <input
                        type="text"
                        id={`subtaskTitle${index}`}
                        className="form-Title"
                        placeholder="Title"
                        value={subTask.title}
                        onChange={(e) =>
                          handleSubTaskChange(index, "title", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`subtaskDescription${index}`}>
                        Description
                      </label>
                      <textarea
                        id={`subtaskDescription${index}`}
                        className="form-control"
                        placeholder="Description"
                        value={subTask.description}
                        onChange={(e) =>
                          handleSubTaskChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        required
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor={`subtaskPriority${index}`}>
                          Priority
                        </label>
                        <select
                          id={`subtaskPriority${index}`}
                          className="form-control"
                          value={subTask.priority}
                          onChange={(e) =>
                            handleSubTaskChange(
                              index,
                              "priority",
                              e.target.value
                            )
                          }
                          required
                        >
                          <option value="">Select Priority</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor={`subtaskStatus${index}`}>Status</label>
                        <select
                          id={`subtaskStatus${index}`}
                          className="form-control"
                          value={subTask.status}
                          onChange={(e) =>
                            handleSubTaskChange(index, "status", e.target.value)
                          }
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="todo">To Do</option>
                          <option value="inprogress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor={`subtaskstart_date${index}`}>
                          Start Date
                        </label>
                        <input
                          type="date"
                          id={`subtaskstart_date${index}`}
                          className="form-control"
                          value={subTask.start_date}
                          onChange={(e) =>
                            handleSubTaskChange(
                              index,
                              "start_date",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor={`subtaskend_date${index}`}>
                          End Date
                        </label>
                        <input
                          type="date"
                          id={`subtaskend_date${index}`}
                          className="form-control"
                          value={subTask.end_date}
                          onChange={(e) =>
                            handleSubTaskChange(
                              index,
                              "end_date",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="form-buttons">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAddSubTask}
                >
                  + Add SubTask
                </button>
              </div>
              <div className="form-buttons">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
