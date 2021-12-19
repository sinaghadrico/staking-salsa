import { WrappedERC20Token__factory, WrappedERC20Token } from "contracts/types";
import { useContract } from "./contract";

export const useUsdContract = (): WrappedERC20Token | undefined => {
    return useContract(WrappedERC20Token__factory.connect, "USDCToken");
};
