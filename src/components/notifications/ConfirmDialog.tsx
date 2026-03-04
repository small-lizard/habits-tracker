import { useTranslation } from "react-i18next"
import { TrashIcon } from "../Icons"
import "../form.css"

type ConfirmDialogProps = {
    title: string
    description: string
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmDialog({ title, description, onConfirm, onCancel }: ConfirmDialogProps) {
    const { t } = useTranslation();

    return (
        <div className="modal confirm">
            <div className="modal-icon confirm">
                <TrashIcon size="40"></TrashIcon>
            </div>
            <h2 className="modal-title">{title}</h2>
            <p className="modal-message">{description}</p>
            <div className='bottom-btn-form'>
                <button className='modal-button confirm' onClick={onConfirm}>
                    {t('buttons.delete')}
                </button>
                <button className='cancel' onClick={onCancel}>
                    {t('buttons.cancel')}
                </button>
            </div>
        </div>
    )
}