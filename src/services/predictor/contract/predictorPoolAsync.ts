/* eslint-disable @typescript-eslint/no-unused-vars */
import { BigNumber } from "ethers";
import { parsePriceValue, parseTokenValue } from "utils/convert";

export const predictorPoolAsync = (poolAddress: any) => {
    const stakingPool = poolAddress;

    //read contract

    const getMaturingPrice = (): Promise<string> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.maturingPrice()
                .then((value: any) => {
                    resolve(parsePriceValue(value));
                })
                .catch((error: any) => {
                    // notification.error(getErrorMessage(error));
                    resolve("0");
                });
        });
    };
    const getPredictionDetails = (winnerAddress: any, stakeIndex: any): Promise<any> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.predictions(winnerAddress, stakeIndex)
                .then((predictions: any) => {
                    const { rank, didUnstake, stakedBalance, pricePrediction, prizeRewardWithdrawn } = predictions;

                    resolve({
                        position: Number(BigNumber.from(rank).toString()),
                        didUnstake,
                        rank: Number(BigNumber.from(rank).toString()),
                        stakedBalance: parseTokenValue(stakedBalance),
                        pricePrediction: parsePriceValue(pricePrediction),
                        prizeRewardWithdrawn: prizeRewardWithdrawn,
                    });
                })
                .catch((error: any) => {
                    // notification.error(getErrorMessage(error));
                    resolve({
                        position: 0,
                        didUnstake: false,
                        prizeRewardWithdrawn: false,
                        rank: null,
                        stakedBalance: 0,
                        pricePrediction: 0,
                    });
                });
        });
    };

    const getPrizeReward = (winnerAddress: any, stakeIndex: any): Promise<string[] | number[]> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.getIndexedPrize(winnerAddress, stakeIndex)
                .then((_prizeReward: any) => {
                    // first === prizeReward (TotemReward)
                    // second ===  poolPrizeReward
                    const prizeReward = [parseTokenValue(_prizeReward[0]), parseTokenValue(_prizeReward[1])];
                    resolve(prizeReward);
                })
                .catch((error: any) => {
                    // notification.error(getErrorMessage(error));
                    resolve([0, 0]);
                });
        });
    };
    const getTotalPrizeReward = (winnerAddress: any): Promise<string[] | number[]> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.getPrize(winnerAddress)
                .then((_totalPrizeReward: any) => {
                    // first === prizeReward (TotemReward) (Total)
                    // second ===  poolPrizeReward  (Total)

                    const totalPrizeReward = [
                        parseTokenValue(_totalPrizeReward[0]),
                        parseTokenValue(_totalPrizeReward[1]),
                    ];
                    resolve(totalPrizeReward);
                })
                .catch((error: any) => {
                    // notification.error(getErrorMessage(error));
                    resolve([0, 0]);
                });
        });
    };
    const getStakingReward = (winnerAddress: any, stakeIndex: any): Promise<string | number> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.getIndexedStakingReward(winnerAddress, stakeIndex)
                .then((stakingReward: any) => {
                    resolve(parseTokenValue(stakingReward));
                })
                .catch((error: any) => {
                    // notification.error(getErrorMessage(error));
                    resolve(0);
                });
        });
    };
    const getTotalStakingReward = (winnerAddress: any): Promise<string[] | number> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.getStakingReward(winnerAddress)
                .then((stakingReward: any) => {
                    resolve(parseTokenValue(stakingReward));
                })
                .catch((error: any) => {
                    // notification.error(getErrorMessage(error));
                    resolve(0);
                });
        });
    };

    const getInitialData = async (account: any, stakePoolIndex: number): Promise<any> => {
        const finalPrice: any = await getMaturingPrice();
        const prizeReward: any = await getPrizeReward(account, stakePoolIndex);
        const stakingReward: any = await getStakingReward(account, stakePoolIndex);
        const predictionDetails: any = await getPredictionDetails(account, stakePoolIndex);
        return { finalPrice, prizeReward, stakingReward, predictionDetails };
    };

    return {
        getMaturingPrice,
        getPredictionDetails,

        getTotalPrizeReward,
        getPrizeReward,

        getTotalStakingReward,
        getStakingReward,

        getInitialData,
    };
};
