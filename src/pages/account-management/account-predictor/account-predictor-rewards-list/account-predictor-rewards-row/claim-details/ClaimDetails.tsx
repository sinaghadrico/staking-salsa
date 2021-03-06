/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Label,
    Currency,
    CurrencyUnit,
    Button,
    ButtonWidth,
    ButtonForm,
    Input,
    Timer,
    TimerShowType,
    ConfirmModal,
} from "ui-components";
import "./ClaimDetails.scss";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ContentLoader from "react-content-loader";
import { formatNumberWithCommas, isValidNumber, parseValueToNumber } from "utils/number";
import { useTokenStaker } from "services/predictor/contract/useTokenStaker";
import { useNotification } from "hooks";
import { tokenName, transactionEndpoint } from "utils/configs";
import { TransactionAddress } from "components/transaction-address";
import { useToken } from "services/useToken";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";
import { useGlobalDispatch } from "states/globalContext";
import usePrices from "services/usePrices";
import success_logo from "assets/icons/svgs/rocket.svg";
import { Icon } from "components/icon";

export interface ClaimDetailsProps {
    className?: string;
    initialData: any;
    data: any;
    isLoading: boolean;
}

const ClaimDetails = ({ data, initialData = {}, isLoading }: ClaimDetailsProps) => {
    const { account } = useWebWallet();
    const globalDispatch = useGlobalDispatch();
    const queryClient = useQueryClient();
    const { id, address } = data;
    const {
        tokenContractAddress = "0x00",
        apy = "0",
        remainLockTime,
        totalValueLock = "0",
        rewards = "0",
        stakeAmount: stakeAmountNumber = "0",
    } = initialData;
    const isLoadingOriginalStake = isLoading;
    const { coinPrice } = usePrices("bitcoin");
    const [stakeAmount, setStakeAmount] = useState<any>(0);
    const [withdrawAmount, setWithdrawAmount] = useState<any>(0);

    const tokenStaker = useTokenStaker(address);
    const notification = useNotification();

    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

    const token = useToken();
    const { data: balance } = useQuery(["token-balance", account], () => token.getBalance(account), {
        enabled: !!token.contract && !!account,
    });

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
    const mutationApprove = useMutation((_form: any): any => {
        return tokenStaker?.approve(_form?.stakeAmount);
    });
    const mutationStake = useMutation((_form: any): any => {
        return tokenStaker?.stake(_form?.stakeAmount);
    });
    const mutationClaim = useMutation((_form: any): any => {
        return tokenStaker?.claim();
    });
    const mutationWithdraw = useMutation((_form: any): any => {
        return tokenStaker?.withdraw(_form?.withdrawAmount);
    });
    const mutationEmergencyWithdraw = useMutation((_form: any): any => {
        return tokenStaker?.emergencyWithdraw();
    });
    const handleApprove = () => {
        if (!account) {
            globalDispatch({ type: "setWalletOptions", value: true });
            return;
        }
        if (Number(stakeAmount) === 0) {
            notification.error(`approve value must be greater than 0`);
            mutationApprove.reset();
            return;
        }

        if (!mutationApprove?.isSuccess) {
            mutationApprove.mutate(
                { stakeAmount },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries(`initialData-${id}`);
                        // queryClient.invalidateQueries(`token-balance`);

                        setShowConfirmModal(true);

                        // mutationApprove.reset();
                    },
                },
            );
        }
    };

    const handleStake = () => {
        if (!account) {
            globalDispatch({ type: "setWalletOptions", value: true });
            return;
        }
        if (Number(stakeAmount) === 0) {
            notification.error(`stake value must be greater than 0`);
            mutationStake.reset();
            return;
        }

        if (!mutationStake?.isSuccess) {
            mutationStake.mutate(
                { stakeAmount },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries(`initialData-${id}`);
                        queryClient.invalidateQueries(`token-balance`);

                        setShowConfirmModal(true);
                        // setStakeAmount(0);
                        // mutationStake.reset();
                    },
                },
            );
        }
    };
    const handleClaim = () => {
        if (!account) {
            globalDispatch({ type: "setWalletOptions", value: true });
            return;
        }

        if (!remainLockTime || remainLockTime > new Date().getTime()) {
            notification.error(`You can't claim before lock time`);
            return;
        }

        if (!mutationClaim?.isSuccess) {
            mutationClaim.mutate(
                {},
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries(`initialData-${id}`);
                        queryClient.invalidateQueries(`token-balance`);

                        setShowConfirmModal(true);
                        // mutationStake.reset();
                    },
                },
            );
        }
    };
    const handleWithdraw = () => {
        if (!account) {
            globalDispatch({ type: "setWalletOptions", value: true });
            return;
        }

        if (!remainLockTime || remainLockTime > new Date().getTime()) {
            notification.error(`You can't withdraw before lock time`);
            return;
        }

        if (Number(withdrawAmount) === 0) {
            notification.error(`withdraw value must be greater than 0`);
            mutationWithdraw.reset();
            return;
        }

        if (!mutationWithdraw?.isSuccess) {
            mutationWithdraw.mutate(
                { withdrawAmount },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries(`initialData-${id}`);
                        queryClient.invalidateQueries(`token-balance`);

                        setShowConfirmModal(true);
                        // setWithdrawAmount(0);
                        // mutationStake.reset();
                    },
                },
            );
        }
    };
    const handleEmergencyWithdraw = () => {
        if (!account) {
            globalDispatch({ type: "setWalletOptions", value: true });
            return;
        }

        if (!mutationEmergencyWithdraw?.isSuccess) {
            mutationEmergencyWithdraw.mutate(
                {},
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries(`initialData-${id}`);
                        queryClient.invalidateQueries(`token-balance`);

                        setShowConfirmModal(true);
                        // mutationStake.reset();
                    },
                },
            );
        }
    };

    const handleCloseTxModal = () => {
        setShowConfirmModal(false);

        mutationWithdraw.isSuccess && setWithdrawAmount(0);
        mutationStake.isSuccess && setStakeAmount(0);

        mutationApprove.reset();
        mutationStake.reset();
        mutationClaim.reset();
        mutationWithdraw.reset();
        mutationEmergencyWithdraw.reset();
    };

    const transactionData: any =
        mutationApprove?.data ||
        mutationStake?.data ||
        mutationClaim?.data ||
        mutationWithdraw?.data ||
        mutationEmergencyWithdraw?.data;
    const transactionAddress: string = transactionData?.hash;
    return (
        <>
            <AnimatePresence>
                <motion.div className="claim-details">
                    <div className="row claim-details-main">
                        <div className="col-md-4 col-xs-12 flex-column-align-center">
                            <div className="claim-details-item py-10 height-45">
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
                                        <Currency value={totalValueLock * coinPrice} unit={CurrencyUnit.DOLLAR} />
                                    )}
                                </div>
                            </div>
                            <div className="claim-details-item mt-10  py-10  height-35">
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
                                        <span>
                                            {" "}
                                            {apy} % in {tokenName}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="claim-details-item mt-10  py-10  height-35">
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
                                    ) : account ? (
                                        <TransactionAddress
                                            transactionEndpoint={transactionEndpoint + "address"}
                                            address={tokenContractAddress || "0"}
                                            type="full"
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="claim-details-item mt-10  py-10  height-35">
                                <div className="flex-align-center"> Remain locktime</div>
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
                                        <Timer
                                            epoch={remainLockTime || new Date().getTime()}
                                            size={75}
                                            mode={TimerShowType.COMMA}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12 flex-column-align-center">
                            {/* <div className="flex-align-center ">Add liquidity on PancakeSwap v2</div> */}

                            <div className="flex-align-center mt-50">
                                Rewards: {rewards}{" "}
                                <span style={{ color: "#52C41A" }} className="px-5">
                                    {" "}
                                    {tokenName}
                                </span>
                            </div>

                            <div className="flex-align-center mt-50">
                                <Button
                                    width={ButtonWidth.FIT_PARENT}
                                    onClick={handleClaim}
                                    buttonForm={ButtonForm.SECONDARY}
                                    disabled={mutationClaim.isLoading}
                                >
                                    {mutationClaim.isLoading ? "wait..." : "Claim rewards"}
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-12 flex-column">
                            <div className=" py-10  flex-column">
                                <div
                                    className=""
                                    onClick={() => {
                                        setStakeAmount(balance);
                                    }}
                                    style={{ cursor: "pointer" }}
                                    title="Click to stake max value"
                                >
                                    Your wallet balance: {formatNumberWithCommas(balance)}
                                </div>
                                <div className="flex mt-15">
                                    <Input
                                        className="predictor-pool-details-container-form-predict-price-input"
                                        prefix={""}
                                        value={formatNumberWithCommas(stakeAmount)}
                                        name="stakeAmount"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <div className="flex-align-center  ml-10">
                                        <Button
                                            width={ButtonWidth.FIT_PARENT}
                                            onClick={handleApprove}
                                            buttonForm={ButtonForm.SECONDARY}
                                            disabled={mutationApprove.isLoading}
                                            style={{ width: "100px" }}
                                        >
                                            {mutationApprove.isLoading ? "wait..." : "Approve"}
                                        </Button>
                                        <Button
                                            width={ButtonWidth.FIT_PARENT}
                                            onClick={handleStake}
                                            buttonForm={ButtonForm.SECONDARY}
                                            disabled={mutationStake.isLoading}
                                            className="ml-10"
                                            style={{ width: "100px" }}
                                        >
                                            {mutationStake.isLoading ? "wait..." : "Stake"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-10  flex-column">
                                <div
                                    className=""
                                    onClick={() => {
                                        setWithdrawAmount(stakeAmountNumber);
                                    }}
                                    style={{ cursor: "pointer" }}
                                    title="Click to withdraw max value"
                                >
                                    Your staked balance: {stakeAmountNumber}
                                </div>
                                <div className="flex mt-15">
                                    <Input
                                        className="predictor-pool-details-container-form-predict-price-input"
                                        prefix={""}
                                        value={formatNumberWithCommas(withdrawAmount)}
                                        name="withdrawAmount"
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <div className="flex-align-center ml-10" style={{ width: "120px" }}>
                                        <Button
                                            width={ButtonWidth.FIT_PARENT}
                                            onClick={handleWithdraw}
                                            buttonForm={ButtonForm.SECONDARY}
                                            disabled={mutationWithdraw.isLoading}
                                        >
                                            {mutationWithdraw.isLoading ? "wait..." : "Withdraw"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="py-10  flex-column">
                                <div className="flex ">
                                    <div className="flex ">
                                        <div className="flex-align-center" style={{ width: "204px" }}>
                                            <Button
                                                width={ButtonWidth.FIT_PARENT}
                                                onClick={handleEmergencyWithdraw}
                                                buttonForm={ButtonForm.SECONDARY}
                                                disabled={mutationEmergencyWithdraw.isLoading}
                                            >
                                                {mutationEmergencyWithdraw.isLoading ? "wait..." : "Emergency Withdraw"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {showConfirmModal && (
                <ConfirmModal
                    description={"Your transaction has been confirmed"}
                    iconComponent={<Icon src={success_logo} style={{ width: 135 }} />}
                    minHeight={"0"}
                    open={showConfirmModal}
                    onClose={handleCloseTxModal}
                    confirmTitle={"Close"}
                    cancelTitle={""}
                    onConfirm={handleCloseTxModal}
                    onCancel={handleCloseTxModal}
                    title={undefined}
                >
                    <div className="predictor">
                        <div>
                            <div>
                                <div>View your transaction</div>
                                <div className="predictor-value">
                                    {/* <Currency value={form?.price} unit={CurrencyUnit.USD} color="#ffa005" /> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {transactionAddress && (
                        <span className="predictor-tx mt-15">
                            <TransactionAddress
                                transactionEndpoint={transactionEndpoint + "tx"}
                                address={transactionAddress || "0"}
                                type="full"
                            />
                        </span>
                    )}
                </ConfirmModal>
            )}
        </>
    );
};

export default ClaimDetails;
