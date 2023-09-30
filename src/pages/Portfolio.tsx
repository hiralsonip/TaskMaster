import { useEffect, useState } from 'react';
import Header from '../component/Header'
import { getAllTaskOfUser } from '../api/api';
import ChartPriority from '../component/ChartPriority';
import ChartStatus from '../component/ChartStatus';

const Portfolio: React.FC = () => {

    const [tasks, setTasks] = useState([]);

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

    return (
        <>
            <Header headerTitle='Portfolio' />
            <div className='chart-main'>
                <div className='chart-inner'>
                    {
                        tasks && <ChartPriority tasks={tasks} />
                    }
                </div>
                <div className='chart-inner'>
                    {
                        tasks && <ChartStatus tasks={tasks} />
                    }
                </div>
            </div>
        </>
    )
}

export default Portfolio


