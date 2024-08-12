import { iconClose } from "../../assets/svg/icons";

export function Popup(props: any) {
    return (
        <div className="pop-up-background">
            <div className="pop-up">
                <button onClick={props.onClose} className="close-icon">{iconClose}</button>
                {props.children}
            </div>
        </div>
    )
}