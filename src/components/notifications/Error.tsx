import { PlusIcon } from "../Icons"
import "./notifications.css";

type errorProps = {
    title: string;
    message: string;
    onClose: any
}

export const ErrorAlert = ({ title, message, onClose }: errorProps) => {
    return (
        <div className="alert-modal">
            <p className="alert-modal-head">{title}</p>
            <p className="alert-modal-text">{message}</p>
            <button className="button-close" onClick={() => onClose()}><PlusIcon color="#ee4e4e" rotate={45} /></button>
        </div>
    )
}