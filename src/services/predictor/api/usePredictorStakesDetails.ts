/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import { StakingPoolImplementation__factory } from "contracts/types";
import { useRequest } from "hooks";
import useWebWallet from "hooks/use-web-wallet/useWebWallet";
import { StakeData } from "models/stake";
import { useState, useEffect } from "react";
import { predictorPoolAsync } from "services/predictor/contract/predictorPoolAsync";
import { parsePredictorOffChainPool, parsePredictorPool } from "utils/pool";
const usePredictorStakesDetails = (data: any) => {
    const { library, account } = useWebWallet();
    const offchainRequest = useRequest("predictor");

    const [result, setResult] = useState({} as StakeData);

    useEffect(() => {
        data && fetchData();
    }, [data]);

    const sleep = (ms: any) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const setData = (_result: any) => {
        return sleep(1000).then(() => setResult(_result));
    };

    async function fetchData() {
        if (data) {
            setResult(data);
            const signer = library?.getSigner();
            if (signer) {
                for (let stakesPool of data?.stakes) {
                    for (let [stakePoolIndex, stake] of stakesPool?.stakes?.entries()) {
                        const poolAddress = stakesPool?.poolId || "0x00";
                        const contract = StakingPoolImplementation__factory.connect(poolAddress, signer);
                        const service = predictorPoolAsync(contract);
                        const initialData = await service.getInitialData(account, stake?.idx || stakePoolIndex);

                        if (stake?.pool) {
                            stake.pool = { ...stake?.pool, ...initialData };
                        }

                        const result: StakeData = {
                            stakes: data?.stakes,
                            total: data?.total,
                        };
                        await setData(result);
                    }
                }
            }
        }
    }
    async function refetchPoolData(poolId: string) {
        const signer = library?.getSigner();
        if (signer) {
            for (let stakesPool of data?.stakes) {
                for (let [stakePoolIndex, stake] of stakesPool?.stakes?.entries()) {
                    const poolAddress = stakesPool?.poolId || "0x00";
                    if (poolId === poolAddress) {
                        const contract = StakingPoolImplementation__factory.connect(poolAddress, signer);
                        const service = predictorPoolAsync(contract);

                        const initialData = await service.getInitialData(account, stake?.idx || stakePoolIndex);

                        let parsePool;
                        if (stakePoolIndex === 0) {
                            const offchainPoolRequest: any = await offchainRequest.get(
                                `pool/addr/${stakesPool?.poolId}`,
                            );
                            const offchainPool = parsePredictorOffChainPool(offchainPoolRequest?.data);
                            parsePool = offchainPool ? parsePredictorPool(null, offchainPool) : stake?.pool;
                        } else {
                            parsePool = stakesPool?.stakes[0]?.pool;
                        }

                        if (stake?.pool) {
                            stake.pool = { ...parsePool, ...initialData };
                        }

                        const result: StakeData = {
                            stakes: data?.stakes,
                            total: data?.total,
                        };
                        await setData(result);
                    }
                }
            }
        }
    }

    return { data: result, refetchPoolData };
};

export default usePredictorStakesDetails;
