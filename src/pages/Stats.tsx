import React from "react"
import Sidebar from "../components/Sidebar"
import StatTable from "../components/StatTable"

const Stats: React.FC = () => {
    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            <StatTable />
        </div>
    )
}

export default Stats