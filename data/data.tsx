export interface User {
    id: string;
    username: string;
    password: string;
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
}

export interface Task {
    id: string,
    user: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    start_date: string,
    end_date: string
}

export interface SubTask {
    id: string,
    task: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    start_date: string,
    end_date: string
}

export const users: User[] = [
    {
        id: "1",
        username: "user1",
        password: "$2a$10$ge2QXL5yVLTRe5pou1h/JuiUdVclOR53ZUfZ.ACkstAhxXpxUz0j2", // 123456
        first_name: "Logic",
        last_name: "Legend",
        email: "logic@gmail.com",
        phone_number: "1234567890"
    }
];

export const tasks: Task[] = [
    {
        id: "1",
        user: "1",
        title: "Task Title 1",
        description: "Task Description 3",
        priority: "medium",
        status: "inProgress",
        start_date: "2023-06-10T00:00:00.000Z",
        end_date: "2023-06-11T00:00:00.000Z",
    },
    {
        id: "2",
        user: "1",
        title: "Task Title 2",
        description: "Task Description 3",
        priority: "high",
        status: "inProgress",
        start_date: "2023-06-15T00:00:00.000Z",
        end_date: "2023-06-16T00:00:00.000Z",
    },
    {
        id: "3",
        user: "1",
        title: "Task Title 3",
        description: "Task Description 3",
        priority: "low",
        status: "inProgress",
        start_date: "2023-06-20T00:00:00.000Z",
        end_date: "2023-06-22T00:00:00.000Z",
    }
]

export const subtasks: SubTask[] = [
    {
        id: "1",
        task: "1",
        title: "Task Title 3",
        description: "Task Description 3",
        priority: "medium",
        status: "inProgress",
        start_date: "2023-06-10T00:00:00.000Z",
        end_date: "2023-06-15T00:00:00.000Z",
    }
]

