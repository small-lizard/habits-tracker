import { useEffect, useState } from 'react';
import { iconCheckBox, iconCalendar, iconStatistic, iconSettings, iconLogOut } from '../assets/svg/icons';
import { SidebarButton } from './ui/buttons/SidebarButton';
import { useLocation } from 'react-router-dom';

export function SideBar() {

    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    return (
        <div className='sidebar'>
            <div className='head'>
                <h2>1 days</h2>
                <p>of completed habits</p>
            </div>
            <div className='menu'>
                <SidebarButton isActive={activePath === '/week'} icon={iconCheckBox} route='/week'>This week</SidebarButton>
                <SidebarButton icon={iconCalendar}>Calendar</SidebarButton>
                <SidebarButton icon={iconStatistic}>Statistics</SidebarButton>
            </div>
            <hr />
            <div className='menu'>
                <SidebarButton icon={iconSettings}>Settings</SidebarButton>
                <SidebarButton icon={iconLogOut}>Log out</SidebarButton>
            </div>
        </div>
    );
}