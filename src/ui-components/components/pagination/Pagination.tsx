import { PaginationComponentProps } from "./Pagination.interface";

import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "./Pagination.scss";
const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage = 1,
    pageSize = 10,
    className,
    style,
    theme = "orange",
}: PaginationComponentProps) => {
    const paginationRange: any = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange?.length < 2) {
        return null;
    }

    const onNextPage = () => {
        onPageChange(currentPage + 1);
    };

    const onPreviousPage = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className={classnames("ui-pagination", `${theme}-theme`, className)} style={style}>
            <li
                className={classnames("ui-pagination-item", {
                    "ui-pagination-item-disabled": currentPage === 1,
                })}
                onClick={onPreviousPage}
            >
                <div className="ui-pagination-item-arrow ui-pagination-item-arrow-left" />
            </li>
            {paginationRange.map((pageNumber: string | number, index: number) => {
                if (pageNumber === DOTS) {
                    return <li className="ui-pagination-item ui-pagination-item-dots">&#8230;</li>;
                }

                return (
                    <li
                        className={classnames("ui-pagination-item", {
                            "ui-pagination-item-selected": pageNumber === currentPage,
                        })}
                        key={index + "ui-pagination-item-selected"}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames("ui-pagination-item", {
                    "ui-pagination-item-disabled": currentPage === lastPage,
                })}
                onClick={onNextPage}
            >
                <div className="ui-pagination-item-arrow ui-pagination-item-arrow-right" />
            </li>
        </ul>
    );
};

export default Pagination;
