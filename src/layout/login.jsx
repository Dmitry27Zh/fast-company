/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import LoginForm from '../components/ui/loginForm'
import { useParams } from 'react-router-dom'

const Login = () => {
    let { type } = useParams()
    type = type === 'register' ? type : 'login'
    const [formType] = useState(type)
    console.log(formType)

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login
