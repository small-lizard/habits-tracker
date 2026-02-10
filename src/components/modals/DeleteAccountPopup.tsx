import { useTranslation } from 'react-i18next';
import '../popupDetails.css';

type DeleteAccountProps = {
    onClose: () => void,
    deleteUser: () => void,
    closeOpthions: () => void,
}

export function DeleteAccountPopup({ onClose, deleteUser, closeOpthions }: DeleteAccountProps) {
    const { t } = useTranslation();

    return <div className='delete-popup'>
        <p className="delete-popup-text"><span>{t('alert.deleteAccount')}</span>{t('alert.allDeleted')}</p>
        <button className='submit delete-btn' onClick={deleteUser}>{t('buttons.delete')}</button>
        <button className='cancel' onClick={() => { onClose(); closeOpthions() }}>{t('buttons.cancel')}</button>
    </div>
}