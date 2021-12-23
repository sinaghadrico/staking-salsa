/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Stake, StatusClass } from "models";
import { FC, useEffect } from "react";
import { Label, Currency, CurrencyUnit, Button, TableRow, TableCell, ButtonWidth } from "ui-components";
import "./AccountPredictorRewardsRow.scss";
import ContentLoader from "react-content-loader";
import { TransactionAddress } from "components/transaction-address";

import { Icon } from "components/icon";
import expand_logo from "assets/icons/svgs/expand.svg";

import { transactionEndpoint } from "utils/configs";

import { TotemClaimDetails } from "./totem-claim-details";
import { PairCoin } from "components/pair-coin";

import { motion, AnimatePresence } from "framer-motion";
import { Column } from "models/column";
import { useLPStaker } from "services/predictor/contract/useLPStaker";
import { useQuery } from "react-query";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";

export interface AccountPredictorRewardsRowProps {
    className?: string;
    children?: React.ReactNode;
    data: any;
    expandItem: string | null;
    columns: Column[];
    refetchPoolData?: any;
    setExpandItem: (expand: string | null) => void;
}

const AccountPredictorRewardsRow: FC<AccountPredictorRewardsRowProps> = ({
    data,
    expandItem,
    setExpandItem,
    columns,
    refetchPoolData,
}: AccountPredictorRewardsRowProps) => {
    const { id, address, asset, APY, TVL, earned, status } = data;
    const { account } = useWebWallet();
    const lpstaker = useLPStaker(address);
    const { data: initialData, isLoading } = useQuery(
        ["initialData", account],
        () => lpstaker.getInitialData(account || "0x00"),
        {
            enabled: !!lpstaker.contract && !!account,
        },
    );

    const hasExpandRow = true;

    const isExpand = expandItem === (id || null) ? true : false;
    return (
        <>
            <TableRow
                className={
                    isExpand ? "account-predictor-rewards-row border-bottom-row" : "account-predictor-rewards-row"
                }
            >
                <TableCell dataHead={columns[0]?.title}>
                    <div className="account-predictor-rewards-row-title">
                        <PairCoin size={24} subCoin={asset} supCoin={"totem"} />
                        {"TWA + " + asset}
                    </div>
                </TableCell>

                <TableCell dataHead={columns[1]?.title}>
                    {isLoading ? (
                        <ContentLoader
                            animate={true}
                            speed={2}
                            width={100}
                            height={50}
                            viewBox="0 0 100 10"
                            backgroundColor="#737373"
                            foregroundColor="#414244"
                        >
                            <rect x="5" y="0" rx="3" ry="3" width="100" height="6" />
                        </ContentLoader>
                    ) : status === "Completed" ? (
                        <span style={{ color: "#52C41A" }}>{initialData?.apy} PEX</span>
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell dataHead={columns[2]?.title}>
                    {isLoading ? (
                        <ContentLoader
                            animate={true}
                            speed={2}
                            width={100}
                            height={50}
                            viewBox="0 0 100 10"
                            backgroundColor="#737373"
                            foregroundColor="#414244"
                        >
                            <rect x="5" y="0" rx="3" ry="3" width="100" height="6" />
                        </ContentLoader>
                    ) : status === "Completed" ? (
                        <Currency size="16px" value={initialData?.totalValueLock || 0} unit={CurrencyUnit.DOLLAR} />
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell dataHead={columns[3]?.title}>
                    {isLoading ? (
                        <ContentLoader
                            animate={true}
                            speed={2}
                            width={100}
                            height={50}
                            viewBox="0 0 100 10"
                            backgroundColor="#737373"
                            foregroundColor="#414244"
                        >
                            <rect x="5" y="0" rx="3" ry="3" width="100" height="6" />
                        </ContentLoader>
                    ) : status === "Completed" ? (
                        <span>
                            {" "}
                            <Currency size="16px" value={initialData?.rewards || 0} unit={CurrencyUnit.NONE} /> TWA
                        </span>
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell dataHead={columns[4]?.title}>
                    <div className="account-predictor-rewards-row-action">
                        <div
                            className={
                                "ui-collapse" + (isExpand === true ? " ui-collapse-expand" : " ui-collapse-close")
                            }
                            onClick={() => {
                                setExpandItem(isExpand ? null : id || null);
                            }}
                        >
                            <Icon src={expand_logo} />
                        </div>
                    </div>
                </TableCell>
            </TableRow>
            <AnimatePresence>
                {hasExpandRow && isExpand && (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <td colSpan={5}>
                            <TotemClaimDetails
                                data={data}
                                isLoading={isLoading}
                                initialData={initialData}
                                refetchPoolData={refetchPoolData}
                            />
                        </td>
                    </motion.tr>
                )}
            </AnimatePresence>
        </>
    );
};
AccountPredictorRewardsRow.defaultProps = {};
export default AccountPredictorRewardsRow;
