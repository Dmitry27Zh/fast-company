import React from 'react'
import Navigation from './components/navigation'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Main from './layout/main'
import Login from './layout/login'
import Users from './layout/users'

const App = () => {
    return (
        <BrowserRouter>
            <div className='container'>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/users/:id?" element={<Users />} />
                    <Route path='*' element={<Navigate to="/"/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
