export interface ITasks {
    name: string,
    tasks?: Array<string>
}

export interface IUser {
    name: string,
    id: string
}

export interface Task  {
    name: string
    start: string
    end: string
    time: string
    current?: boolean
}

export interface DayReview {
    name: string
    online: boolean
    start: string
    end: string
    currentTask: string
    tasksCount: number
    tasks: Array<Task>
}