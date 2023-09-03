import React, { useState } from 'react'
import TextField from '../components/textField'

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
        <form>
            <TextField
                label="Email"
                name="email"
                value={email}
                onChange={handleChange}
            />
            <TextField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={handleChange}
            />
        </form>
    )
}

export default Login
