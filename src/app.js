import React from 'react'
import Navigation from './components/navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './layout/main'
import Login from './layout/login'
import Users from './layout/users'
import User from './components/user'

const App = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
