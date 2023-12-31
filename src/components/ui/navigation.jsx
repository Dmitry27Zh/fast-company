import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NavProfile from '../ui/navProfile'

const Navigation = () => {
    const { currentUser } = useAuth()

    return (
        <nav className='navbar bg-light mb-3'>
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                    Main
                        </Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                to="/users"
                                aria-current="page"
                            >
                    Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser
                        ? <NavProfile />
                        : (
                            <Link className="nav-link" to="/login">
                    Login
                            </Link>
                        )}
                </div>
            </div>
        </nav>
    )
}

export default Navigation
