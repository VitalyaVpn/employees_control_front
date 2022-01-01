import {AppDispatch} from "../store";
import {getTasks, getUserDay, getUsers} from "../../firebase/firebase";
import {DayReview, ITasks, IUser} from "../../types";
import {employeeSlice} from "./EmployeeSlice";
import {tasksSlice} from "./TaskSlice";
import {statsSlice} from "./StatsSlice";

export const fetchEmployee = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(employeeSlice.actions.employeeFetching())
        const res = await getUsers()
        const data = res as Array<IUser>
        dispatch(employeeSlice.actions.employeeFetchingSuccess(data))
    }
    catch (error: unknown) {
        const text = error instanceof Error ? error.message : 'Что-то пошло не так'
        dispatch(employeeSlice.actions.employeeFetchingError(text))
    }
}

export const fetchTasks = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(tasksSlice.actions.tasksFetching())
        const res = await getTasks()
        const data = res as Array<ITasks>
        dispatch(tasksSlice.actions.tasksFetchingSuccess(data))
    }
    catch (error: unknown) {
        const text = error instanceof Error ? error.message : 'Что-то пошло не так'
        dispatch(tasksSlice.actions.tasksFetchingError(text))
    }
}

export const fetchStats = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(statsSlice.actions.statsFetching())
        const res = await getUserDay()
        const data = res as Array<DayReview>
        dispatch(statsSlice.actions.statsFetchingSuccess(data))
    }
    catch (error: unknown) {
        const text = error instanceof Error ? error.message : 'Что-то пошло не так'
        dispatch(statsSlice.actions.statsFetchingError(text))
    }
}