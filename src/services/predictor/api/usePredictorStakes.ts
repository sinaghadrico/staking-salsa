/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "react-query";
import { StakeData } from "models/stake";
import { intervalDataUpdate } from "utils/configs";

const usePredictorStakes = (pageNumber: number, perPage = 10) => {
    return useQuery<StakeData>(
        [`get-predictor-stakes`, pageNumber, perPage],
        async () => {
            const result: StakeData = {
                stakes: [
                    {
                        id: "1",
                        address: "0x1939b94A77686285e27A50AC330423111D3AcE37",
                        asset: "BTC",
                        APY: "0",
                        TVL: "0",
                        earned: "0",
                        status: "Completed",
                    },
                ],
                total: 1,
            };
            return result;
        },
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            // refetchInterval: intervalDataUpdate,
        },
    );
};

export default usePredictorStakes;
