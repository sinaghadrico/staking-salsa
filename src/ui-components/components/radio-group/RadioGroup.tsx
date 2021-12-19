import React from "react";
import { RadioGroupProps } from "./RadioGroup.interface";
import classnames from "classnames";
import "./RadioGroup.scss";

const RadioGroup = ({ children, onChange, value, className }: RadioGroupProps) => {
    const _children = React.Children.map(children, (child: any) => {
        const checked = child.props.value === Number(value);
        return React.cloneElement(child, {
            onChange: onChange,
            checked,
        });
    });
    return <div className={classnames("ui-radio-group", className)}>{_children}</div>;
};
export default RadioGroup;
