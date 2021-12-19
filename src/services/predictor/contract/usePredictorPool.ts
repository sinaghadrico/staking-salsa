import { useStakingPoolImplementationContract, useTotemTokenContract } from "./../../contracts";
import { BigNumber, ContractTransaction } from "ethers";
import useWebWallet, { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";
import { parseTokenValue, toPriceValue, toTokenValue, parsePriceValue } from "utils/convert";

export const usePredictorPool = (poolAddress: string) => {
    const notification = useNotification();
    const { account } = useWebWallet();
    const stakingPool = useStakingPoolImplementationContract(poolAddress);

    const totemToken = useTotemTokenContract();

    //write-contract

    // Business :
    // before calling stake function the user should approve in totem contract
    // that want allow the Staking-pool to withdraw some amount of TOTM from his/her account.
    // if the TOTM amount was under the “tier1” then only first prediction of the user would be stored in the contract
    // and if it was more than “tier1“ then the two predictions would be stored.

    const stake = (data: any) => {
        if (account) {
            const newStake: any = {
                _amount: toTokenValue(data._amount),
                _pricePrediction: toPriceValue(data._pricePrediction),
            };

            return new Promise((resolve: (response: any) => void, reject) => {
                totemToken
                    ?.approve(poolAddress, newStake._amount)
                    .then((transaction: ContractTransaction) => {
                        transaction
                            .wait(1)
                            .then(() => {
                                totemToken
                                    ?.allowance(account, poolAddress)
                                    .then((allowance: any) => {
                                        const _allowance = parseTokenValue(allowance);
                                        const _amount = parseTokenValue(newStake._amount);

                                        if (_allowance >= _amount) {
                                            stakingPool
                                                ?.stake(newStake._amount, newStake._pricePrediction)
                                                .then((transaction: ContractTransaction) => {
                                                    transaction.wait(1).then(() => {
                                                        notification.success("Prediction confirmed");
                                                        resolve(transaction);
                                                    });
                                                })
                                                .catch((error: any) => {
                                                    notification.error(getErrorMessage(error));
                                                    reject(error);
                                                });
                                        } else {
                                            notification.error("allowance != newStake._amount");
                                            reject();
                                        }
                                    })
                                    .catch((error: any) => {
                                        notification.error(getErrorMessage(error));
                                        reject(error);
                                    });
                            })
                            .catch((error: any) => {
                                notification.error(getErrorMessage(error));
                                reject(error);
                            });
                    })
                    .catch((error: any) => {
                        notification.error(getErrorMessage(error));
                        reject(error);
                    });
            });
        }
    };

    // Business :
    // all the stakers will get a staking reward from the contract.
    // if the pool wasn’t matured then users only got their staking return
    // and if the pool was matured they got the their staked amount plus the staking return.
    const claimReward = () => {
        if (account) {
            return new Promise((resolve: (response: any) => void, reject) => {
                stakingPool
                    ?.claimReward()
                    .then((transaction: ContractTransaction) => {
                        transaction
                            .wait(1)
                            .then(() => {
                                notification.success("Your prediction was claimed successfully.");
                                totemToken
                                    ?.balanceOf(account)
                                    .then(() => {
                                        resolve(transaction);
                                    })
                                    .catch((error: any) => {
                                        notification.error(getErrorMessage(error));
                                        reject(error);
                                    });
                            })
                            .catch((error: any) => {
                                notification.error(getErrorMessage(error));
                                reject(error);
                            });
                    })

                    .catch((error: any) => {
                        notification.error(getErrorMessage(error));
                        reject(error);
                    });
            });
        }
    };

    //read contract

    const getStartDate = () => {
        return stakingPool
            ?.startDate()
            .then((startDate: any) => {
                return new Date(startDate.mul(1000).toNumber());
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getMaturityTime = () => {
        return stakingPool
            ?.maturityTime()
            .then((maturityTime: any) => {
                return new Date(maturityTime.mul(1000).toNumber());
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getMaturityDate = () => {
        return stakingPool
            ?.startDate()
            .then((startDate: any) => {
                stakingPool
                    ?.startDate()
                    .then((maturityTime: any) => {
                        stakingPool
                            ?.lockTime()
                            .then((lockTime: any) => {
                                return new Date(startDate.add(lockTime).add(maturityTime).mul(1000).toNumber());
                            })
                            .catch((error: any) => {
                                notification.error(getErrorMessage(error));
                            });
                    })
                    .catch((error: any) => {
                        notification.error(getErrorMessage(error));
                    });
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getLockTime = () => {
        return stakingPool
            ?.lockTime()
            .then((lockTime: any) => {
                return new Date(lockTime.mul(1000).toNumber());
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getLockDate = () => {
        return stakingPool
            ?.startDate()
            .then((startDate: any) => {
                stakingPool
                    ?.startDate()
                    .then((lockTime: any) => {
                        return new Date(startDate.add(lockTime).mul(1000).toNumber());
                    })
                    .catch((error: any) => {
                        notification.error(getErrorMessage(error));
                    });
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getSizeAllocation = () => {
        return stakingPool
            ?.sizeAllocation()
            .then((sizeAllocation: any) => {
                return parseTokenValue(sizeAllocation) * 1.05;
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getTotalStaked = () => {
        return stakingPool
            ?.totalStaked()
            .then((totalStaked: any) => {
                return parseTokenValue(totalStaked);
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getRemainingAmountToStake = () => {
        return stakingPool
            ?.totalStaked()
            .then((totalStaked: BigNumber) => {
                stakingPool
                    ?.sizeAllocation()
                    .then((sizeAllocation: BigNumber) => {
                        const totalStakedInTotem = parseTokenValue(totalStaked);
                        const poolSizeAllocationInTotem = parseTokenValue(sizeAllocation);
                        const poolSizeLowerBandInTotem = poolSizeAllocationInTotem * 0.95;
                        const poolSizeUpperBandInTotem = poolSizeAllocationInTotem * 1.05;

                        const minimumAvailableToSake = (poolSizeLowerBandInTotem - totalStakedInTotem) / 0.97;
                        const maximumAvailableToStake = (poolSizeUpperBandInTotem - totalStakedInTotem) / 0.97;

                        const remainingAmountToStake = Math.floor(
                            (minimumAvailableToSake + maximumAvailableToStake) / 2,
                        );
                        return remainingAmountToStake;
                    })
                    .catch((error: any) => {
                        notification.error(getErrorMessage(error));
                    });
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getMaturingPrice = (): Promise<string> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.maturingPrice()
                .then((value: any) => {
                    resolve(parsePriceValue(value));
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
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
                    notification.error(getErrorMessage(error));
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
    const getReward = (stakeIndex: any): Promise<string[] | number[]> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.getIndexedReward(stakeIndex)
                .then((reward: any) => {
                    // first === stakingReward + prizeReward (TotemReward)
                    // second ===  poolPrizeReward
                    resolve([parseTokenValue(reward[0]), parseTokenValue(reward[1])]);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve([0, 0]);
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
                    notification.error(getErrorMessage(error));
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
                    notification.error(getErrorMessage(error));
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
                    notification.error(getErrorMessage(error));
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
                    notification.error(getErrorMessage(error));
                    resolve(0);
                });
        });
    };

    const getStakedBalance = (stakeIndex: any): Promise<string | number> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.getIndexedStakedBalance(stakeIndex)
                .then((stakedBalance: any) => {
                    resolve(parseTokenValue(stakedBalance));
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve(0);
                });
        });
    };
    const getTotalStakedBalance = (winnerAddress: any): Promise<string[] | number> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.getTotalStakedBalance(winnerAddress)
                .then((stakedBalance: any) => {
                    resolve(parseTokenValue(stakedBalance));
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve(0);
                });
        });
    };
    const getHasUnStaked = (winnerAddress: any, stakeIndex: any): Promise<string[] | number[]> => {
        return new Promise((resolve: (response: any) => void) => {
            stakingPool
                ?.hasUnStaked(winnerAddress, stakeIndex)
                .then((hasUnStaked: any) => {
                    resolve(hasUnStaked);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    resolve(0);
                });
        });
    };
    const getInitialData = async (account: any): Promise<any> => {
        const finalPrice: any = await getMaturingPrice();
        const prizeReward: any = await getTotalPrizeReward(account);
        const stakingReward: any = await getTotalStakingReward(account);
        return { finalPrice, prizeReward, stakingReward };
    };
    //how to use
    // const { data: startDate, loading } = useQuery("StartDate", () => getStartDate());

    return {
        stake,
        claimReward,
        getStartDate,
        getMaturityTime,
        getMaturityDate,
        getLockTime,
        getLockDate,
        getSizeAllocation,
        getTotalStaked,
        getRemainingAmountToStake,
        contract: stakingPool || undefined,
        getMaturingPrice,
        getPredictionDetails,
        getReward,
        getHasUnStaked,
        getPrizeReward,
        getTotalPrizeReward,
        getStakingReward,
        getTotalStakingReward,
        getStakedBalance,
        getTotalStakedBalance,
        getInitialData,
    };
};
