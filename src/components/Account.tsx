import { useRef, useState } from "react";
import { AccountOptionsIcon } from "./Icons";
import { OptionsDropdown } from "./OptionsDropdown";

type Props = {
    name: string;
    email: string;
    isMobile: boolean
};

export function Account({ name, email, isMobile }: Props) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isAccOpthionsOpen, setIsAccOpthions] = useState(false);

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
                onClick={() => setIsAccOpthions((prev: boolean) => !prev)}
            >
                <AccountOptionsIcon />
            </button>

            {isAccOpthionsOpen && (
                <OptionsDropdown onClose={() => setIsAccOpthions(false)} ignoreButtonRef={buttonRef} isMobile={isMobile} />
            )}
        </div>
    );
}
