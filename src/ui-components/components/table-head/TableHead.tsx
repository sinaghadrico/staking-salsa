import classnames from "classnames";
import "./TableHead.scss";
import { TableHeadProps } from "./TableHead.interface";
const TableHead = ({ style, className, children, ...rest }: TableHeadProps) => {
    return (
        <thead {...rest} style={style} className={classnames("ui-table-head", className)}>
            {children}
        </thead>
    );
};

export default TableHead;
