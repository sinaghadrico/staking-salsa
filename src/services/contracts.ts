import { WrappedERC20Token__factory, WrappedERC20Token } from "contracts/types";
import { useContractFromAddress } from "./contract";

export const useUsdContract = (): WrappedERC20Token | undefined => {
    return useContractFromAddress(WrappedERC20Token__factory.connect, "0x3F165995FddA6283F7e0116b589C774ee8EF9499");
};
