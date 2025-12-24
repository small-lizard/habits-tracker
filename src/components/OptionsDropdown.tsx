import { useDispatch } from 'react-redux';
import * as accountService from '../services/accountService';
import * as userActions from '../store/authSlice';
import * as habitsActions from '../store/habitsSlice';
import { AppDispatch } from '../store/store';
import { LockIcon, LogoutIcon, TrashIcon } from './Icons';
import "./optionsDropdown.css";
import { useState } from 'react';
import { DeleteAccountPopup } from './modals/DeleteAccountPopup';
import { ChangePasswordPopup } from './modals/ChangePasswordPopup';
import { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { PopupWrapperDesctope } from './modalWindowVariants/PopupWrapperDesctope';
import { BottomSheetWrapperMobile } from './modalWindowVariants/BottomSheetWrapperMobile';

type DropdownProps = {
    onClose: () => void;
    ignoreButtonRef?: React.RefObject<HTMLButtonElement | null>;
    isMobile: boolean;
};

export const OptionsDropdown = ({ onClose, ignoreButtonRef, isMobile }: DropdownProps) => {
    const ref = useRef<HTMLUListElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);
    const [isResetPopupOpen, setIsResetPopupOpen] = useState(false);

    useOnClickOutside(ref, onClose, !(isOpen || isResetPopupOpen), ignoreButtonRef ? [ignoreButtonRef] : []);

    const logout = async () => {
        const habits: any[] = []
        await accountService.logoutUser();
        dispatch(userActions.logout());
        dispatch(habitsActions.setHabits({ habits }));
        onClose()
    }

    const deleteAccount = async () => {
        const habits: any[] = []
        await accountService.deleteUser();
        dispatch(userActions.logout());
        dispatch(habitsActions.setHabits({ habits }));
        onClose()
    }

    const resetPassword = async (password: string, newPassword: string) => {
        await accountService.changePassword({ password, newPassword });
        onClose()
    }

    const Wrapper = isMobile ? BottomSheetWrapperMobile : PopupWrapperDesctope;

    return <>
        <ul ref={ref} className='options-list'>
            <li>
                <button className="nav-button options" onClick={() => setIsResetPopupOpen(true)} >
                    <LockIcon />
                    <span className='nav-item-text'>Change password</span>
                </button>
            </li>
            <li>
                <button className="nav-button options" onClick={() => setIsOpen(true)} >
                    <TrashIcon />
                    <span className='nav-item-text'>Delete account</span>
                </button>
            </li>
            <li>
                <button className="nav-button options" onClick={logout} >
                    <LogoutIcon />
                    <span className='nav-item-text'>Log out</span>
                </button>
            </li>
        </ul>
        {
            isOpen && (
                <Wrapper onClose={() => setIsOpen(false)} >
                    <DeleteAccountPopup
                        onClose={() => setIsOpen(false)}
                        deleteUser={() => deleteAccount()}
                        closeOpthions={onClose}
                    ></DeleteAccountPopup>
                </Wrapper>
            )
        }
        {
            isResetPopupOpen && (
                <Wrapper onClose={() => setIsResetPopupOpen(false)}>
                    <ChangePasswordPopup
                        onClose={() => setIsResetPopupOpen(false)}
                        resetPassword={(password: string, newPassword: string) => resetPassword(password, newPassword)}
                        closeOpthions={onClose}
                    ></ChangePasswordPopup>
                </Wrapper>
            )
        }
    </>
}