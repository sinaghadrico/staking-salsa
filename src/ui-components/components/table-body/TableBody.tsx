import classnames from "classnames";
import "./TableBody.scss";
import { TableBodyProps } from "./TableBody.interface";
const TableBody = ({ className, style, children, ...rest }: TableBodyProps) => {
    return (
        <tbody {...rest} style={style} className={classnames("ui-table-body", className)}>
            {children}
        </tbody>
    );
};

export default TableBody;
