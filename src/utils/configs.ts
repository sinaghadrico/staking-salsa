import config from "config/config.json";
import { Stake } from "models";

const networks: { [x: string]: string } = config.networks;
const rpcUrls = config.rpcUrls;
const subgraph = config.subgraph;
const offchain = config.offchain;
const stats = config.stats;
const contractAddress = config.contractAddress;
const transactionEndpoint = config.transactionEndpoint;
const intervalDataUpdate = 2 * 60 * 1000;
const stakeContracts: { [x: string]: Stake[] } = config.stakeContracts;
const tokenName = config.tokenName;

export {
    networks,
    rpcUrls,
    subgraph,
    offchain,
    stats,
    contractAddress,
    transactionEndpoint,
    intervalDataUpdate,
    stakeContracts,
    tokenName,
};
