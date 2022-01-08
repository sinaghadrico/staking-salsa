import { useWebWallet } from "hooks/use-web-wallet/useWebWallet";
import { useState, useEffect } from "react";
import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import * as ContractETh from "@ethersproject/contracts";

import { contractAddress, networks } from "utils/configs";

export interface ContractName {
    Token: string;
}
export type ContractTypeName = "Token";

export interface ContractChain {
    [chainId: number]: ContractName;
}
export interface ContractNetwork {
    [chainId: number]: string;
}

export const getAddress = (chainId: number, name: ContractTypeName): string | null => {
    if (!chainId) {
        // console.log(`Unsupported chain '${chainId}' for contract ${name}`);
        return null;
    }
    const _contractAddress: ContractChain = contractAddress;
    const contract = _contractAddress[chainId];
    if (!contract) {
        // console.log(`No ${name} deployed at network ${chain.name} (${chainId})`);
        return null;
    }

    const address = name && contract[name];
    // console.log(`${name} resolved to address ${address} at network ${chain.name} (${chainId})`);
    return address;
};

export function useContractByName<C>(
    connector: (address: string, signerOrProvider: Signer | Provider) => C,
    name: ContractTypeName,
): C | undefined {
    const { library, chainId } = useWebWallet();
    // contract is a state variable, because it's async
    const [contract, setContract] = useState<C>();

    // use an effect because it's async
    useEffect(() => {
        if (!library || !chainId) {
            // library or chainId not set, reset to undefined
            setContract(undefined);
            return;
        }
        // use provider signer
        const signer = library?.getSigner();

        // try to resolve address
        const address = getAddress(chainId, name);

        if (address) {
            // call the factory connector
            setContract(connector(address, signer));
        } else {
            setContract(undefined);
        }
    }, [library, chainId, name, connector]);

    return contract;
}

export function useContractFromAddress<C>(
    connector: (address: string, signerOrProvider: Signer | Provider) => C,
    address: string,
): C | undefined {
    const { library, chainId, error, account } = useWebWallet();

    // contract is a state variable, because it's async
    const [contract, setContract] = useState<C>();

    // use an effect because it's async
    useEffect(() => {
        // eslint-disable-next-line no-empty
        if (error) {
        } else {
            if (!address || !library || !chainId || address === "0x00") {
                // library or chainId not set, reset to undefined
                setContract(undefined);
                return;
            } else {
                if (account) {
                    // use provider signer
                    const signer = library.getSigner(account).connectUnchecked();

                    // call the factory connector
                    setContract(connector(address, signer));
                } else {
                    setContract(undefined);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, library, chainId]);

    return contract;
}
export function useContractFromAddressByABI<C>(address: string): C | undefined {
    const { library, chainId, account } = useWebWallet();

    // contract is a state variable, because it's async
    const [contract, setContract] = useState();

    // use an effect because it's async
    useEffect(() => {
        // eslint-disable-next-line no-empty
        if (!library || !chainId) {
            // library or chainId not set, reset to undefined
            setContract(undefined);
            return;
        }

        async function loadContract() {
            const chainName = networks[chainId || 97];

            const networkAbi = await import(`contracts/abi/${chainName}.json`).then((module) => module.default);

            const tokenABI = networkAbi.abi;
            const tokenAddress = address;

            const ContractEThContract = ContractETh.Contract;

            if (library && account) {
                const _contract: any = new ContractEThContract(
                    tokenAddress,
                    tokenABI,
                    library.getSigner(account).connectUnchecked(),
                );

                setContract(_contract);
            } else {
                setContract(undefined);
            }
        }
        loadContract();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, library, chainId]);

    return contract;
}
