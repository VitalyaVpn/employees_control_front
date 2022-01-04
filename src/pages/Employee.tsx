import  * as React from 'react'
import Sidebar from "../components/Sidebar"
import EmployeeTable from "../components/EmployeeTable"
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Navigate} from "react-router-dom";
import {appSlice} from "../store/reducers/AppSlice";

const Employee:React.FC = () => {
    const {user} = useAppSelector(state => state.userReducer)
    const {activePage} = useAppSelector(state => state.appReducer)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(appSlice.actions.setActivePage('employee'))
    }, [])
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