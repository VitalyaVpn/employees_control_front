import {ITasks} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface TasksState {
    tasks: ITasks[]
    isLoading: boolean
    error: string
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error:''
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        tasksFetching(state){
            state.isLoading = true
        },
        tasksFetchingSuccess(state, action:PayloadAction<ITasks[]>){
            state.isLoading = false
            state.error = ''
            state.tasks = action.payload
        },
        tasksFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
        addTaskFetching(state){
            state.isLoading = true
        },
        addTaskFetchingSuccess(state){
            state.isLoading = false
            state.error = ''
        },
        addTaskFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
        deleteTaskFetching(state){
            state.isLoading = true
        },
        deleteTaskFetchingSuccess(state){
            state.isLoading = false
            state.error = ''
        },
        deleteTaskFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default tasksSlice.reducer