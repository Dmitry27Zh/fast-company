import React, { useState } from 'react'
import LoginForm from '../components/ui/loginForm'
import { useParams } from 'react-router-dom'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
    let { type } = useParams()
    type = type === 'register' ? type : 'login'
    const [formType, setFormType] = useState(type)
    const toggleFormType = () => {
        setFormType((previousState) =>
            previousState === 'login' ? 'register' : 'login'
        )
    }
    const renderForm = () => {
        if (formType === 'login') {
            return (
                <>
                    <h3 className="mb-4">Login</h3>
                    <LoginForm />
                    <p className="mt-4">
                        Don&apos;t have an account?{' '}
                        <a role="button" onClick={toggleFormType}>
                            Sign up
                        </a>
                    </p>
                </>
            )
        } else {
            return (
                <>
                    <h3 className="mb-4">Register</h3>
                    <RegisterForm />
                    <p className="mt-4">
                        Already have an account?{' '}
                        <a role="button" onClick={toggleFormType}>
                            Sign in
                        </a>
                    </p>
                </>
            )
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {renderForm()}
                </div>
            </div>
        </div>
    )
}

export default Login
