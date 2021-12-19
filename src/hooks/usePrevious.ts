import { useRef, useEffect } from "react";

const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current || { status: undefined };
};

export default usePrevious;
