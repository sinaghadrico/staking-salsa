import { useContext } from "react";

import { NotificationContext } from "../states/notificationContext";

const useNotification = () => {
    const { state, dispatch } = useContext(NotificationContext);

    const error = (content: any) => {
        const id = new Date();
        dispatch({
            type: "addNotification",
            value: { content: content, type: "error", id },
        });
    };
    const success = (content: any) => {
        const id = new Date();
        dispatch({
            type: "addNotification",
            value: { content: content, type: "success", id },
        });
    };
    const warning = (content: any) => {
        const id = new Date();
        dispatch({
            type: "addNotification",
            value: { content: content, type: "warning", id },
        });
    };
    const clearById = (id: any) => {
        dispatch({
            type: "clearNotification",
            value: id,
        });
    };
    const clearByIndex = (index: any) => {
        dispatch({
            type: "clearNotification",
            value: index,
        });
    };
    const clearAll = () => {
        dispatch({
            type: "clearAllNotification",
        });
    };

    return {
        error,
        success,
        warning,
        clearAll,
        clearByIndex,
        clearById,
        state,
        dispatch,
    };
};

export default useNotification;
