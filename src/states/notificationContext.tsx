import { useReducer, createContext } from "react";
const ACTION_TYPES = {
    ADD_NOTIFICATION: "addNotification",
    CLEAR__ALL_NOTIFICATIONS: "clearAllNotification",
    CLEAR_NOTIFICATION: "clearNotification",
};
const initialState = {
    messages: [],
};

const NotificationContext = createContext(initialState as any);

const reducer = (state: any, action: any) => {
    const { type, value } = action;
    switch (type) {
        case ACTION_TYPES.ADD_NOTIFICATION:
            return {
                messages: [...state.messages, value],
            };
        case ACTION_TYPES.CLEAR_NOTIFICATION:
            return {
                messages: [...state.messages.filter((item: any) => item.id !== value)],
            };
        case ACTION_TYPES.CLEAR__ALL_NOTIFICATIONS:
            return {
                messages: [],
            };

        default:
            return state;
    }
};
const NotificationProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <NotificationContext.Provider value={value}>{props.children}</NotificationContext.Provider>;
};
export { NotificationProvider, NotificationContext };
