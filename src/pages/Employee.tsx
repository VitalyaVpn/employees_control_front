import  * as React from 'react'
import Sidebar from "../components/Sidebar"
import EmployeeTable from "../components/EmployeeTable"
import {useAppSelector} from "../hooks/redux";
import {Navigate} from "react-router-dom";

const Employee:React.FC = () => {
    const {user} = useAppSelector(state => state.userReducer)
    if (!user.uid) {
        return <Navigate to='/login'/>
    }
    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            <EmployeeTable />
        </div>
    )
}

export default Employee