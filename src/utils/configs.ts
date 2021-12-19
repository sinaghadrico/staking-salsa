import config from "config/config.json";

const networks: { [x: string]: string } = config.networks;
const rpcUrls = config.rpcUrls;
const subgraph = config.subgraph;
const offchain = config.offchain;
const stats = config.stats;
const contractAddress = config.contractAddress;
const transactionEndpoint = config.transactionEndpoint;
const intervalDataUpdate = 5 * 60 * 1000;

export { networks, rpcUrls, subgraph, offchain, stats, contractAddress, transactionEndpoint, intervalDataUpdate };
