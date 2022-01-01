import {DayReview} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface StatsState {
    stats: DayReview[]
    isLoading: boolean
    error: string
}

const initialState: StatsState = {
    stats: [],
    isLoading: false,
    error:''
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        statsFetching(state){
            state.isLoading = true
        },
        statsFetchingSuccess(state, action:PayloadAction<DayReview[]>){
            state.isLoading = false
            state.error = ''
            state.stats = action.payload
        },
        statsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default statsSlice.reducer