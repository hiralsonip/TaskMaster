import { Doughnut } from "react-chartjs-2";
import { Task } from "../../data/data";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProp {
    tasks: Task[];
}

const ChartPriority: React.FC<ChartProp> = ({ tasks }) => {

    // Prepare data for the chart
    const priorityCount = tasks.reduce((count: { [key: string]: number }, task) => {
        count[task.priority] = (count[task.priority] || 0) + 1;
        return count;
    }, {});

    const chartData = {
        labels: Object.keys(priorityCount),
        datasets: [
            {
                data: Object.values(priorityCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)', // Low priority
                    'rgba(54, 162, 235, 0.7)', // Medium priority
                    'rgba(255, 206, 86, 0.7)', // High priority
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Low priority
                    'rgba(54, 162, 235, 1)', // Medium priority
                    'rgba(255, 206, 86, 1)', // High priority
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="chart-div">
            <h2>Task Priority</h2>
            <Doughnut data={chartData} />
        </div>
    );
};

export default ChartPriority;