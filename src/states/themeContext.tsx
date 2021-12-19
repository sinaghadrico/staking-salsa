import { useCookie } from "hooks";
import { createContext, useContext, useReducer } from "react";

enum ThemeValue {
    LIGHT = "light",
    DARK = "dark",
}
enum ThemeType {
    SET = "setTheme",
    TOGGLE = "toggleTheme",
}
interface ThemeReducerAction {
    type: ThemeType | string;
    value?: ThemeValue | string;
}

const initialState = {
    theme: "dark",
};

const ThemeStateContext = createContext(initialState as any);
const ThemeDispatchContext = createContext((() => 0) as React.Dispatch<ThemeReducerAction>);

const themeReducer = (state: any, action: ThemeReducerAction) => {
    switch (action.type) {
        case "setTheme":
            return { ...state, theme: action.value };
        case "toggleTheme":
            return { ...state, theme: state.theme === "light" ? "dark" : "light" };
        default:
            throw new Error(`Unexpected action: ${action.type}`);
    }
};

const ThemeProvider = (props: any) => {
    const { getCookie } = useCookie();
    const userTheme = getCookie("user_theme");
    const initialThemeState = { theme: userTheme || initialState.theme };
    const [themeState, DispatchThemeState] = useReducer(themeReducer, {
        ...initialThemeState,
        ...props?.value,
    });

    return (
        <ThemeStateContext.Provider value={themeState}>
            <ThemeDispatchContext.Provider value={DispatchThemeState}>{props.children}</ThemeDispatchContext.Provider>
        </ThemeStateContext.Provider>
    );
};

const useThemeState = () => {
    const context = useContext(ThemeStateContext);
    if (context === undefined) {
        throw new Error("useThemeState must be used within a ThemeProvider");
    }
    return context;
};

const useThemeDispatch = () => {
    const context = useContext(ThemeDispatchContext);
    if (context === undefined) {
        throw new Error("useThemeDispatch must be used within a ThemeProvider");
    }
    return context;
};

export { ThemeProvider, useThemeState, useThemeDispatch, ThemeType, ThemeValue };
