import './sideBar.css';
import { CalendarIcon, CheckSquareIcon, LoginIcon } from "../../Icons";
import { NavLink } from "react-router-dom";
import { useRef, useState } from 'react';
import { AuthPopup } from '../../AuthPopup';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { OpthionsDropdown } from '../../OpthionsDropdown';

export const MobileNavbar = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [isAccOpthionsOpen, setIsAccOpthions] = useState(false);
    const user = useSelector((state: RootState) => state.auth);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <div className='nav-wrapper'>
            <nav className='navbar'>
                <NavLink to='/' className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                    <CheckSquareIcon />
                    <span className='nav-item-text'>This week</span>
                </NavLink>
                <NavLink to='/calendar' className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                    <CalendarIcon />
                    <span className='nav-item-text'>Calendar</span>
                </NavLink>
                {
                    !user.isAuth && (
                        <button className="nav-button" onClick={() => setIsAuthOpen(true)}>
                            <LoginIcon />
                            <span className='nav-item-text'>Log in</span>
                        </button>
                    )
                }
            </nav>

            {
                user.isAuth && (
                    <div className='account'>
                        <button ref={buttonRef} className='account-info' onClick={() => setIsAccOpthions(prev => !prev)}>
                            <span className='account-icon'>{user.name.charAt(0).toUpperCase()}</span>
                            <p className='account-name'>{user.name}</p>
                        </button>
                        {
                            isAccOpthionsOpen && (
                                <OpthionsDropdown onClose={() => setIsAccOpthions(false)} ignoreButtonRef={buttonRef} />
                            )
                        }
                    </div>
                )
            }
            {
                isAuthOpen && (
                    <AuthPopup onClose={() => setIsAuthOpen(false)} />
                )
            }
        </div>
    )
}