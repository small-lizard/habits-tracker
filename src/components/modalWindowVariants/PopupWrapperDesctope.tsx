import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import "./popup.css"

type Props = {
    children: React.ReactNode;
    onClose: any
};

export function PopupWrapperDesctope({ children, onClose }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref, onClose, true)

    return <div className='popup-overlay'>
        <div ref={ref} className='popup'>
            {children}
        </div>
    </div>
}