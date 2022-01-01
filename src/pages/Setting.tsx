import * as React from 'react'
import Sidebar from '../components/Sidebar'
import SettingTable from '../components/SettingTable'
import {getData} from "../firebase/firebase";
import {User} from "../types";


const Settings: React.FC = () => {



    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            <SettingTable />
        </div>
    )
}

export default Settings