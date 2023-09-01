import React from 'react'
import Users from './components/users'
import Navigation from './components/navigation'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Users />
        </BrowserRouter>
    )
}

export default App
