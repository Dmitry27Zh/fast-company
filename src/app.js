import React from 'react'
import Users from './components/users'
import Navigation from './components/navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/main'
import Login from './components/login'

const App = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
