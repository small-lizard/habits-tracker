import { useRef } from "react";
import { AccountOptionsIcon } from "./Icons";
import { OpthionsDropdown } from "./OpthionsDropdown";

type Props = {
    name: string;
    email: string;
    isAccOpthionsOpen: boolean;
    onClose: (value: any) => void;
};

export function Account({ name, email, isAccOpthionsOpen, onClose }: Props) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <div className='account'>
            <div className='account-info'>
                <span className='account-icon'>{name.charAt(0).toUpperCase()}</span>
                <div className='account-text'>
                    <p className='account-name'>{name}</p>
                    <p className='account-email'>{email}</p>
                </div>
            </div>

            <button
                ref={buttonRef}
                className='options-button'
                onClick={() => onClose((prev: boolean) => !prev)}
            >
                <AccountOptionsIcon />
            </button>

            {isAccOpthionsOpen && (
                <OpthionsDropdown onClose={() => onClose(false)} ignoreButtonRef={buttonRef} />
            )}
        </div>
    );
}
