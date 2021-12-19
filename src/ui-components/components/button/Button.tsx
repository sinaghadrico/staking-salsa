/* eslint-disable @typescript-eslint/no-empty-function */
import { useRestProps } from "hooks/useRestProps";

import { ButtonForm, ButtonWidth } from "./Button.enum";
import { ButtonProps } from "./Button.interface";
import "./Button.scss";

const Button = ({
    width = ButtonWidth.FIT_CONTENT,
    buttonForm = ButtonForm.PRIMARY,
    children,
    onClick = () => {},
    theme = "orange",
    ...rest
}: ButtonProps) => {
    const { applyTo } = useRestProps(rest);

    return (
        <button
            {...applyTo({
                style: { width },
                className: `ui-button ui-button-${buttonForm}  ${theme}-theme`,
            })}
            onClick={(event) => onClick(event)}
        >
            {children}
        </button>
    );
};

export default Button;
