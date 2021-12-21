import React from "react"
import Sidebar from "../components/Sidebar";
import SettingTable from "../components/SettingTable";


const Settings: React.FC = () => {
    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            <SettingTable />
        </div>
    )
}

export default Settings