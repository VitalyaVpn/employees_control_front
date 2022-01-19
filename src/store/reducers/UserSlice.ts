import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFirebaseUser, IUserProfile} from "../../types";


interface TasksState {
    user: IFirebaseUser
    isLoading: boolean
    error: string
    profileUrl: string
    name: string
}

const initialState: TasksState = {
    user: {
        email: '',
        uid: ''
    },
    isLoading: false,
    error:'',
    name: 'Имя',
    profileUrl: 'https://sun9-32.userapi.com/impg/c855420/v855420426/185a88/qJCF2fX2Mag.jpg?size=604x604&quality=96&sign=665ccba7624293ce96bec8a94b791216&type=album',
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
        fetchingInfo(state){
            state.isLoading = true
        },
        fetchingInfoSuccess(state, action: PayloadAction<IUserProfile>){
            state.name = action.payload.name
            state.profileUrl = action.payload.profileUrl
            state.isLoading = false
        },
        fetchingInfoError(state){
            state.isLoading = false
        }
    }
})

export default userSlice.reducer