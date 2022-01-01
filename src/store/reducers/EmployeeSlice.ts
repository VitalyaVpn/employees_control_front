import {IUser} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface EmployeeState {
    employee: IUser[]
    isLoading: boolean
    error: string
}

const initialState: EmployeeState = {
    employee: [],
    isLoading: false,
    error:''
}

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        employeeFetching(state){
            state.isLoading = true
        },
        employeeFetchingSuccess(state, action:PayloadAction<IUser[]>){
            state.isLoading = false
            state.error = ''
            state.employee = action.payload
        },
        employeeFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default employeeSlice.reducer