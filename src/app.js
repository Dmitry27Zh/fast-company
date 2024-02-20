import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navigation from './components/ui/navigation'
import Main from './layout/main'
import Login from './layout/login'
import Users from './layout/users'
import ProtectedRoute from './components/common/protectedRoute'
import Logout from './layout/logout'
import AppLoader from './components/ui/hoc/appLoader'

const App = () => {
    return (
        <AppLoader>
            <div className="container">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route
                        path="/login/:type?"
                        element={<Login />}
                    />
                    <Route path="/logout" element={<Logout />} />
                    <Route
                        path="/users/:userId?/:edit?"
                        element={
                            <ProtectedRoute>
                                <Users />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <ToastContainer />
        </AppLoader>
    )
}

export default App
