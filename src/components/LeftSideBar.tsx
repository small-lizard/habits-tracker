import './sideBar.css';
import { CalendarIcon, CheckSquareIcon, LoginIcon } from "./Icons";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { AuthPopup } from './AuthPopup';
import { AppDispatch, RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../api/auth';
import * as userActions from '../store/authSlice';
import * as habitsActions from '../store/habitsSlice';

export const LeftSideBar = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const dispatch = useDispatch<AppDispatch>();

    const logout = async () => {
        const habits: any[] = []
        await logoutUser();
        dispatch(userActions.logout());
        dispatch(habitsActions.setHabits({ habits }));
    }

    return (
        <div className="out">
            <nav className="nav">
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
                    <li>
                        <button className="nav-button" onClick={() => setIsAuthOpen(true)}>
                            <LoginIcon />
                            <span>Profile</span>
                        </button>
                    </li>
                    {
                        isAuth && (
                            <li>
                                <button className="nav-button" onClick={logout} >
                                    <LoginIcon />
                                    <span>Logout</span>
                                </button>
                            </li>
                        )
                    }
                </ul>
            </nav>

            {isAuthOpen && (
                <AuthPopup onClose={() => setIsAuthOpen(false)} />
            )}
        </div>
    )
}
