import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navigation from './components/ui/navigation'
import Main from './layout/main'
import Login from './layout/login'
import Users from './layout/users'
import AuthProvider from './hooks/useAuth'
import ProfessionsProvider from './hooks/useProfessions'
import QualitiesProvider from './hooks/useQualities'
import ProtectedRoute from './components/common/protectedRoute'

const App = () => {
    return (
        <AuthProvider>
            <QualitiesProvider>
                <ProfessionsProvider>
                    <BrowserRouter>
                        <div className="container">
                            <Navigation />
                            <Routes>
                                <Route path="/" element={<Main />} />
                                <Route path="/login/:type?" element={<Login />} />
                                <Route path="/users/:id?/:edit?" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                        <ToastContainer/>
                    </BrowserRouter>
                </ProfessionsProvider>
            </QualitiesProvider>
        </AuthProvider>
    )
}

export default App
