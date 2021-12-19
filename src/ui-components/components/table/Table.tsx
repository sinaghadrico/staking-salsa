import classnames from "classnames";
import "./Table.scss";
import { TableProps } from "./Table.interface";
const Table = ({ children, style, className, ...rest }: TableProps) => {
    return (
        <div style={style} className={classnames("ui-table", className)}>
            <table {...rest}>{children}</table>
        </div>
    );
};

export default Table;
