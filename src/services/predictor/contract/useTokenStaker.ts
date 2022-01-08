/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContractTransaction } from "ethers";
import useWebWallet, { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";
import { parseTokenValue, setDigit, toPriceValue, toTokenValue } from "utils/convert";
import { useContractFromAddressByABI } from "services/contract";
import { useTokenContract } from "services/contracts";

export const useTokenStaker = (address: string) => {
    const { account } = useWebWallet();
    const notification = useNotification();
    const contractMethod: any = useContractFromAddressByABI(address);
    const tokenContract = useTokenContract();

    //write-contract

    const claim = () => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.claim()

                .then((transaction: ContractTransaction) => {
                    notification.success("claim confirmed");
                    resolve(transaction);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };

    const stake = (amount: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            tokenContract
                ?.allowance(account || "0x00", address)
                .then((allowance: any) => {
                    const _allowance = parseTokenValue(allowance);
                    const _amount = parseTokenValue(toTokenValue(amount));
                    debugger;
                    if (_allowance >= _amount) {
                        debugger;
                        contractMethod
                            ?.deposit(toTokenValue(amount))

                            .then((transactionDeposit: ContractTransaction) => {
                                notification.success("stake confirmed");
                                debugger;
                                resolve(transactionDeposit);
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
        });
    };
    const approve = (amount: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            tokenContract
                ?.approve(address, toTokenValue(amount))
                .then((transaction: any) => {
                    debugger;
                    transaction
                        .wait(1)
                        .then(() => {
                            debugger;
                            notification.success("Approve confirmed");
                            resolve(transaction);
                        })
                        .catch((error: any) => {
                            notification.error(getErrorMessage(error));
                            reject(error);
                        });
                })
                .catch((error: any) => {
                    debugger;
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };

    const emergencyWithdraw = () => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.emergencyWithdraw()

                .then((transaction: ContractTransaction) => {
                    notification.success("emergencyWithdraw confirmed");
                    resolve(transaction);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const releaseReward = (amount: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.releaseReward(toTokenValue(amount))

                .then((transaction: ContractTransaction) => {
                    notification.success("releaseReward confirmed");
                    resolve(transaction);
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

                .then((transaction: ContractTransaction) => {
                    notification.success("renounceOwnership confirmed");
                    resolve(transaction);
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

                .then((transaction: ContractTransaction) => {
                    notification.success("setCalculationFactor confirmed");
                    resolve(transaction);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };
    const setPoolUnusedRewardAddress = (rewardAddress: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.setpoolUnusedRewardAddress(rewardAddress)

                .then((transaction: ContractTransaction) => {
                    notification.success("setpoolUnusedRewardAddress confirmed");
                    resolve(transaction);
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

                .then((transaction: ContractTransaction) => {
                    notification.success("setPoolRewardTokenCount confirmed");
                    resolve(transaction);
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
    const transferOwnership = (userAddress: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.transferOwnership(userAddress)

                .then((transaction: ContractTransaction) => {
                    notification.success("transferOwnership confirmed");
                    resolve(transaction);
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
                ?.withdraw(toTokenValue(amount))

                .then((transaction: ContractTransaction) => {
                    notification.success("withdraw confirmed");
                    resolve(transaction);
                })
                .catch((error: any) => {
                    notification.error(getErrorMessage(error));
                    reject(error);
                });
        });
    };

    //read contract

    const claimableReward = (UserAddress: string, time: string) => {
        return new Promise((resolve: (response: any) => void, reject) => {
            contractMethod
                ?.claimableReward(UserAddress, time)

                .then((data: any) => {
                    resolve(parseTokenValue(data));
                })
                .catch((error: any) => {
                    resolve(0);
                });
        });
    };

    const getCalculationFactor = () => {
        return contractMethod
            ?.getCalculationFactor()

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
    const getPoolTotalLostRewardAmount = () => {
        return contractMethod
            ?.getPoolTotalLostRewardAmount()

            .then((data: any) => {
                return parseTokenValue(data);
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
                return 0;
                // notification.error(getErrorMessage(error));
            });
    };
    const getPoolUnusedRewardAddress = () => {
        return contractMethod
            ?.getpoolUnusedRewardAddress()

            .then((data: any) => {
                return data;
            })
            .catch((error: any) => {
                return 0;
                // notification.error(getErrorMessage(error));
            });
    };
    const getPeriodRewardTokenCount = () => {
        return contractMethod
            ?.getPeriodRewardTokenCount()

            .then((data: any) => {
                return parseTokenValue(data);
            })
            .catch((error: any) => {
                return 0;
                // notification.error(getErrorMessage(error));
            });
    };
    const getPoolTotalStakedSupply = () => {
        return contractMethod
            ?.getPoolTotalStakedSupply()

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

            .then((data: any) => {
                return data;
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    const getLockPeriod = () => {
        return contractMethod
            ?.lockPeriod()

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

            .then((data: any) => {
                return {
                    stakeTokenAddress: data?.stakeToken,
                    rewardToken: parseTokenValue(data?.periodRewardTokenCount),
                    rewardTokenCount: parseTokenValue(data?.periodRewardTokenCount),
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
    const getRemainLockTime = (userAddress: string) => {
        return contractMethod
            ?.remainLockTime(userAddress)

            .then((data: any) => {
                const _remainLockTime = new Date().getTime() + Number(data || 0) * 1000;

                return _remainLockTime;
            })
            .catch((error: any) => {
                return new Date().getTime();
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

            .then((data: any) => {
                return {
                    stakeAmount: parseTokenValue(data?.amount),
                    rewardEarned: parseTokenValue(data?.rewardEarned),
                    depositTime: data?.depositTime,
                    lastWithdraw: parseTokenValue(data?.lastWithdraw),
                };
            })
            .catch((error: any) => {
                return {
                    stakeAmount: 0,
                    rewardEarned: 0,
                    lastWithdraw: 0,
                };
                // notification.error(getErrorMessage(error));
            });
    };

    const getInitialData = async (userAddress: string): Promise<any> => {
        const tvlPrice = 1;
        const apyPrice = 1;

        const totalValueLock: any = setDigit((await getPoolTotalStakedSupply()) * tvlPrice);

        const poolInfo: any = await getPoolInfo();

        const apy: any = setDigit(
            totalValueLock !== 0 ? (poolInfo?.rewardTokenCount * 60 * 24 * 365 * 100 * apyPrice) / totalValueLock : 0,
        );
        const tokenContractAddress: any = poolInfo?.stakeTokenAddress;
        const remainLockTime = await getRemainLockTime(userAddress);

        const userInfo = await getUserInfo(userAddress);

        const _claimableReward = await claimableReward(userAddress, "0");
        const rewards: any = setDigit(userInfo?.rewardEarned + _claimableReward);
        const stakeAmount = setDigit(userInfo?.stakeAmount);

        return { totalValueLock, apy, tokenContractAddress, remainLockTime, rewards, stakeAmount };
    };

    //how to use
    // const { data: startDate, loading } = useQuery("StartDate", () => getStartDate());

    return {
        claim,
        claimableReward,
        getPoolTotalLostRewardAmount,

        getLockPeriod,
        getPeriodRewardTokenCount,
        stake,
        approve,
        emergencyWithdraw,
        releaseReward,
        renounceOwnership,
        setCalculationFactor,
        setPoolUnusedRewardAddress,
        getPoolUnusedRewardAddress,

        setPoolRewardTokenCount,
        start,
        transferOwnership,
        withdraw,

        getCalculationFactor,
        getPoolTotalStakedSupply,
        getPoolTotalRewardSupply,
        getOwner,
        getPoolInfo,
        getRemainLockTime,
        getStartTime,
        getUserInfo,

        getInitialData,

        contract: contractMethod || undefined,
    };
};
