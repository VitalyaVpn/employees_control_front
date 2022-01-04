import * as React from 'react'
import Sidebar from '../components/Sidebar'
import SettingTable from '../components/SettingTable'

import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Navigate} from "react-router-dom";
import {appSlice} from "../store/reducers/AppSlice";


const Settings: React.FC = () => {
    const {user} = useAppSelector(state => state.userReducer)
    const {activePage} = useAppSelector(state => state.appReducer)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(appSlice.actions.setActivePage('settings'))
    }, [])
    if (!user.uid) {
        return <Navigate to='/login'/>
    }

    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            <SettingTable />
        </div>
    )
}

export default Settings