import './sideBar.css';
import { CalendarIcon, CheckSquareIcon, LoginIcon, SettingsIcon, ToggleIcon } from "../Icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import * as sidebarActions from '../../store/uiSlice';
import { Account } from '../Account';
import { PopupWrapperDesctope } from '../modalWindowVariants/PopupWrapperDesctope';
import { useTranslation } from 'react-i18next';
import { AuthModal } from '../AuthModal/AuthModal';
import { SuccessAlert } from '../notifications/SuccessAlert';

export const LeftSideBar = ({ isMobile }: { isMobile: boolean }) => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const user = useSelector((state: RootState) => state.auth);
    const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const currentHabitId = useSelector((state: RootState) => state.ui.currentHabitId);
    const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
    const isUserGuest = localStorage.getItem("guest_mode")

    useEffect(() => {
        if (window.innerWidth < 1280) {
            dispatch(sidebarActions.closeSidebar());
        }
    }, []);

    return (
        <div className={sidebarOpen ? "out sidebar-open" : "out sidebar-closed"}>
            <div>
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
                                <span className='nav-item-text'>{t('pages.habits')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/calendar/${currentHabitId ?? ''}`} className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                                <CalendarIcon />
                                <span className='nav-item-text'>{t('pages.calendar')}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/settings' className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                                <SettingsIcon />
                                <span className='nav-item-text'>{t('pages.settings')}</span>
                            </NavLink>
                        </li>
                        {
                            isUserGuest == 'true' && (
                                <li>
                                    <button className="nav-button" onClick={() => setIsAuthOpen(true)}>
                                        <LoginIcon />
                                        <span className='nav-item-text'>{t('pages.logIn')}</span>
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </div>

            {
                isUserGuest == 'false' && (
                    <Account
                        name={user.name}
                        email={user.email}
                        isMobile={isMobile}
                    />
                )
            }

            {isAuthOpen && (
                <PopupWrapperDesctope onClose={() => setIsAuthOpen(false)}>
                    <AuthModal
                        onClose={() => setIsAuthOpen(false)}
                        onSuccess={() => setIsSuccessAlertOpen(true)}
                    ></AuthModal>
                </PopupWrapperDesctope>
            )}

            {isSuccessAlertOpen && (
                <PopupWrapperDesctope onClose={() => setIsSuccessAlertOpen(false)}>
                    <SuccessAlert
                        title={t('alert.welcome')}
                        message={t('alert.singUpDesc')}
                        onClose={() => setIsSuccessAlertOpen(false)}
                    />
                </PopupWrapperDesctope>
            )}
        </div>
    )
}