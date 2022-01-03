import {combineReducers, configureStore} from "@reduxjs/toolkit";
import employeeReducer from './reducers/EmployeeSlice'
import tasksReducer from './reducers/TaskSlice'
import statsReducer from './reducers/StatsSlice'
import appReducer from './reducers/AppSlice'
import userReducer from './reducers/UserSlice'

export const rootReducer = combineReducers({
    employeeReducer,
    tasksReducer,
    statsReducer,
    appReducer,
    userReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']