import axios from "axios";
import authHeader from '../services/auth-header';

// Get all tasks of current user
type query_parameter = {
    page?: string;
    per_page?: string;
    priority?: string;
    endDate?: string;
    sort_field?: string;
    status?: string;
}

const getAllTaskOfUser = async (QueryParameters?: query_parameter) => {
    const {
        page = "",
        per_page = "",
        priority = "",
        endDate = "",
        sort_field = "",
        status = "" } = QueryParameters || {};

    let query = "?";
    query += (page) ? ("&page=" + page) : "";
    query += (per_page) ? ("&perPage=" + per_page) : "";
    query += (priority) ? ("&priority=" + priority) : "";
    query += (endDate) ? ("&endDate=" + endDate) : "";
    query += (sort_field) ? ("&sort_field=" + sort_field) : "";
    query += (status) ? ("&status=" + status) : "";

    try {

        const api = `http://localhost:3000/task/getAllUserTask?${query}`;
        const response = await axios.get(api,
            {
                headers: authHeader()
            });
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};

// Get single task as per the ID
type taskIdProp = {
    task_id?: string; // _id field from mongo db
}
const getSingleTaskById = async (taskIdProp: taskIdProp) => {

    const { task_id } = taskIdProp;
    try {
        const api = `http://localhost:3000/task/getTask/${task_id}`;
        const response = await axios.get(api, { headers: authHeader() });
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};

// Update task
type taskProp = {
    id: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    start_date: string,
    end_date: string,
}
const updateTaskById = async (taskProp: taskProp) => {
    const { id, title, description, priority, status, start_date, end_date } = taskProp;

    const requestBody = new URLSearchParams();
    requestBody.append('title', title);
    requestBody.append('description', description);
    requestBody.append('priority', priority);
    requestBody.append('status', status);
    requestBody.append('start_date', start_date);
    requestBody.append('end_date', end_date);

    try {
        const api = `http://localhost:3000/task/updateTask/${id}`;
        const response = await axios.put(api, requestBody,
            {
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: localStorage.getItem("token")
                }
            },
        );
        return response;
    } catch (error) {
        console.log(error);

    }
}

// Update sub task
const updateSubTaskById = async (taskProp: taskProp) => {
    const { id, title, description, priority, status, start_date, end_date } = taskProp;

    const requestBody = new URLSearchParams();
    requestBody.append('title', title);
    requestBody.append('description', description);
    requestBody.append('priority', priority);
    requestBody.append('status', status);
    requestBody.append('start_date', start_date);
    requestBody.append('end_date', end_date);

    try {
        const api = `http://localhost:3000/subtask/updateSubTask/${id}`;
        const response = await axios.put(api, requestBody,
            {
                headers:
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: localStorage.getItem("token")
                }
            },
        );
        return response;
    } catch (error) {
        console.log(error);

    }
}
export { getAllTaskOfUser, getSingleTaskById, updateTaskById, updateSubTaskById };