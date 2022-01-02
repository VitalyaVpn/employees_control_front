import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFirebaseUser} from "../../types";


interface TasksState {
    user: IFirebaseUser
    isLoading: boolean
    error: string
}

const initialState: TasksState = {
    user: {
        email: '',
        uid: ''
    },
    isLoading: false,
    error:''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginFetching(state){
            state.isLoading = true
        },
        loginFetchingSuccess(state){
            state.isLoading = false
            state.error = ''
        },
        loginFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
        loginStatusChanged(state, action: PayloadAction<IFirebaseUser>){
            state.user.email = action.payload.email
            state.user.uid = action.payload.uid
        },
        logoutFetching(state){
            state.isLoading = true
        },
        logoutFetchingSuccess(state){
            state.isLoading = false
            state.error = ''
        },
        logoutFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default userSlice.reducer