import { CheckIcon, PlusIcon } from "../Icons";

type successProps = {
    title: string;
    message: string;
    onClose: () => void;
}

export const SuccessAlert = ({ title, message, onClose }: successProps) => {

    return (
        <div className="modal success">
            <div className="modal-icon success">
                <CheckIcon size="55"></CheckIcon>
            </div>
            <h2 className="modal-title">{title}</h2>
            <p className="modal-message success">{message}</p>
            <button onClick={onClose} className="modal-button-success">
                <PlusIcon color={"#92959F"} rotate={45} size={30}></PlusIcon>
            </button>
        </div>
    )
}