import { WrappedERC20Token__factory, WrappedERC20Token } from "contracts/types";
import { useContractByName } from "./contract";

export const useTokenContract = (): WrappedERC20Token | undefined => {
    return useContractByName(WrappedERC20Token__factory.connect, "Token");
};
