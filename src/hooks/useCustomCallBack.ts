import { useState } from "react";

const useCustomCallBack = (initialValue: any) => {
    const [state, setState] = useState(initialValue);

    const setCustomState = (value: any, callback: any) => {
        setState(value);
        typeof callback === "function" && callback(state);
    };

    return [state, setCustomState];
};

export default useCustomCallBack;
