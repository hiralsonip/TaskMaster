import { useState } from "react";
import { updateSubTaskById, updateTaskById } from "../api/api";

type SingleTaskProp = {
    _id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    start_date: string;
    end_date: string;
    isTask: boolean;
}

const SingleTaskForm = (singleTaskProp: SingleTaskProp) => {
    const id = singleTaskProp._id;
    const isTask = singleTaskProp.isTask;
    const [title, setTitle] = useState(singleTaskProp.title);
    const [description, setDescription] = useState(singleTaskProp.description);
    const [priority, setPriority] = useState(singleTaskProp.priority);
    const [status, setStatus] = useState(singleTaskProp.status);
    const [startDate, setStartDate] = useState(new Date(singleTaskProp.start_date).toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState(new Date(singleTaskProp.end_date).toISOString().substr(0, 10));

    const [error, setError] = useState<string | null>(null);
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            console.log("is null");
            setError("Title is empty");
        } else {
            setError("");
        }
        console.log(e.target.value);
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            console.log("is null");
            setError("Description is empty");
        } else {
            setError("");
        }
        setDescription(e.target.value);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = new Date(e.target.value);
        setStartDate(newStartDate.toISOString().substr(0, 10));
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = new Date(e.target.value);
        setEndDate(newEndDate.toISOString().substr(0, 10));
    };

    const handleUpdate = async () => {
        console.log("in the update");
        const taskProp = {
            id: id,
            title: title,
            description: description,
            priority: priority,
            status: status,
            start_date: startDate,
            end_date: endDate
        }

        try {
            const response = (isTask) ? await updateTaskById(taskProp) : await updateSubTaskById(taskProp);
            console.log(response?.data.status);
            setUpdateMessage("Task updated successfully");
            setTimeout(() => {
                setUpdateMessage(null);
            }, 2000);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="single-task-form">
                {error && <div className="single-task-error">{error}</div>}
                <div className="field-group">
                    <div className="input-field-outer">
                        <div className="input-label">Title</div>
                        <div>
                            <input
                                required
                                type="text"
                                className="input-text"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </div>
                    </div>
                    <div className="input-field-outer">
                        <div className="input-label">Description</div>
                        <div>
                            <input
                                required
                                type="text"
                                className="input-text"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="field-group">
                    <div className="input-field-outer">
                        <div className="input-label">Priority</div>
                        <div>
                            <select required value={priority} className="input-text input-select" onChange={handlePriorityChange}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-field-outer">
                        <div className="input-label">Status</div>
                        <div>
                            <select required value={status} className="input-text input-select" onChange={handleStatusChange}>
                                <option value="pending">Pending</option>
                                <option value="inProgress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field-group">
                    <div className="input-field-outer">
                        <div className="input-label">Start Date</div>
                        <div><input required type="date" className="input-text input-date" value={startDate} onChange={handleStartDateChange} /></div>
                    </div>
                    <div className="input-field-outer">
                        <div className="input-label">End Date</div>
                        <div>
                            <input
                                required
                                type="date"
                                className="input-text input-date"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </div>
                    </div>
                </div>
                {updateMessage && <div className="update-message">{updateMessage}</div>}
                <div className="btn-field-outer">
                    <input type="submit" value="Update" className="input-text field-btn"
                        onClick={() => handleUpdate()} />
                </div>
            </div>
        </>
    )
}

export default SingleTaskForm;
