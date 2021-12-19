import axios from "axios";
import { useQuery } from "react-query";

const getChain = (chainId: number) => {
    const endpoint = `https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/chains/eip155-${chainId}.json`;

    return axios.get(endpoint);
};
const useChain = (chainId: number) => {
    const chainData = useQuery(`chain-${chainId}`, () => getChain(chainId));
    return chainData;
};

export default useChain;
