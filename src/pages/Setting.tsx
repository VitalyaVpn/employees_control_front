import * as React from 'react'
import Sidebar from '../components/Sidebar'
import SettingTable from '../components/SettingTable'

import {useAppSelector} from "../hooks/redux";
import {Navigate} from "react-router-dom";


const Settings: React.FC = () => {
    const {user} = useAppSelector(state => state.userReducer)
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