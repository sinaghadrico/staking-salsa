import {
    TotemToken__factory,
    TotemToken,
    WrappedERC20Token__factory,
    WrappedERC20Token,
    StakingPoolImplementation__factory,
    StakingPoolImplementation,
} from "contracts/types";
import { useContract, useContractFromAddress } from "./contract";

export const useTotemTokenContract = (): TotemToken | undefined => {
    return useContract(TotemToken__factory.connect, "TotemToken");
};

export const useUsdContract = (): WrappedERC20Token | undefined => {
    return useContract(WrappedERC20Token__factory.connect, "USDCToken");
};

export const useStakingPoolImplementationContract = (poolAddress: string): StakingPoolImplementation | undefined => {
    return useContractFromAddress(StakingPoolImplementation__factory.connect, poolAddress);
};
