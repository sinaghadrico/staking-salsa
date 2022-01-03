import { useQuery } from "react-query";
import { StakeData, Stake } from "models/stake";
import { stakeContracts } from "utils/configs";

const usePredictorStakes = (pageNumber: number, perPage = 10) => {
    return useQuery<StakeData>(
        [`get-predictor-stakes`, pageNumber, perPage],
        async () => {
            const stakes: Stake[] = stakeContracts;
            const result: StakeData = {
                stakes: stakes,
                total: stakes?.length,
            };
            return result;
        },
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        },
    );
};

export default usePredictorStakes;
