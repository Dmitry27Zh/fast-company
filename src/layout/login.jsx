import React, { useState } from 'react'

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = data
    const handleChange = (event) => {
        const { name, value } = event.target
        setData((previousState) => ({ ...previousState, [name]: value }))
    }

    return (
        <form action="">
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            </div>
        </form>
    )
}

export default Login
