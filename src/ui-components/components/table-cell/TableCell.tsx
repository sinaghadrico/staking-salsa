import "./TableCell.scss";
interface Props {
    component?: string;
    dataHead?: string;
    children: React.ReactNode;
    [x: string]: any;
}
const TableCell = ({ component, children, dataHead, ...rest }: Props) => {
    const output =
        component === "th" ? (
            <th {...rest} className="ui-table-cell">
                {children}
            </th>
        ) : (
            <td {...rest} data-th={dataHead} className="ui-table-cell">
                {children}
            </td>
        );
    return output;
};

export default TableCell;
