import  * as React from 'react'
import Sidebar from "../components/Sidebar"
import EmployeeTable from "../components/EmployeeTable"

const Employee:React.FC = () => {

    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            <EmployeeTable />
        </div>
    )
}

export default Employee