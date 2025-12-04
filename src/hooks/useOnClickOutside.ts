import { RefObject, useEffect } from "react";

export function useOnClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    handler: (event?: Event) => void,
    enabled = true,
    ignoreRefs: RefObject<HTMLElement | null>[] = []
) {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const listener = (event: Event) => {
            const node = ref.current;
            if (!node) {
                return;
            }

            if (node.contains(event.target as Node)) {
                return;
            }

            for (const ignoreRef of ignoreRefs) {
                if (ignoreRef.current?.contains(event.target as Node)) {
                    return;
                }
            }

            handler(event)
        }

        document.addEventListener('mousedown', listener)

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler, enabled, ignoreRefs])
}