import {AppDispatch} from "../store";
import {db, getTasks, getUserDay, getUsers} from "../../firebase/firebase";
import {DayReview, INewTask, ITasks, IUser} from "../../types";
import {employeeSlice} from "./EmployeeSlice";
import {tasksSlice} from "./TaskSlice";
import {statsSlice} from "./StatsSlice";
import {doc, setDoc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";


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

export const addEmployee = (payload:IUser) => async (dispatch: AppDispatch) => {
    try {
        dispatch(employeeSlice.actions.addEmployeeFetching())
        await setDoc(doc(db, 'users', payload.id), {
                name: payload.name,
                id: payload.id,
            }
        )
        await setDoc(doc(db, 'users',...[payload.id, 'data', 'tasks']), {

            }
        )
        dispatch(employeeSlice.actions.addEmployeeFetchingSuccess())
        dispatch(fetchEmployee())
    }
    catch (error: unknown) {
        const text = error instanceof Error ? error.message : 'Что-то пошло не так'
        dispatch(employeeSlice.actions.addEmployeeFetchingError(text))
    }
}

export const deleteEmployee = (payload:IUser) => async (dispatch: AppDispatch) => {
    try {
        dispatch(employeeSlice.actions.deleteEmployeeFetching())
        await deleteDoc(doc(db, 'users', payload.id)
        )
        dispatch(employeeSlice.actions.deleteEmployeeFetchingSuccess())
        dispatch(fetchEmployee())
    }
    catch (error: unknown) {
        const text = error instanceof Error ? error.message : 'Что-то пошло не так'
        dispatch(employeeSlice.actions.deleteEmployeeFetchingError(text))
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

export const addTask = (payload:INewTask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(tasksSlice.actions.addTaskFetching())
        await updateDoc(doc(db, 'users',...[ payload.id, 'data', 'tasks']), {
            [payload.task]: payload.task
        })
        // const res = await getTasks()
        // const data = res as Array<ITasks>
        dispatch(tasksSlice.actions.addTaskFetchingSuccess())
        dispatch(fetchTasks())
    }
    catch (error: unknown) {
        const text = error instanceof Error ? error.message : 'Что-то пошло не так'
        dispatch(tasksSlice.actions.addTaskFetchingError(text))
    }
}

export const deleteTask = (payload:INewTask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(tasksSlice.actions.deleteTaskFetching())
        await updateDoc(doc(db, 'users',...[ payload.id, 'data', 'tasks']), {
            [payload.task]: deleteField()
        })
        dispatch(tasksSlice.actions.deleteTaskFetchingSuccess())
        dispatch(fetchTasks())
    }
    catch (error: unknown) {
        const text = error instanceof Error ? error.message : 'Что-то пошло не так'
        dispatch(tasksSlice.actions.deleteTaskFetchingError(text))
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