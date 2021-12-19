import { useWebWallet } from "hooks/use-web-wallet/useWebWallet";
import { useState, useEffect } from "react";
import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import Web3 from "web3";

import { contractAddress, networks } from "utils/configs";

export interface ContractName {
    USDCToken: string;
}
export type ContractTypeName = "USDCToken";

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

export function useContract<C>(
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
    const { library, chainId, error } = useWebWallet();

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
                // use provider signer
                const signer = library.getSigner();

                // call the factory connector
                setContract(connector(address, signer));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, library, chainId]);

    return contract;
}
export function useContractFromAddressByABI<C>(address: string): C | undefined {
    const { library, chainId } = useWebWallet();
    const web3 = new Web3(Web3.givenProvider);

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

            const tokenInst: any = new web3.eth.Contract(tokenABI, tokenAddress);
            setContract(tokenInst.methods);
        }
        loadContract();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, library, chainId]);

    return contract;
}
