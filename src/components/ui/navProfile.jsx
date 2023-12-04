import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const NavProfile = () => {
    const { currentUser } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen((prevState) => !prevState)

    return <div className="dropdown" onClick={toggleMenu}>
        <div className="btn dropdown-toggle d-flex align-items-center">
            <div className="me-2">{currentUser.name}</div>
            <img className="img-responsive rounded-circle" height={40} src={currentUser.image} alt="" />
        </div>
        <div className={`w-100 dropdown-menu ${isOpen ? 'show' : ''}`}>
            <Link className='dropdown-item' to={`/users/${currentUser._id}`}>Profile</Link>
            <Link className='dropdown-item' to="logout">Log Out</Link>
        </div>
    </div>
}

export default NavProfile
