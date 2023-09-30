import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import '../App.css'

const Root = () => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 0 }}>
                    <Sidebar />
                </div>

                <div style={{ flex: 1 }}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Root
