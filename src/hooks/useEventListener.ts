import { useEffect, useRef } from "react";

/**
 * event listener
 * @param {*string} eventType click - scroll - mposehover or ...
 * @param {*function} handler function
 * @param {*boolean} enabled event activity
 * @param {*element} target document - window or ...
 */
const useEventListener = (eventType: any, handler: any, { enabled = true, target = document } = {}) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        if (!enabled) return;

        const incrementalHandler = (e: any) => {
            return handlerRef.current(e);
        };

        target && target.addEventListener(eventType, incrementalHandler);

        return () => {
            target && target.removeEventListener(eventType, incrementalHandler);
        };
    }, [eventType, enabled, target]);
};

export default useEventListener;
