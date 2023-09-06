import React, { useState } from 'react'
import LoginForm from '../components/ui/loginForm'
import { useParams } from 'react-router-dom'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
    let { type } = useParams()
    type = type === 'register' ? type : 'login'
    const [formType] = useState(type)
    const renderForm = () => {
        if (formType === 'login') {
            return (
                <>
                    <LoginForm />
                    <p>
                        Don&apos;t have an account? <a>Sign up</a>
                    </p>
                </>
            )
        } else {
            return (
                <>
                    <RegisterForm />
                    <p>
                        Already have an account? <a>Sign in</a>
                    </p>
                </>
            )
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    {renderForm()}
                </div>
            </div>
        </div>
    )
}

export default Login
