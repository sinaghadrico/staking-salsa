/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContractTransaction } from "ethers";
import useWebWallet, { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";
import { parseTokenValue, toPriceValue, toTokenValue } from "utils/convert";
import { useContractFromAddressByABI } from "services/contract";

export const useLPStaker = (address: string) => {
    const notification = useNotification();
    const contractMethod: any = useContractFromAddressByABI(address);

    //write-contract

    const claim = () => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.claim()
                .call()
                .then((transaction: ContractTransaction) => {
                    debugger;
                    notification.success("claim confirmed");
                    // transaction.wait(1).then(() => {
                    //     notification.success("claim confirmed");
                    //     resolve(transaction);
                    // });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const claimableReward = (UserAddress: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.claimableReward(UserAddress)
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("claimableReward confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const stake = (amount: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.deposit(amount)
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("deposit confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const emergencyWithdraw = () => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.emergencyWithdraw()
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("emergencyWithdraw confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const rechargeReward = (amount: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.rechargeReward(amount)
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("rechargeReward confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const renounceOwnership = () => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.renounceOwnership()
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("renounceOwnership confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const setCalculationFactor = (calculationFactor: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.setCalculationFactor(calculationFactor)
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("setCalculationFactor confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const setPoolRewardTokenCount = (rewardTokenCount: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.setPoolRewardTokenCount(rewardTokenCount)
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("setPoolRewardTokenCount confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const start = () => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.start()
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("start confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const transferOwnership = (UserAddress: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.transferOwnership(UserAddress)
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("transferOwnership confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const withdraw = (amount: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.withdraw(amount)
                .call()
                .then((transaction: ContractTransaction) => {
                    transaction.wait(1).then(() => {
                        notification.success("withdraw confirmed");
                        resolve(transaction);
                    });
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };

    //read contract

    const getCurrenctcalculation = () => {
        return contractMethod
            ?.currenctcalculation()
            .call()
            .then((data: any) => {
                return {
                    duration: data?.duration,
                    durationCount: data?.durationCount,
                    rewardTokenCount: data?.rewardTokenCount,
                    userAddress: data?.userAddress,
                    userReward: data?.userReward,
                };
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getPoolTotalStakeSupply = () => {
        return contractMethod
            ?.getPoolTotalLPSupply()
            .call()
            .then((data: any) => {
                return parseTokenValue(data);
            })
            .catch((error: any) => {
                return 0;
                // notification.error(getErrorMessage(error));
            });
    };
    const getPoolTotalRewardSupply = () => {
        return contractMethod
            ?.getPoolTotalRewardSupply()
            .call()
            .then((data: any) => {
                return data;
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getOwner = () => {
        return contractMethod
            ?.owner()
            .call()
            .then((data: any) => {
                return data;
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getPoolInfo = () => {
        return contractMethod
            ?.poolInfo()
            .call()
            .then((data: any) => {
                return {
                    stakeTokenAddress: data?.lpToken,
                    rewardToken: data?.rewardToken,
                    rewardTokenCount: data?.rewardTokenCount,
                };
            })
            .catch((error: any) => {
                return {
                    stakeTokenAddress: "0x00",
                    rewardToken: 0,
                    rewardTokenCount: 0,
                };
                // notification.error(getErrorMessage(error));
            });
    };
    const getStartTime = () => {
        return contractMethod
            ?.startTime()
            .then((startDate: any) => {
                return new Date(startDate.mul(1000).toNumber());
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };
    const getUserInfo = (UserAddress: string) => {
        return contractMethod
            ?.userInfo(UserAddress)
            .call()
            .then((data: any) => {
                return {
                    stakeAmount: parseTokenValue(data?.amount),
                    rewardDebt: parseTokenValue(data?.rewardDebt),
                    lastWithdraw: parseTokenValue(data?.lastWithdraw),
                };
            })
            .catch((error: any) => {
                return {
                    stakeAmount: 0,
                    rewardDebt: 0,
                    lastWithdraw: 0,
                };
                // notification.error(getErrorMessage(error));
            });
    };
    const getRemainLockTime = () => {
        return contractMethod
            ?.remainLockTime()
            .call()
            .then((data: any) => {
                return new Date().getTime() + (data || 0);
            })
            .catch((error: any) => {
                return new Date().getTime();
                // notification.error(getErrorMessage(error));
            });
    };

    const getInitialData = async (address: string): Promise<any> => {
        const tvlPrice = 1;
        const apyPrice = 1;

        const totalValueLock: any = (await getPoolTotalStakeSupply()) * tvlPrice;

        const poolInfo: any = await getPoolInfo();

        const apy: any = totalValueLock !== 0 ? (poolInfo?.rewardTokenCount * 365 * apyPrice) / totalValueLock : 0;
        const tokenContractAddress: any = poolInfo?.stakeTokenAddress;

        const remainLockTime = 0;

        const userInfo = await getUserInfo(address);

        const rewards: any = userInfo?.rewardDebt;
        const stakeAmount = userInfo?.stakeAmount;

        return { totalValueLock, apy, tokenContractAddress, remainLockTime, rewards, stakeAmount };
    };

    //how to use
    // const { data: startDate, loading } = useQuery("StartDate", () => getStartDate());

    return {
        claim,
        claimableReward,
        stake,
        emergencyWithdraw,
        rechargeReward,
        renounceOwnership,
        setCalculationFactor,
        setPoolRewardTokenCount,
        start,
        transferOwnership,
        withdraw,

        getCurrenctcalculation,
        getPoolTotalStakeSupply,
        getPoolTotalRewardSupply,
        getOwner,
        getPoolInfo,
        getStartTime,
        getUserInfo,

        getInitialData,

        contract: contractMethod || undefined,
    };
};
