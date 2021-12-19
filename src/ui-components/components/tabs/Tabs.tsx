import classnames from "classnames";
import React from "react";
import "./Tabs.scss";

interface Props {
    children: React.ReactNode;
    value?: any;
    onChange: any;
    style?: object;
    className?: string;
    hasBorder?: boolean;
}
const Tabs = ({ children, value, onChange, style, className, hasBorder }: Props) => {
    let childIndex = 0;
    const _children = React.Children.map(children, (child: any) => {
        const childValue = childIndex;
        const selected = childValue === value;
        childIndex += 1;
        return React.cloneElement(child, {
            onChange: onChange,
            value: childValue,
            selected,
            hasBorder,
        });
    });
    return (
        <div style={style} className={classnames("ui-tabs", className)}>
            {" "}
            {_children}{" "}
        </div>
    );
};
export default Tabs;
