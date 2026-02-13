import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store/store";
import { AuthPopup } from "../AuthPopup";
import { CheckSquareIcon, CalendarIcon, LoginIcon, SettingsIcon } from "../Icons";
import './mobileNavBar.css';
import { OptionsDropdown } from "../OptionsDropdown";
import { BottomSheetWrapperMobile } from "../modalWindowVariants/BottomSheetWrapperMobile";
import { t } from "i18next";

export const MobileNavbar = ({ isMobile }: { isMobile: boolean }) => {
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [isAccOpthionsOpen, setIsAccOpthions] = useState(false);
    const user = useSelector((state: RootState) => state.auth);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <div className='nav-wrapper'>
            <nav className='navbar'>
                <NavLink to='/' className={({ isActive }) => `mobile-nav-button ${isActive ? 'active' : ''}`}>
                    <CheckSquareIcon />
                    <span>{t('pages.habits')}</span>
                </NavLink>
                <NavLink to='/calendar' className={({ isActive }) => `mobile-nav-button ${isActive ? 'active' : ''}`}>
                    <CalendarIcon />
                    <span>{t('pages.calendar')}</span>
                </NavLink>
                <NavLink to='/settings' className={({ isActive }) => `mobile-nav-button ${isActive ? 'active' : ''}`}>
                    <SettingsIcon />
                    <span>{t('pages.settings')}</span>
                </NavLink>
                {
                    user.isAuth ? (
                        <>
                            <button ref={buttonRef} className='mobile-nav-button' onClick={() => setIsAccOpthions(prev => !prev)}>
                                <span className='account-icon'>{user.name.charAt(0).toUpperCase()}</span>
                                <p className='account-name'>{user.name}</p>
                            </button>
                            {
                                isAccOpthionsOpen && (
                                    <OptionsDropdown
                                        onClose={() => setIsAccOpthions(false)}
                                        ignoreButtonRef={buttonRef}
                                        isMobile={isMobile} />
                                )
                            }
                        </>
                    ) :
                        (
                            <button className="mobile-nav-button" onClick={() => setIsAuthOpen(true)}>
                                <LoginIcon />
                                <span>{t('pages.logIn')}</span>
                            </button>
                        )
                }
            </nav>

            {
                isAuthOpen && (
                    <BottomSheetWrapperMobile onClose={() => setIsAuthOpen(false)}>
                        <AuthPopup onClose={() => setIsAuthOpen(false)} />
                    </BottomSheetWrapperMobile>
                )
            }
        </div>
    )
}