import { useContractFromAddressByABIToken } from "./contract";
import * as ContractETh from "@ethersproject/contracts";
export const useTokenContract = (): ContractETh.Contract | undefined => {
    return useContractFromAddressByABIToken();
};
