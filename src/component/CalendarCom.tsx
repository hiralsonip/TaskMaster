import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { getAllTaskOfUser } from "../api/api";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events }: { events: Event[] }) => {
    return (
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
};

const CalendarCom = () => {
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

    useEffect(() => {
        const fetchData = async () => {
            // Get recently completed tasks
            try {
                const tasks = await getAllTaskOfUser();
                setTasks(tasks)
                console.log(tasks);

            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const events: Event[] =
        tasks &&
        tasks.map((task) => ({
            id: task._id,
            title: task.title,
            start: new Date(task.start_date),
            end: new Date(task.end_date),
        }));

    return (
        <div className="claendar-div">
            {events && <MyCalendar events={events} />}
        </div>
    );
};

export default CalendarCom;
