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
                        address: "0xfC0C40272c75A5711ef34DA32C4E156cFBE9892C",
                        asset: "BNB",
                        APY: "0",
                        TVL: "0",
                        earned: "0",
                        status: "Completed",
                    },
                    {
                        id: "2",
                        address: "0xfC0C40272c75A5711ef34DA32C4E156cFBE9892C",
                        asset: "BNB",
                        APY: "0",
                        TVL: "0",
                        earned: "0",
                        status: "",
                    },
                ],
                total: 1,
            };
            return result;
        },
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            refetchInterval: intervalDataUpdate,
        },
    );
};

export default usePredictorStakes;
