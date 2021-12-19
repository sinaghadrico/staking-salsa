/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ConfirmModal, Currency, CurrencyUnit, Loading } from "ui-components";
import totem_error from "assets/videos/totem_error.gif";
import totem_loading from "assets/videos/totem_loading.gif";
import totem_success from "assets/videos/totem_success.gif";
import { Icon } from "components/icon";
import { TransactionAddress } from "components/transaction-address";
import { Stake } from "models";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ReactGAM } from "services/google-anlytics";
import { usePredictorPool } from "services/predictor/contract/usePredictorPool";
import { transactionEndpoint } from "utils/configs";
import "./PredictorClaimModal.scss";

export interface PredictorClaimModalProps {
    data: Stake;
    allocation: number;
    stakingRewards: number;
    poolPrizeReward: number;
    totmPrize: number;
    refetchPoolData: any;
    onClose: () => void;
}
const PredictorClaimModal: FC<PredictorClaimModalProps> = ({
    data,
    onClose,
    allocation,
    stakingRewards,
    poolPrizeReward,
    totmPrize,
    refetchPoolData,
}: PredictorClaimModalProps) => {
    const queryClient = useQueryClient();

    const predictorPool = usePredictorPool(data?.pool?.id || "0x00");

    const mutationClaim = useMutation((_form: any): any => {
        return predictorPool?.claimReward();
    });
    const transactionData: any = mutationClaim?.data;
    const transactionAddress: string = transactionData?.hash;

    const handleConfirmClaim = () => {
        if (!mutationClaim?.isSuccess) {
            ReactGAM().trackEvent("click", "reward claimed");
            mutationClaim.mutate(
                {},
                {
                    onSuccess: () => {},
                },
            );
        } else {
            if (mutationClaim?.isSuccess) {
                refreshDateAfterSuccess();
            }

            onClose();
        }
    };

    const refreshDateAfterSuccess = () => {
        //update stakes list after call claim
        queryClient.invalidateQueries("predictor-token-balance");
        queryClient.invalidateQueries("get-predictor-user");
        queryClient.invalidateQueries(`token-balance`);

        refetchPoolData(data?.pool?.id);

        queryClient.invalidateQueries(`total-totem-prize-reward-${data?.pool?.id}`);
        queryClient.invalidateQueries(`total-totem-staking-reward-${data?.pool?.id}`);
        onClose();
    };

    return (
        <>
            <div className="predictor-claim-modal">
                <ConfirmModal
                    description={
                        mutationClaim?.isError
                            ? "We weren't able to submit unstake please try again"
                            : mutationClaim?.isSuccess
                            ? "You unstaked your stake and ,collected your rewards."
                            : "Do you want to claim your Allocation ? "
                    }
                    iconComponent={
                        mutationClaim?.isError ? (
                            <Icon src={totem_error} style={{ width: 130 }} />
                        ) : mutationClaim?.isSuccess ? (
                            <Icon src={totem_success} style={{ width: 130 }} />
                        ) : (
                            <></>
                        )
                    }
                    open={true}
                    onClose={() => {
                        if (mutationClaim?.isSuccess) {
                            refreshDateAfterSuccess();
                        }
                        mutationClaim.reset();
                        onClose();
                    }}
                    minHeight={mutationClaim?.isLoading ? "400" : "0"}
                    confirmTitle={mutationClaim?.isError ? "Try again" : mutationClaim?.isSuccess ? "Close" : "Claim"}
                    confirmStyles={!mutationClaim?.isError ? { width: "100%" } : null}
                    cancelTitle={mutationClaim?.isSuccess ? "" : "Cancel"}
                    onConfirm={handleConfirmClaim}
                    onCancel={() => {
                        mutationClaim?.isError ? onClose() : mutationClaim?.isSuccess ? () => {} : onClose();
                    }}
                    isLoading={mutationClaim?.isLoading}
                    iconLoadingComponent={
                        <Loading>
                            <Icon src={totem_loading} style={{ width: 150, height: 150 }} />
                        </Loading>
                    }
                    title={mutationClaim?.isLoading ? "Waiting for confirmation" : undefined}
                >
                    {mutationClaim.isError && <></>}

                    {!mutationClaim?.isLoading && !mutationClaim.isError && (
                        <div className="predictor-claim-modal-details">
                            <div className="predictor-claim-modal-details-item mb-5">
                                <div className="predictor-claim-modal-details-item-label">Allocation</div>
                                <div className="predictor-claim-modal-details-item-value">
                                    <Currency value={allocation || 0} unit={CurrencyUnit.TOTEM} color="#ffa005" />
                                </div>
                            </div>
                            <div className="predictor-claim-modal-details-item mb-15">
                                <div className="predictor-claim-modal-details-item-label">Staking Rewards</div>
                                <div className="predictor-claim-modal-details-item-value">
                                    <Currency value={stakingRewards || 0} unit={CurrencyUnit.TOTEM} color="#ffa005" />
                                </div>
                            </div>
                            <div className="predictor-claim-modal-details-item mb-25 has-border">
                                <div className="predictor-claim-modal-details-item-label">Total</div>
                                <div className="predictor-claim-modal-details-item-value">
                                    <Currency
                                        value={allocation + stakingRewards || 0}
                                        unit={CurrencyUnit.TOTEM}
                                        color="white"
                                    />
                                </div>
                            </div>
                            <div className="predictor-claim-modal-details-item mb-10 has-border">
                                <div className="predictor-claim-modal-details-item-label">Pool Token Reward</div>
                                <div className="predictor-claim-modal-details-item-value">
                                    <Currency
                                        value={poolPrizeReward || 0}
                                        unit={data?.pool?.symbol || ""}
                                        color="white"
                                    />
                                </div>
                            </div>
                            <div className="predictor-claim-modal-details-item has-border">
                                <div className="predictor-claim-modal-details-item-label">TOTM Prize</div>
                                <div className="predictor-claim-modal-details-item-value">
                                    <Currency value={totmPrize || 0} unit={CurrencyUnit.TOTEM} color="white" />
                                </div>
                            </div>
                            {mutationClaim?.isSuccess && (
                                <span className="predictor-claim-modal-details-tx">
                                    <TransactionAddress
                                        transactionEndpoint={transactionEndpoint}
                                        address={transactionAddress || "0"}
                                        type="full"
                                    />
                                </span>
                            )}
                        </div>
                    )}
                </ConfirmModal>
            </div>
        </>
    );
};
PredictorClaimModal.defaultProps = {};
export default PredictorClaimModal;
