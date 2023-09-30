import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getSingleTaskById } from "../api/api";
import SingleTaskForm from "../component/SingleTaskForm";
import Header from "../component/Header";

const SingleTask = () => {

    type SubTaskProps = {
        _id: string;
        title: string;
        description: string;
        priority: string;
        status: string;
        start_date: string;
        end_date: string;
    };

    type TaskProps = {
        _id: string;
        title: string;
        description: string;
        priority: string;
        status: string;
        start_date: string;
        end_date: string;
        subTasks?: SubTaskProps[];
    };

    const [task, setTask] = useState<TaskProps | null>(null);
    const [subtasks, setSubTask] = useState<SubTaskProps[]>([]);
    const { id } = useParams();
    console.log("ID - ", id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const taskIdProp = {
                    task_id: id
                };
                const task = await getSingleTaskById(taskIdProp);
                // console.log("response - ", response);

                // const { task, subTasks } = response;
                // setTask({ ...task, subTasks });
                setTask(task);
                setSubTask(task.subtasks);
                console.log("task - ", task);


            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    console.log("TASK - ", task);
    console.log("sub - ", subtasks);


    if (!task) {
        return null; // Return a loading indicator or any other appropriate component when task is null
    }

    const singleTaskProp = {
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        start_date: task.start_date,
        end_date: task.end_date,
        isTask: true
    }

    console.log(singleTaskProp);

    return (

        <>
            <Header headerTitle="Edit Task" />
            <div className="update-single-task">
                <SingleTaskForm {...singleTaskProp} />
                <div className="subtask-div">
                    <div className="subtask-header">Sub Task</div>
                    {subtasks && subtasks.map((subTask) => (
                        <>
                            <SingleTaskForm key={subTask._id} {...subTask} isTask={false} />
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SingleTask
