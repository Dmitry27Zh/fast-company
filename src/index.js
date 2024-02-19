import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app'
import { createStore } from './store/createStore'
import { Provider } from 'react-redux'
import { CustomBrowserRouter } from './router/CustomBrowserRouter'

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <CustomBrowserRouter >
                <App />
            </CustomBrowserRouter>
        </Provider>
    </React.StrictMode>
)
