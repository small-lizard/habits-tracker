import './sideBar.css';
import { CalendarIcon, CheckSquareIcon, LoginIcon, ToggleIcon, AccountOptionsIcon } from "./Icons";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { AuthPopup } from './AuthPopup';
import { AppDispatch, RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import * as sidebarActions from '../store/sidebarUISlice';
import { OpthionsDropdown } from './OpthionsDropdown';

export const LeftSideBar = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [isAccOpthionsOpen, setIsAccOpthions] = useState(false);
    const user = useSelector((state: RootState) => state.auth);
    const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
    const dispatch = useDispatch<AppDispatch>();
    const buttonRef = useRef<HTMLButtonElement>(null);

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
                    <div className='account'>
                        <div className='account-info'>
                            <span className='account-icon'>{user.name.charAt(0).toUpperCase()}</span>
                            <div className='account-text'>
                                <p className='account-name'>{user.name}</p>
                                <p className='account-email'>{user.email}</p>
                            </div>
                        </div>
                        <button ref={buttonRef} className='options-button' onClick={() => setIsAccOpthions(prev => !prev)}><AccountOptionsIcon /></button>
                        {
                            isAccOpthionsOpen && (
                                <OpthionsDropdown onClose={() => setIsAccOpthions(false)} ignoreButtonRef={buttonRef} />
                            )
                        }
                    </div>
                )
            }

            {isAuthOpen && (
                <AuthPopup onClose={() => setIsAuthOpen(false)} />
            )}
        </div>
    )
}