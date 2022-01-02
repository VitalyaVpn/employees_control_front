import React from 'react'

import './App.css'
import Stats from "./pages/Stats"
import Settings from "./pages/Setting"
import Employee from "./pages/Employee"
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import {auth} from "./firebase/firebase";
import {userSlice} from "./store/reducers/UserSlice";
import {useAppDispatch} from "./hooks/redux";


function App() {

  const dispatch = useAppDispatch()
  auth.onAuthStateChanged((user) => {
      if (user) {
          dispatch(userSlice.actions.loginStatusChanged({email: user.email, uid: user.uid}))
      }
      else {
          dispatch(userSlice.actions.loginStatusChanged({email: '', uid: ''}))
      }
  })

  return (
    <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path='login' element={<Login />}/>
                <Route path='employee' element={<Employee />}/>
                <Route path='settings' element={<Settings />}/>
                <Route path='stats' element={<Stats />}/>
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App