import { FC, useState } from "react";
import { ExampleProps } from "./Example.interface";
import "./Example.scss";
import { useThemeDispatch } from "states/themeContext";
const Example: FC<ExampleProps> = ({ inputPropEX, onOutputPropEX, children, ...rest }: ExampleProps) => {
    const [stateEx, setStateEx] = useState(0);

    const themeDispatch = useThemeDispatch();
    return (
        <div className="example" {...rest}>
            Example Component
            <h1 className="example__title">{inputPropEX?.title}</h1>
            <p className="example__description">{inputPropEX?.description}</p>
            <button className="example__btn" onClick={onOutputPropEX}>
                {children}
            </button>
            <button className="example__btn_Click" onClick={() => setStateEx(1)}>
                Press Click ( {stateEx} )
            </button>
            <button
                className="example__btn_theme"
                onClick={() => {
                    themeDispatch({ type: "toggleTheme" });
                }}
            >
                change Theme
            </button>
        </div>
    );
};
Example.defaultProps = {
    inputPropEX: { title: "Example Title", description: "Example Description" },
};
export default Example;
