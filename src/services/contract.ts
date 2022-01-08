/* eslint-disable react-hooks/exhaustive-deps */
import { useWebWallet } from "hooks/use-web-wallet/useWebWallet";
import { useMemo } from "react";

import { Contract } from "@ethersproject/contracts";

import { contractAddress } from "utils/configs";

import NetworkAbi from "contracts/abi/bsc.json";

export function useContractFromAddressByABI(address: string): Contract | undefined {
    const { library, account } = useWebWallet();

    const networkAbi = NetworkAbi;

    const tokenABI = networkAbi.abi;
    const tokenAddress = address;

    return useMemo(
        () =>
            library
                ? new Contract(
                      tokenAddress,
                      tokenABI,
                      account ? library.getSigner(account).connectUnchecked() : library,
                  )
                : undefined,
        [library, account],
    );
}
export function useContractFromAddressByABIToken(): Contract | undefined {
    const { library, chainId, account, active } = useWebWallet();

    const networkAbi = NetworkAbi;

    const tokenABI = networkAbi.tokenAbi;
    const tokenAddress = contractAddress[chainId || 97]?.Token;

    return useMemo(
        () =>
            library && active
                ? new Contract(
                      tokenAddress,
                      tokenABI,
                      account ? library.getSigner(account).connectUnchecked() : library,
                  )
                : undefined,
        [library, account],
    );
}
