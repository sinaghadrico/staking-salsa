import { WrappedERC20Token } from "contracts/types";
import { useContractFromAddressByABIToken } from "./contract";

export const useTokenContract = (): WrappedERC20Token | undefined => {
    return useContractFromAddressByABIToken();
};
