import { useEffect, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import "./bottomSheet.css"

type Props = {
    children: React.ReactNode;
    onClose: any
};

export function BottomSheetWrapperMobile({ children, onClose }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(ref, () => {
        const element = ref.current;
        if (!element) {
            return;
        }

        element.classList.remove("open");
    }, true);

    useEffect(() => {
        requestAnimationFrame(() => {
            const element = ref.current;
            if (!element) {
                return;
            }

            element.classList.add("open");
        });
        
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        const onTransitionEnd = () => {
            if (!element.classList.contains("open")) {
                onClose();
            }
        };

        element.addEventListener("transitionend", onTransitionEnd);

        return () => element.removeEventListener("transitionend", onTransitionEnd);
    }, [onClose]);

    return <div className='bottom-sheet-overlay'>
        <div ref={ref} className="bottom-sheet">
            {children}
        </div>
    </div>
}