/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { FC } from "react";
import { Currency, CurrencyUnit, TableRow, TableCell } from "ui-components";
import "./AccountPredictorRewardsRow.scss";
import ContentLoader from "react-content-loader";

import { Icon } from "components/icon";
import expand_logo from "assets/icons/svgs/expand.svg";

import { ClaimDetails } from "./claim-details";
import { PairCoin } from "components/pair-coin";

import { motion, AnimatePresence } from "framer-motion";
import { Column } from "models/column";
import { useTokenStaker } from "services/predictor/contract/useTokenStaker";
import { useQuery } from "react-query";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";
import usePrices from "services/usePrices";
import { intervalDataUpdate, tokenName } from "utils/configs";
import { Stake } from "models";

export interface AccountPredictorRewardsRowProps {
    className?: string;
    children?: React.ReactNode;
    data: Stake;
    expandItem: string | null;
    columns: Column[];

    setExpandItem: (expand: string | null) => void;
}

const AccountPredictorRewardsRow: FC<AccountPredictorRewardsRowProps> = ({
    data,
    expandItem,
    setExpandItem,
    columns,
}: AccountPredictorRewardsRowProps) => {
    const { id, address, asset } = data;
    const { account } = useWebWallet();
    const tokenStaker = useTokenStaker(address);
    const { coinPrice } = usePrices("bitcoin");
    const { data: initialData, isLoading } = useQuery(
        [`initialData-${id}`, id, account],
        () => tokenStaker.getInitialData(account || "0x00"),
        {
            refetchOnWindowFocus: false,
            enabled: !!tokenStaker.contract && !!account,
            refetchInterval: intervalDataUpdate,
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
                        <PairCoin size={24} subCoin={asset} supCoin={"token"} />
                        {`${tokenName} + ${asset}`}
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
                    ) : (
                        <span style={{ color: "#52C41A" }}>
                            {initialData?.apy} % {tokenName}
                        </span>
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
                    ) : (
                        <Currency
                            size="16px"
                            value={initialData?.totalValueLock * coinPrice || 0}
                            unit={CurrencyUnit.DOLLAR}
                        />
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
                    ) : (
                        <>
                            <Currency size="16px" value={initialData?.rewards || 0} unit={CurrencyUnit.NONE} /> {""}
                            {tokenName}
                        </>
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
                            <ClaimDetails data={data} isLoading={isLoading} initialData={initialData} />
                        </td>
                    </motion.tr>
                )}
            </AnimatePresence>
        </>
    );
};
AccountPredictorRewardsRow.defaultProps = {};
export default AccountPredictorRewardsRow;
