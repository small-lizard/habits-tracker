import { SideBar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className='app'>
            <SideBar />
            <Outlet />
        </div>
    )
}