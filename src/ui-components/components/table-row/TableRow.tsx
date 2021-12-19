import classnames from "classnames";
import "./TableRow.scss";
import { TableRowProps } from "./TableRow.interface";
const TableRow = ({ children, style, className, ...rest }: TableRowProps) => {
    return (
        <tr {...rest} style={style} className={classnames("ui-table-row", className)}>
            {children}
        </tr>
    );
};

export default TableRow;
