import { useQuery } from "react-query";
import { StakeData, Stake } from "models/stake";
import { stakeContracts } from "utils/configs";
import { useWeb3React } from "@web3-react/core";

const usePredictorStakes = (pageNumber: number, perPage = 10) => {
    const { chainId } = useWeb3React();
    return useQuery<StakeData>(
        [`get-predictor-stakes`, pageNumber, perPage],
        async () => {
            const stakes: Stake[] = stakeContracts[chainId as number];
            const result: StakeData = {
                stakes: stakes,
                total: stakes?.length,
            };
            return result;
        },
        {
            enabled: !!chainId,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        },
    );
};

export default usePredictorStakes;
