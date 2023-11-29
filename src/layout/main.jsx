import React from 'react'
import useMockData from '../utils/mockData'

const Main = () => {
    const { initialize } = useMockData()
    const handleClick = () => {
        initialize()
    }

    return <div className="container m-5">
        <h1>Main</h1>
        <h3>Инициализация данных в Firebase</h3>
        <button className="btn btn-primary" onClick={handleClick}>Initialize</button>
    </div>
}

export default Main
