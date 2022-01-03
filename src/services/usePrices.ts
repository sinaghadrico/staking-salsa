import axios from "axios";
import { useQuery } from "react-query";

import { setDigit } from "utils/convert";

const getMarketInformation = (token: string) => {
    const endpoint = `https://api.coingecko.com/api/v3/coins/${token?.toLowerCase()}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    return axios.get(endpoint).then(({ data }) => {
        return {
            price: data?.market_data?.current_price?.usd?.toFixed(4),
        };
    });
};

const usePrices = (coinType?: any) => {
    // const { data: Token } = useQuery("Token", () => getMarketInformation("Token"), {
    //     refetchOnWindowFocus: false,
    // });
    const { data: _coinPrice } = useQuery(coinType, () => getMarketInformation(coinType), {
        refetchOnWindowFocus: false,
        enabled: !!coinType,
    });
    return {
        // tokenPrice: Token?.price ? setDigit(Token?.price) : 0,
        coinPrice: _coinPrice?.price ? setDigit(_coinPrice?.price) : 0,
    };
};

export default usePrices;
