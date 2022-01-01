import { useQuery } from "react-query";
import { StakeData } from "models/stake";

const usePredictorStakes = (pageNumber: number, perPage = 10) => {
    return useQuery<StakeData>(
        [`get-predictor-stakes`, pageNumber, perPage],
        async () => {
            const result: StakeData = {
                stakes: [
                    {
                        id: "1",
                        address: "0x1939b94A77686285e27A50AC330423111D3AcE37",
                        description: "TST 3 Month Lock",
                        asset: "BTC",
                    },
                ],
                total: 1,
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
