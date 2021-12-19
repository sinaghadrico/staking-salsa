export type PaginationComponentProps = {
    pageSize: number;
    totalCount: number;
    currentPage: number;
    siblingCount: number;
    onPageChange: (currentPage: string | number) => void;
    style?: Object;
    className?: string;
    theme?: string;
};
