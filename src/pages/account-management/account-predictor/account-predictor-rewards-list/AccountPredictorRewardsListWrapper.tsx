import { useState } from "react";
import { AccountPredictorRewardsRow } from "./account-predictor-rewards-row";
import { Stake } from "models";
import { Column } from "models/column";
import "./AccountPredictorRewardsList.scss";

export interface AccountPredictorRewardsListWrapperProps {
    data: any;
    columns: Column[];
}
const AccountPredictorRewardsListWrapper = ({ data, columns }: AccountPredictorRewardsListWrapperProps) => {
    const [expandItem, setExpandItem] = useState<string | null>(null);

    return (
        <>
            {data &&
                data?.stakes?.map((stake: Stake, stakeIndex: number) => {
                    return (
                        <AccountPredictorRewardsRow
                            key={stakeIndex}
                            data={stake}
                            expandItem={expandItem}
                            setExpandItem={setExpandItem}
                            columns={columns}
                            // refetchPoolData={refetchPoolData}
                        />
                    );
                })}
        </>
    );
};
AccountPredictorRewardsListWrapper.defaultProps = {};
export default AccountPredictorRewardsListWrapper;
