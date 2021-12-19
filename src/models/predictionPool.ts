import { BigNumberish } from "ethers";
import { Status } from "./status";

export type PoolType = "fox" | "wolf" | "owl" | "featured";
export interface PredictionPoolData {
    pools: PredictionPool[];
    total: number;
    page?: number;
}

export class PredictionPool {
    dbId?: string;
    id?: string;
    title?: string;
    status?: Status;
    size?: number;
    totalAllocation?: string | number = "TBA";
    maxPerWallet?: string = "TBA";
    idoPrice?: string = "TBA";
    roi?: string | number;
    description?: string;
    logoUrl?: string;

    ranks?: number[];
    percentages?: number[];

    usdPrizeAmount?: string;
    roadMap?: any;
    teamAndInvestors?: any;
    socialLinks?: SocialLinks;
    initialSupply?: string;
    totalSupply?: string;
    tokenomics?: Tokenomic[];

    lockTime?: any = "0";
    maturityTime?: any = "0";
    stakeApr?: number;
    potentialCollabReward?: number | string;
    enhanedReward?: any;
    prizeAmount?: number | string | BigNumberish;

    launchDate?: number;
    maturityDate?: number;
    lockDate?: number;
    startDate?: number;

    label?: Label;
    pairCoin?: { sup: string; sub: string };
    poolType?: PoolType;

    isLocked?: any;
    isMatured?: any;
    isStarted?: any;
    isActive?: any;

    symbol?: string;
    poolCreatedEvent?: any;
    poolEvent?: any;
    totalStaked?: any;
    sizeAllocation?: number;

    finalPrice?: any;
    reward?: any;
    prizeReward?: any;
    stakingReward?: any;
    predictionDetails?: any;
    minimumStake?: number;
}
export class SocialLinks {
    websiteUrl?: string;
    whitePaperUrl?: string;
    twitterUrl?: string;
    telegramUrl?: string;
    discordUrl?: string;
    mediumUrl?: string;
}

export class Label {
    className?: string;
    title?: string;
}
export class Tokenomic {
    label?: string;
    value?: string;
    percent?: string;
}
