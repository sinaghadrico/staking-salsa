/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Label, Currency, CurrencyUnit, Button, ButtonWidth, ButtonForm, Input } from "ui-components";
import { Stake } from "models";
import "./TotemClaimDetails.scss";
import { useMutation } from "react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ContentLoader from "react-content-loader";
import { formatNumberWithCommas, isValidNumber, parseValueToNumber } from "utils/number";
import { useLPStaker } from "services/predictor/contract/useLPStaker";
import { useNotification } from "hooks";

export interface TotemClaimDetailsProps {
    className?: string;

    data: any;

    refetchPoolData: any;
}

const TotemClaimDetails = ({ data, refetchPoolData }: TotemClaimDetailsProps) => {
    const { id, address, asset, APY, TVL, earned, status } = data;

    const isLoadingOriginalStake = false;

    const [stakeAmount, setStakeAmount] = useState<any>(0);
    const [withdrawAmount, setWithdrawAmount] = useState<any>(0);

    const lpstaker = useLPStaker(address);
    const notification = useNotification();

    const handleChange = (event: any) => {
        const { name, value: _value } = event.target;
        const value = parseValueToNumber("" + _value);
        const isValid = isValidNumber("" + _value);

        if (isValid) {
            if (name === "stakeAmount") {
                setStakeAmount(value);
            } else if (name === "withdrawAmount") {
                setWithdrawAmount(value);
            } else {
                setStakeAmount(value);
            }
        }
    };
    const mutationStake = useMutation((_form: any): any => {
        return lpstaker?.deposit(_form?.stakeAmount);
    });
    const mutationClaim = useMutation((_form: any): any => {
        return lpstaker?.claim();
    });
    const mutationWithdraw = useMutation((_form: any): any => {
        return lpstaker?.withdraw(_form?.withdrawAmount);
    });

    const handleStake = () => {
        // if (Number(form.price) === 0) {
        //     notification.error(`Price value must be greater than 0`);
        // mutationStake.reset();
        //     return;
        // }

        // if (totemTokenBalance && form.amount > totemTokenBalance) {
        //     notification.error("You don't have sufficient amount of TOTM.");
        // mutationStake.reset();
        //     return;
        // }
        if (!mutationStake?.isSuccess) {
            mutationStake.mutate(
                { stakeAmount },
                {
                    onSuccess: () => {},
                },
            );
        }
    };
    const handleClaim = () => {
        // if (Number(form.price) === 0) {
        //     notification.error(`Price value must be greater than 0`);
        // mutationStake.reset();
        //     return;
        // }

        // if (totemTokenBalance && form.amount > totemTokenBalance) {
        //     notification.error("You don't have sufficient amount of TOTM.");
        // mutationStake.reset();
        //     return;
        // }
        if (!mutationStake?.isSuccess) {
            mutationClaim.mutate(
                {},
                {
                    onSuccess: () => {},
                },
            );
        }
    };
    const handleWithdraw = () => {
        // if (Number(form.price) === 0) {
        //     notification.error(`Price value must be greater than 0`);
        // mutationStake.reset();
        //     return;
        // }

        // if (totemTokenBalance && form.amount > totemTokenBalance) {
        //     notification.error("You don't have sufficient amount of TOTM.");
        // mutationStake.reset();
        //     return;
        // }
        if (!mutationStake?.isSuccess) {
            mutationWithdraw.mutate(
                { withdrawAmount },
                {
                    onSuccess: () => {},
                },
            );
        }
    };
    return (
        <>
            <AnimatePresence>
                <motion.div
                    className="totem-claim-details"
                    // initial={{ height: 0 }}
                    // animate={{ height: "auto" }}
                    // exit={{ height: 0 }}
                >
                    <div className="row totem-claim-details-main">
                        <div className="col-md-4 col-xs-12 flex-column-align-center">
                            <div className="totem-claim-details-item py-10 height-45">
                                <div className="flex-align-center">TVL</div>
                                <div className="flex-align-center-justify-end">
                                    {isLoadingOriginalStake ? (
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
                                        <Currency color="#ff8103" value={TVL} unit={CurrencyUnit.TWA} />
                                    )}
                                </div>
                            </div>
                            <div className="totem-claim-details-item mt-10  py-10  height-35">
                                <div className="flex-align-center">APY</div>
                                <div className="text-right flex-align-center-justify-end">
                                    {isLoadingOriginalStake ? (
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
                                        <Currency color="#ff8103" value={APY} unit={CurrencyUnit.TWA} />
                                    )}
                                </div>
                            </div>
                            <div className="totem-claim-details-item mt-10  py-10  height-35">
                                <div className="flex-align-center">Token contract</div>
                                <div className="text-right flex-align-center-justify-end">
                                    {isLoadingOriginalStake ? (
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
                                        <Currency color="#ff8103" value={APY} unit={CurrencyUnit.TWA} />
                                    )}
                                </div>
                            </div>
                            <div className="totem-claim-details-item mt-10  py-10  height-35">
                                <div className="flex-align-center"> {"TWA + " + asset} LP token price:</div>
                                <div className="text-right flex-align-center-justify-end">
                                    {isLoadingOriginalStake ? (
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
                                        <Currency color="#ff8103" value={APY} unit={CurrencyUnit.TWA} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12 flex-column-align-center">
                            <div className="flex-align-center ">Add liquidity on PancakeSwap v2</div>

                            <div className="flex-align-center mt-50">Rewards : - TWA</div>

                            <div className="flex-align-center mt-50">
                                <Button
                                    width={ButtonWidth.FIT_PARENT}
                                    onClick={handleClaim}
                                    buttonForm={ButtonForm.SECONDARY}
                                >
                                    Claim rewards
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12 flex-column">
                            <div className=" py-10  flex-column">
                                <div className="">Your wallet balance: NaN</div>
                                <div className="flex mt-15">
                                    <Input
                                        className="predictor-pool-details-container-form-predict-price-input"
                                        prefix={""}
                                        value={formatNumberWithCommas(stakeAmount)}
                                        name="stakeAmount"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <div className="flex-align-center">
                                        <Button
                                            width={ButtonWidth.FIT_PARENT}
                                            onClick={handleStake}
                                            buttonForm={ButtonForm.SECONDARY}
                                        >
                                            stake
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-10  flex-column">
                                <div className="">Your staked balance: NaN</div>
                                <div className="flex mt-15">
                                    <Input
                                        className="predictor-pool-details-container-form-predict-price-input"
                                        prefix={""}
                                        value={formatNumberWithCommas(withdrawAmount)}
                                        name="withdrawAmount"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <div className="flex-align-center">
                                        <Button
                                            width={ButtonWidth.FIT_PARENT}
                                            onClick={handleWithdraw}
                                            buttonForm={ButtonForm.SECONDARY}
                                        >
                                            Withdraw
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default TotemClaimDetails;
