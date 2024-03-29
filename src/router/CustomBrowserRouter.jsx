import React, { useRef, useState, useLayoutEffect } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PropType from 'prop-types'

// Can be used to manage navigation state outside of React components
// ex : Redux, Axios interceptors, ...
export const customHistory = createBrowserHistory()

export function CustomBrowserRouter({ basename, children }) {
    const historyRef = useRef()
    if (historyRef.current == null) {
        historyRef.current = customHistory
    }
    const history = historyRef.current
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    })

    useLayoutEffect(() => history.listen(setState), [history])

    return (
        <Router
            basename={basename}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        >
            {children}
        </Router>
    )
}

CustomBrowserRouter.propTypes = {
    basename: PropType.string,
    children: PropType.oneOfType([PropType.node, PropType.arrayOf(PropType.node)])
}
