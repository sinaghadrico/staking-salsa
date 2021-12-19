import { FC } from "react";
import { useThemeDispatch } from "states/themeContext";
import "./ThemeSelector.scss";

const ThemeSelector: FC = () => {
    const themeDispatch = useThemeDispatch();
    return (
        <div className="theme-selector">
            ThemeSelector
            <button
                className="theme-selector__btn"
                onClick={() => {
                    themeDispatch({ type: "toggleTheme" });
                }}
            >
                change Theme
            </button>
        </div>
    );
};
ThemeSelector.defaultProps = {};
export default ThemeSelector;
