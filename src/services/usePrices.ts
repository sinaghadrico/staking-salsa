import axios from "axios";
import { useQuery } from "react-query";
import { offchain } from "utils/configs";
import { setDigit } from "utils/convert";

const getMarketInformation = (token: string) => {
    // const endpoint = `https://api.coingecko.com/api/v3/coins/${token}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    const endpoint = offchain.predictor + "price/" + token;
    return axios.get(endpoint).then(({ data }) => {
        return {
            price: data?.price,
        };
    });
};

// const getOffchainInformation = (token: string) => {
//     const endpoint = offchain.predictor + token;
//     return axios.get(endpoint).then(({ data }) => {
//         return {
//             price: data?.data?.TOTM?.quote?.USD?.price.toFixed(4),
//             marketCap: data?.data?.TOTM?.quote?.USD?.market_cap,
//             circulatingSupply: Math.round(data?.data?.TOTM?.circulating_supply),
//         };
//     });
// };

const usePrices = (coinType?: any) => {
    const { data: totm } = useQuery("TOTM", () => getMarketInformation("TOTM"), {
        refetchOnWindowFocus: false,
    });
    const { data: _coinPrice } = useQuery(coinType, () => getMarketInformation(coinType), {
        refetchOnWindowFocus: false,
        enabled: !!coinType,
    });
    return {
        totmPrice: totm?.price ? setDigit(totm?.price) : 0,
        coinPrice: _coinPrice?.price ? setDigit(_coinPrice?.price) : 0,
    };
};

export default usePrices;
