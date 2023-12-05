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
import Logout from './layout/logout'

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <QualitiesProvider>
                    <ProfessionsProvider>

                        <div className="container">
                            <Navigation />
                            <Routes>
                                <Route path="/" element={<Main />} />
                                <Route path="/login/:type?" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/users/:userId?/:edit?" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                        <ToastContainer/>
                    </ProfessionsProvider>
                </QualitiesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
