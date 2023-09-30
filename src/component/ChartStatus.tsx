import { Doughnut } from "react-chartjs-2";
import { Task } from "../../data/data";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProp {
    tasks: Task[];
}

const ChartStatus: React.FC<ChartProp> = ({ tasks }) => {

    // Prepare data for the chart
    const statusCount = tasks.reduce((count: { [key: string]: number }, task) => {
        count[task.status] = (count[task.status] || 0) + 1;
        return count;
    }, {});

    const chartData = {
        labels: Object.keys(statusCount),
        datasets: [
            {
                data: Object.values(statusCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)', // Todo 
                    'rgba(54, 162, 235, 0.7)', // Inprogress 
                    'rgba(255, 206, 86, 0.7)', // Completed 
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Todo 
                    'rgba(54, 162, 235, 1)', // Inprogress 
                    'rgba(255, 206, 86, 1)', // Completed 
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="chart-div">
            <h2>Task Status</h2>
            <Doughnut data={chartData} />
        </div>
    );
};

export default ChartStatus;