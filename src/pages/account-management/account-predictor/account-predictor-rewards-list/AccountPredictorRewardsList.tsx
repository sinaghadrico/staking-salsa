import { FC } from "react";
import { Table, TableHead, TableRow, TableCell, Tooltip, TooltipPosition, TableBody } from "ui-components";
import { Icon } from "components/icon";
import { AccountPredictorRewardsRowLoader } from "./account-predictor-rewards-row";
import info_logo from "assets/icons/svgs/info.svg";
import usePredictorStakes from "services/predictor/api/usePredictorStakes";

import { Column } from "models/column";
import { useHistory } from "react-router";
import "./AccountPredictorRewardsList.scss";
import AccountPredictorRewardsListWrapper from "./AccountPredictorRewardsListWrapper";

const AccountPredictorRewardsList: FC = () => {
    const columns: Column[] = [
        { title: "Asset", description: null },
        { title: "APY", description: null },
        { title: "TVL", description: null },
        { title: "Rewards", description: null },
        { title: "Details", description: null },
    ];

    const pageSize = 6;

    const history = useHistory();

    const params = new URLSearchParams(history?.location?.search);
    const pageParam = params.get("page");
    const currentPage = pageParam ? Number(pageParam) : 1;

    const { data, isLoading, isFetching } = usePredictorStakes(currentPage - 1, pageSize);

    return (
        <div className="account-predictor-rewards-list">
            <Table>
                <TableHead>
                    <TableRow>
                        {columns?.map((column, index) => (
                            <TableCell key={column.title || index} component="th">
                                <div>
                                    <span>{column?.title}</span>
                                    {column.description && (
                                        <Tooltip description={column?.description} position={TooltipPosition.DOWN}>
                                            <Icon src={info_logo} />
                                        </Tooltip>
                                    )}
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoading || isFetching || !data ? (
                        <>
                            {[0, 1, 2, 3, 4, 5]?.map((item) => (
                                <AccountPredictorRewardsRowLoader key={item} />
                            ))}
                        </>
                    ) : (
                        <>
                            {data?.total === 0 ? (
                                <TableRow rowSpan={6}>
                                    <TableCell
                                        colSpan={columns.length}
                                        style={{ height: 530, textAlign: "center", display: "revert" }}
                                    >
                                        There is no available stake
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <AccountPredictorRewardsListWrapper data={data} columns={columns} />
                            )}
                        </>
                    )}
                </TableBody>
            </Table>
            {/* {!!data?.total && (
                <Pagination
                    onPageChange={(page: number) => {
                        history.push(`/account-management?page=${page}`);
                    }}
                    className="my-15"
                    currentPage={currentPage}
                    totalCount={data?.total}
                    pageSize={pageSize}
                />
            )} */}
        </div>
    );
};
AccountPredictorRewardsList.defaultProps = {};
export default AccountPredictorRewardsList;
