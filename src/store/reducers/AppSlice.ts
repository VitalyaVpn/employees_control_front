import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface AppState {
    drawer: boolean
    activePage: string
    loading: boolean
}

const initialState: AppState = {
    drawer: false,
    activePage: 'employee',
    loading: true
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
        },
        setLoadingPage(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
    }
})

export default appSlice.reducer