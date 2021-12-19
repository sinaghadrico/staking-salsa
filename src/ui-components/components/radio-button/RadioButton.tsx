import React from "react";
import { RadioButtonProps } from "./RadioButton.interface";
import "./RadioButton.scss";

const RadioButton = ({ value, checked, onChange, children, ...rest }: RadioButtonProps) => {
    const label = "radioButton" + value;
    return (
        <div className="ui-radio-button">
            <input type="radio" onChange={onChange} id={label} name={label} value={value} checked={checked} {...rest} />
            <label htmlFor={label}>
                <span>{children}</span>
            </label>
        </div>
    );
};
export default RadioButton;
