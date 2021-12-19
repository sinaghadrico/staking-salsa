/* eslint-disable @typescript-eslint/no-unused-vars */
import "./Tab.scss";
import useTab from "./useTab";

interface Props {
    children: React.ReactNode;
    value?: any;
    onChange?: any;
    selected?: boolean;
    style?: object;
    className?: string;
    hasBorder?: boolean;
    borderBottomWidth?: string;
    [x: string]: any;
}
const Tab = ({
    children,
    value,
    selected,
    onChange,
    style,
    className,
    hasBorder,
    borderBottomWidth,
    ...rest
}: Props) => {
    const { tabChildrenClassName, borderBottomClassName, containerClassName, buttonClassName } = useTab(
        hasBorder,
        selected,
    );
    const handleClick = (event: any) => {
        if (onChange) {
            onChange(value, event);
        }
    };
    return (
        <div style={style} className={containerClassName()}>
            <button className={buttonClassName()} onClick={handleClick} {...rest}>
                <div className={tabChildrenClassName()}> {children} </div>
                <div
                    style={{ width: borderBottomWidth ? borderBottomWidth : "120px" }}
                    className={borderBottomClassName()}
                ></div>
            </button>
        </div>
    );
};
export default Tab;
