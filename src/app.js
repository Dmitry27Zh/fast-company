import React from 'react'
import Navigation from './components/ui/navigation'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Main from './layout/main'
import Login from './layout/login'
import Users from './layout/users'
import Edit from './layout/edit'

const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login/:type?" element={<Login />} />
                    <Route path="/users/:id?" element={<Users />} />
                    <Route path='/users/:id/edit' element={<Edit/>}></Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
