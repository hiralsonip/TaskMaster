import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { GrOverview } from 'react-icons/gr';
import { Link } from 'react-router-dom';

type TaskProps = {
    _id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    start_date: Date;
    end_date: Date;
    onDelete: (task_id: number) => void;
};

const iconStyle = {
    height: '23px',
    width: '23px',
};

const Task: React.FC<TaskProps> = ({
    _id,
    title,
    description,
    priority,
    status,
    start_date,
    end_date,
    onDelete,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        title,
        description,
        priority,
        status,
        start_date: new Date(start_date),
        end_date: new Date(end_date),

    });

    const handleDelete = () => {
        onDelete(_id);
    };

    const handleUpdate = () => {
        // Perform the update action
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset the updatedTask state and exit editing mode
        setUpdatedTask({
            title,
            description,
            priority,
            status,
            start_date,
            end_date,
        });
        setIsEditing(false);
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
        >
    ) => {
        const { name, value } = e.target;
        setUpdatedTask((prev) => ({ ...prev, [name]: value }));
    };

    const getPriorityClassName = () => {
        switch (priority) {
            case 'High':
                return 'task-card high-priority';
            case 'high':
                return 'task-card high-priority';
            case 'Medium':
                return 'task-card medium-priority';
            case 'medium':
                return 'task-card medium-priority';
            case 'Low':
                return 'task-card low-priority';
            case 'low':
                return 'task-card low-priority';
            default:
                return 'task-card';
        }
    };

    return (

        <div className="myTasks">
            <div className={getPriorityClassName()}>
                <h3>{title}</h3>
                {isEditing ? (
                    <div className="task-form">
                        <input
                            type="text"
                            name="title"
                            value={updatedTask.title}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="description"
                            value={updatedTask.description}
                            onChange={handleInputChange}
                        ></textarea>
                        <select
                            name="priority"
                            value={updatedTask.priority}
                            onChange={handleInputChange}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <select
                            name="status"
                            value={updatedTask.status}
                            onChange={handleInputChange}
                        >
                            <option value="ToDo">ToDo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                        <input
                            type="date"
                            name="start_date"
                            value={updatedTask.start_date.toISOString().slice(0, 10)}
                            onChange={handleInputChange}
                        />
                        <input
                            type="date"
                            name="end_date"
                            value={updatedTask.end_date.toISOString().slice(0, 10)}
                            onChange={handleInputChange}
                        />
                        <button className="update-task-button" onClick={handleUpdate}>
                            Update
                        </button>
                        <button className="cancel-task-button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="task-details">
                        <p>{description}</p>
                        <p>Status: {status}</p>
                        <p>Start Date: {start_date.toLocaleString()}</p>
                        <p>End Date: {end_date.toLocaleString()}</p>
                        <div className='btnDiv'>
                            <div className="removeTask" onClick={handleDelete}>
                                <MdDelete style={iconStyle}></MdDelete>
                            </div>
                            &nbsp;&nbsp;
                            <Link to={`/singletask/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="viewTask" onClick={() => setIsEditing(true)}>
                                    <GrOverview style={iconStyle}></GrOverview>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};


export default Task;
