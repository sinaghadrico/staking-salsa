import { CheckboxProps } from "./Checkbox.interface";
import "./Checkbox.scss";

export const Checkbox = ({ children, checked, onChange }: CheckboxProps) => {
    return (
        <div className="ui-component-checkbox">
            <span onClick={onChange} className="ui-component-checkbox-span">
                <input readOnly checked={checked} className="ui-component-checkbox-input" type="checkbox" />
                <label className="ui-component-checkbox-label"></label>
            </span>
            {children && <span className="ui-component-checkbox-text">{children}</span>}
        </div>
    );
};
