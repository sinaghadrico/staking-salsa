import { LabelProps } from "./Label.interface";
import "./Label.scss";

const Label = ({ children, label, color, filled, style, className }: LabelProps) => {
    const _filled = filled ? "filled" : "empty";
    let totalClasses = color ? `ui-label ui-label-${color}-${_filled}` : `ui-label`;
    totalClasses = className ? totalClasses + " " + className : totalClasses;
    return (
        <span style={style} className={totalClasses}>
            {label ? label : children}
        </span>
    );
};
export default Label;
