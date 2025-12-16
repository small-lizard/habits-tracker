import './sideBar.css';
import { CalendarIcon, CheckSquareIcon, LoginIcon, ToggleIcon } from "./Icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { AuthPopup } from './AuthPopup';
import { AppDispatch, RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import * as sidebarActions from '../store/sidebarUISlice';
import { Account } from './Account';
import { PopupWrapperDesctope } from './modalWindowVariants/PopupWrapperDesctope';

export const LeftSideBar = ({ isMobile }: { isMobile: boolean }) => {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const user = useSelector((state: RootState) => state.auth);
    const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (window.innerWidth < 1280) {
            dispatch(sidebarActions.closeSidebar());
        }
    }, []);

    return (
        <div className={sidebarOpen ? "out sidebar-open" : "out sidebar-closed"}>
            <div className='sidebar-header'>
                <p className='app-name'>Habit tracker</p>
                <button className='toggle-button' onClick={() => dispatch(sidebarActions.toggleSidebar())}>
                    <ToggleIcon />
                </button>
            </div>
            <nav>
                <ul className="nav-list">
                    <li>
                        <NavLink to='/' className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                            <CheckSquareIcon />
                            <span className='nav-item-text'>This week</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/calendar' className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                            <CalendarIcon />
                            <span className='nav-item-text'>Calendar</span>
                        </NavLink>
                    </li>
                    {
                        !user.isAuth && (
                            <li>
                                <button className="nav-button" onClick={() => setIsAuthOpen(true)}>
                                    <LoginIcon />
                                    <span className='nav-item-text'>Log in</span>
                                </button>
                            </li>
                        )
                    }
                </ul>
            </nav>

            {
                user.isAuth && (
                    <Account
                        name={user.name}
                        email={user.email}
                        isMobile={isMobile}
                    />
                )
            }

            {isAuthOpen && (
                <PopupWrapperDesctope onClose={() => setIsAuthOpen(false)}>
                    <AuthPopup onClose={() => setIsAuthOpen(false)} />
                </PopupWrapperDesctope>
            )}
        </div>
    )
}