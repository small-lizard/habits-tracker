import { useTranslation } from "react-i18next"

type ConfirmDialogProps = {
    title: string
    description: string
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmDialog({ title, description, onConfirm, onCancel }: ConfirmDialogProps) {
    const { t } = useTranslation();

    return (
        <div className='delete-popup'>
            <h2 className="delete-popup-title">{title}</h2>
            <p className="delete-popup-text">{description}</p>
            <div className='bottom-btn-form'>
                <button className='submit delete-btn' onClick={onConfirm}>
                    {t('buttons.delete')}
                </button>
                <button className='cancel' onClick={onCancel}>
                    {t('buttons.cancel')}
                </button>
            </div>
        </div>
    )
}