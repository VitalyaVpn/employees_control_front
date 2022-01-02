import React from "react"
import Sidebar from "../components/Sidebar"
import StatTable from "../components/StatTable"
import {useAppSelector} from "../hooks/redux";
import {Navigate} from "react-router-dom";

const Stats: React.FC = () => {
    const {user} = useAppSelector(state => state.userReducer)
    if (!user.uid) {
        return <Navigate to='/login'/>
    }
    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            <StatTable />
        </div>
    )
}

export default Stats