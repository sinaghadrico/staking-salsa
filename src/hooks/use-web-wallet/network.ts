declare const window: any;
export async function switchNetwork(id: any) {
    let networkData;

    switch (id) {
        // BSC Testnet
        case 97:
            networkData = [
                {
                    chainId: "0x61",
                    chainName: "BSC Testnet",
                    rpcUrls: [
                        "https://data-seed-prebsc-2-s1.binance.org:8545/",
                        "https://data-seed-prebsc-2-s2.binance.org:8545/",
                        "https://data-seed-prebsc-1-s2.binance.org:8545/",
                        "https://data-seed-prebsc-1-s1.binance.org:8545",
                        "https://data-seed-prebsc-1-s3.binance.org:8545/",
                        "https://data-seed-prebsc-2-s3.binance.org:8545/",
                    ],
                    nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                    },
                    blockExplorerUrls: ["https://testnet.bscscan.com/"],
                },
            ];

            break;
        // BSC Mainnet
        case 56:
            networkData = [
                {
                    chainId: "0x38",
                    chainName: "Binance Smart Chain",
                    nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                    },
                    rpcUrls: [
                        "https://bsc-dataseed.binance.org/",
                        "https://bsc-dataseed1.defibit.io/",
                        "https://bsc-dataseed1.ninicoin.io/",
                    ],
                    blockExplorerUrls: ["https://bscscan.com/"],
                    iconUrls: ["https://bscscan.com/images/svg/brands/bnb.svg?v=1.3"],
                },
            ];
            break;
        default:
            break;
    }
    if (networkData && window.ethereum) {
        return window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: networkData,
        });
    }
}
