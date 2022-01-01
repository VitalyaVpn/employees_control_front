export interface User {
    name: string,
    tasks?: Array<string>
}

export interface UserInDb {
    name: string,
    id: string
}