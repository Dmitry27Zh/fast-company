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
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login
