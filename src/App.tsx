import React from 'react'

import './App.css'
import Stats from "./pages/Stats"
import Settings from "./pages/Setting"
import Employee from "./pages/Employee"
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path='employee' element={<Employee />}/>
                <Route path='settings' element={<Settings />}/>
                <Route path='stats' element={<Stats />}/>
                <Route
                    path="*"
                    element={<Navigate to="/employee" />}
                />
            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App