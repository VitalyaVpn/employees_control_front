export interface ITasks {
    name: string,
    id: string,
    tasks?: Array<string>
}

export interface IUser {
    name: string,
    id: string
}

export interface IUserProfile {
    name: string
    profileUrl: string
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

export interface INewTask {
    id: string
    task: string
}

export interface IFirebaseUser {
    uid: string
    email: string | null
}

export interface ILoginData {
    email: string
    password: string
}