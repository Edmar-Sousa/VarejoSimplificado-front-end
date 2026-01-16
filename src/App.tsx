
import { RouterProvider } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

import { router } from './routes'


export const App = () => {
    return (
        <div className="app-container">
            <ToastContainer />
            <RouterProvider router={router} />
        </div>
    );
}
