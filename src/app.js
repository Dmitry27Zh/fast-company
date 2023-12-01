import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navigation from './components/ui/navigation'
import Main from './layout/main'
import Login from './layout/login'
import Users from './layout/users'
import UsersProvider from './hooks/useUsers'
import ProfessionsProvider from './hooks/useProfessions'
import QualitiesProvider from './hooks/useQualities'

const App = () => {
    return (
        <QualitiesProvider><ProfessionsProvider><UsersProvider>
            <BrowserRouter>
                <div className="container">
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login/:type?" element={<Login />} />
                        <Route path="/users/:id?/:edit?" element={<Users />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <ToastContainer/>
            </BrowserRouter>
        </UsersProvider></ProfessionsProvider></QualitiesProvider>
    )
}

export default App
