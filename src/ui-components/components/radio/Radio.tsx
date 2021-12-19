import React from "react";
import { RadioProps } from "./Radio.interface";
import "./Radio.scss";

const Radio = ({ value, checked, onChange, children, theme = "orange", ...rest }: RadioProps) => {
    const label = "radio" + value;

    return (
        <div className={`ui-radio ${theme + "-theme"}`}>
            <label className="ui-radio-label ui-radio-before">
                <span className="ui-radio-input">
                    <input
                        type="radio"
                        name={label}
                        value={value}
                        id={label}
                        checked={checked}
                        onChange={onChange}
                        {...rest}
                    />
                    <span className="ui-radio-control"></span>
                </span>
                <span className="ui-radio-label">{children}</span>
            </label>
        </div>
    );
};
export default Radio;
