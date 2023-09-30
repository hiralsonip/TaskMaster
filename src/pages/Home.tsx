import Header from "../component/Header"
import '../App.css'
import { useState } from "react";
import "../App.css";
import AddTaskForm from "./AddTaskForm";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import HomeTask from "../component/HomeTask.tsx";
import authHeader from "../services/auth-header.tsx";
import { getAllTaskOfUser } from "../api/api.tsx";

const Home = () => {

  // console.log("Current", AuthService.getCurrentUser().data._id);

  type TaskProps = {
    _id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    start_date: Date;
    end_date: Date;
  };

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [task_imp, setTasksImp] = useState<TaskProps[]>([]);
  console.log("IMP - ", authHeader());

  useEffect(() => {
    const fetchData = async () => {
      // Get recently completed tasks
      try {
        const queryParameters = {
          per_page: "3",
          endDate: "1",
          sort_field: "end_date",
          status: "completed",
        };

        const tasks = await getAllTaskOfUser(queryParameters);
        setTasks(tasks);
      } catch (err) {
        console.log(err);
      }

      // Get important task
      try {
        const queryParameters = {
          per_page: "3",
          sort_field: "end_date",
          priority: "high"
        };

        const task_imp = await getAllTaskOfUser(queryParameters);
        setTasksImp(task_imp);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData(); // Call the async function inside useEffect
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddButtonClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleAddTask = (task: any) => {
    // Implementation of adding the task
    console.log("New Task:", task);
  };

  return (
    <>

      <Header headerTitle="Home" />
      <div className="home-main-div">
        {/* Buttons */}
        <div className="home-btn-div">
          <button className="home-btn" onClick={handleAddButtonClick}>Add</button>
          <Link to="/mytask">
            <button className="home-btn">View</button>
          </Link>
          <Link to="/goal">
            <button className="home-btn">Goal</button>
          </Link>
        </div>
        {
          isFormOpen && (
            <AddTaskForm
              onCloseForm={handleCloseForm}
              onAddTask={handleAddTask}
            />
          )
        }

        <div className="task-div">
          <h2>Recently Completed Tasks</h2>
          <div className="tasks">
            {
              tasks &&
              tasks.map((task, index) => (
                <Link to={`/singletask/${task._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <HomeTask
                    key={index}
                    title={task.title}
                    description={task.description}
                    className="home-card recently-added" />
                </Link>
              ))}
          </div>

          <h2>Important Tasks</h2>
          <div className="tasks">
            {
              task_imp &&
              task_imp.map((task, index) => (
                <Link to={`/singletask/${task._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <HomeTask
                    key={index}
                    title={task.title}
                    description={task.description}
                    className="home-card important" />
                </Link>
              ))
            }
          </div>
        </div>
      </div >
    </>
  )
}

export default Home;
