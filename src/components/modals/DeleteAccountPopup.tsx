import '../popupDetails.css';

type DeleteAccountProps = {
    onClose: () => void,
    deleteUser: () => void,
    closeOpthions: () => void,
}

export function DeleteAccountPopup({ onClose, deleteUser, closeOpthions }: DeleteAccountProps) {

    return <div className='delete-popup'>
        <p className="delete-popup-text"><span>Delete account?</span> All habits will be deleted.</p>
        <button className='submit delete-btn' onClick={deleteUser}>Delete</button>
        <button className='cancel' onClick={() => {onClose(); closeOpthions()}}>Cancel</button>
    </div>
}