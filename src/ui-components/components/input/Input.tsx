import { InputProps } from "./Input.interface";
import "./Input.scss";

const Input = ({
    value,
    prefix,
    suffix,
    style,
    className,
    placeHolder,
    onChange,
    theme = "orange",
    ...rest
}: InputProps) => {
    const _className = className ? `ui-input ${className + " " + theme + "-theme"}` : `ui-input ${theme + "-theme"}`;
    return (
        <div className={_className}>
            {suffix && <div className="ui-input-suffix">{suffix}</div>}
            {prefix && <div className="ui-input-prefix">{prefix}</div>}
            <input type="string" style={style} {...rest} onChange={onChange} value={value} placeholder={placeHolder} />
        </div>
    );
};
export default Input;
