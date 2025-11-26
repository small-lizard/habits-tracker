import "./popup.css";
import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

type DeleteAccountProps = {
    onClose: () => void,
    deleteUser:  () => void,
}

export function DeleteAccountPopup({ onClose, deleteUser } : DeleteAccountProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref, onClose, true)

    return <div className='popup-overlay'>
        <div ref={ref} className='popup-form'>
            <p className="delete-popup-text"><span>Delete account?</span> All habits will be deleted.</p>
            <button className='delete-btn' onClick={deleteUser}>Delete</button>
            <button className='cancel' onClick={onClose}>Cancel</button>
        </div>
    </div>
}