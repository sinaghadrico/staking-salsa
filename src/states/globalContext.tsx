import { useReducer, createContext, useContext } from "react";

const initialState = {
    walletOptions: false,
    poolsFilters: { label: "Status", value: "All" },
    poolsOrderBy: "maturity_time",
};

const GlobalStateContext = createContext(initialState as any);
const GlobalDispatchContext = createContext((() => 0) as React.Dispatch<any>);

const globalReducer = (state: any, action: any) => {
    switch (action.type) {
        case "setWalletOptions":
            return { ...state, walletOptions: action.value };
        case "toggleWalletOptions":
            return { ...state, walletOptions: !state.walletOptions };
        case "setPoolFilters":
            return { ...state, poolsFilters: action.value };
        case "setPoolsOrderBy":
            return { ...state, poolsOrderBy: action.value };

        default:
            throw new Error(`Unexpected action: ${action.type}`);
    }
};

const GlobalProvider = (props: any) => {
    const [globalState, DispatchGlobalState] = useReducer(globalReducer, {
        ...initialState,
        ...props?.value,
    });
    return (
        <GlobalStateContext.Provider value={globalState}>
            <GlobalDispatchContext.Provider value={DispatchGlobalState}>
                {props.children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
};

const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalProvider");
    }
    return context;
};

const useGlobalDispatch = () => {
    const context = useContext(GlobalDispatchContext);
    if (context === undefined) {
        throw new Error("useGlobalDispatch must be used within a GlobalProvider");
    }
    return context;
};

export { GlobalProvider, useGlobalState, useGlobalDispatch };
