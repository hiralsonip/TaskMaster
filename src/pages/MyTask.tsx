import { useState, useEffect } from 'react';
import Header from '../component/Header';
import Task from '../component/Task';
import Search from '../component/Search';
import { getAllTaskOfUser } from '../api/api';
import { Link } from 'react-router-dom';

// Define the type for TaskProps
type TaskProps = {
    _id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    start_date: Date;
    end_date: Date;
};

const MyTask = () => {
    const [search, setSearch] = useState('');

    const [tasks, setTasks] = useState<TaskProps[]>([]);

    // Function to send a GET request to fetch all tasks
    // const sendGetRequest = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/task/getAllUserTask');
    //         setTasks(response.data.data);
    //         console.log("Task - ", response);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            // Get recently completed tasks
            try {
                const tasks = await getAllTaskOfUser();
                setTasks(tasks);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    // Function to delete task
    const handleDelete = (id: number) => {
        setTasks((prev) => prev.filter((task) => task._id !== id));
    };

    // Function to filter tasks based on title
    const searchTask = (title: string) => {
        if (title) {
            setSearch(title);
        } else {
            setSearch('');
        }
    };

    // useEffect(() => {
    //     sendGetRequest();
    // }, []);

    return (
        <div className="app">
            <Header headerTitle="My Tasks" />
            <div className='searchDiv'>
                <Search onSearch={searchTask} />
            </div>

            <div className='test'>
                {tasks && tasks
                    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
                    .map((task) => (
                        // <Link to={`/singletask/${task._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Task
                            title={task.title}
                            description={task.description}
                            priority={task.priority}
                            status={task.status}
                            start_date={task.start_date}
                            end_date={task.end_date}
                            onDelete={() => handleDelete(task._id)}
                            _id={task._id}
                            key={task._id.toString()}
                        />
                        // </Link>
                    ))}
            </div>


        </div>
    );
};

export default MyTask;
