import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface AppState {
    drawer: boolean
    activePage: string
}

const initialState: AppState = {
    drawer: false,
    activePage: 'employee'
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleDrawer(state) {
            state.drawer = !state.drawer
        },
        setActivePage(state, action: PayloadAction<string>) {
            state.activePage = action.payload
        }
    }
})

export default appSlice.reducer