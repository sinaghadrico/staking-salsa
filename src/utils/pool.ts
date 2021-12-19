/* eslint-disable @typescript-eslint/no-unused-vars */
import { PredictionPool, Stake, User } from "models";
import { Status } from "models/status";
import { parsePriceValue, parseTokenValue } from "utils/convert";

const labels = [
    { value: 55, title: "Almost Full", className: "almost-full" },
    { value: 75, title: "Ending Soon", className: "ending-soon" },
];

const now = new Date().getTime();

// export function calculateRange(betValue: number): number {
//     if (betValue < 27501) {
//         return Math.round((betValue / 500) * 10);
//     }
//     if (27500 < betValue && betValue < 57501) {
//         return Math.round((27500 / 500) * 10 + (30000 / 500) * 7);
//     }
//     if (57500 < betValue && betValue < 75001) {
//         return Math.round((27500 / 500) * 10 + (30000 / 500) * 7 + ((betValue - 57500) / 500) * 3.75);
//     }
//     if (betValue > 75000) {
//         return Math.round(
//             (27500 / 500) * 10 + (30000 / 500) * 7 + (17500 / 500) * 3.75 + ((betValue - 75000) / 500) * 2,
//         );
//     }
//     return 500;
// }

export function isActivePool(stakingPool: PredictionPool): boolean {
    return !(isLocked(stakingPool) || isMatured(stakingPool));
}
export function isMatured(stakingPool: PredictionPool): boolean {
    return (
        // BigNumber.from(stakingPool?.startDate || stakingPool?.launchDate)
        //     .add(stakingPool.lockTime)
        //     .add(stakingPool.maturityTime)
        //     .mul(1000)
        //     .toNumber() < now ||
        stakingPool?.isMatured
    );
}

export function isLocked(stakingPool: PredictionPool): boolean {
    return (
        // BigNumber.from(stakingPool?.startDate || stakingPool?.launchDate)
        //     .add(stakingPool.lockTime)
        //     .mul(1000)
        //     .toNumber() < now ||
        // 0.95 * Number(stakingPool?.sizeAllocation) - Number(stakingPool?.totalStaked) <= 0 ||
        stakingPool?.isLocked
    );
}

export function isLaunched(stakingPool: PredictionPool): boolean {
    return (
        Number(stakingPool?.launchDate) * 1000 < now &&
        stakingPool?.isStarted &&
        (stakingPool?.isActive ? stakingPool?.isActive : true)
    );
}

export const parsePredictorUser = (user: any): User => {
    if (!user) {
        return {
            stakedBalance: "0",
            claimedWrappedReward: "0",
            pendingWrappedReward: "0",
            claimedTotmReward: "0",
            pendingTotmReward: "0",
            claimedStakingReward: "0",
            pendingStakingReward: "0",
        };
    }
    const {
        claimed_wrapped_reward,
        total_staked,
        pending_wrapped_reward,
        claimed_totm_reward,
        pending_totm_reward,
        claimed_staking_reward,
        pending_staking_reward,
    } = user;
    return {
        stakedBalance: total_staked || 0,
        claimedWrappedReward: claimed_wrapped_reward || 0,
        pendingWrappedReward: pending_wrapped_reward || 0,
        claimedTotmReward: claimed_totm_reward || 0,
        pendingTotmReward: pending_totm_reward || 0,
        claimedStakingReward: claimed_staking_reward || 0,
        pendingStakingReward: pending_staking_reward || 0,
    };
};

//

// Not started yet: the  pool launch is scheduled on off-chain but is not created yet on the blockchain.

// Open: the staking pool lock-date is not reached ( isLocked === false ) and it has also capacity for other stakes, so the only status that users can stake in it.

// In Progress: ( isLocked === true ) &&  ( isMatured === false )

// Closed: the lock time is reached or the pool is filled, so users can not stake it the pool anymore.

// Matured: After maturing-date when the token prize amount is purchased ( isMatured === true ) , the maturing price is get from oracle and the winners are sorted, the pool is matured.

export const getPoolStatus = (pool: any): Status => {
    const lockStatus = isLocked(pool);
    const maturityStatus = isMatured(pool);
    const launchStatus = isLaunched(pool);

    let status: Status = "Open";
    if (!launchStatus) {
        status = "Not started yet";
    }
    if (launchStatus) {
        status = "Open";
    }
    if (lockStatus) {
        status = "In Progress";
    }
    if (maturityStatus) {
        status = "Completed";
    }
    return status;
};

//  User’s Stake

// In Progress: winner not set.

// Claim: After the pool matured, since the users haven’t claim their stakes and also winner set. ( user is winner or loser) , unstake his/her stake  ( call unstake() func ) and if user is winner his/her can call ( purchaseIDOToken() func ) to prize amount will purchased

// Claimed:  ( didUnstake === true) , and if user is winner  (isUSDPaid === true).

export const getStakeStatus = (poolStatus: Status): Status => {
    const status: Status = poolStatus;

    return status;
};

export const parseOffChainPool = (pool: any): any => {
    if (!pool) {
        return {
            title: "TBA",
            maxPerWallet: "TBA",
            idoPrice: "TBA",
            description: "TBA",
            socialLinks: {
                websiteUrl: "",
                whitePaperUrl: "",
                twitterUrl: "",
                telegramUrl: "",
                discordUrl: "",
                mediumUrl: "",
            },
            ranks: [],
            percentages: [],
            initialSupply: "TBA",
            totalSupply: "TBA",
            totalAllocation: "TBA",
            tokenomics: [],
            value: "",
            isLocked: false,
            isMatured: false,
            isStarted: false,
            isActive: false,
            symbol: "",
            lockTime: "0",
            maturityTime: "0",
            launchDate: 0,
            roi: 0,
        } as PredictionPool;
    }

    const {
        title,
        maxPerWallet,
        startPrice,
        description,
        socialLinks,
        initialSupply,
        totalAllocation,
        totalSupply,
        tokenomics,
        teamAndInvestors,
        roadMap,
        logoUrl,
        symbol,
        roi,

        isMatured,
        isLocked,
        isStarted,

        lockTime,
        maturityTime,
        launchDate,
        poolCreatedEvent,
        id,
    } = pool;

    return {
        title,
        maxPerWallet,
        idoPrice: (startPrice || 0).toFixed(2),
        description,
        socialLinks,
        initialSupply,
        totalAllocation,
        totalSupply,
        tokenomics,
        roadMap,
        teamAndInvestors,
        logoUrl,
        symbol,
        roi,

        isMatured,
        isLocked,
        isStarted,

        lockTime,
        maturityTime,
        launchDate,
        id: poolCreatedEvent?.Pool?.toLowerCase(),
        dbId: id,
    };
};

export const parsePredictorOffChainPool = (pool: any): any => {
    if (!pool) return null;
    const {
        id,
        isMatured,
        isLocked,
        isStarted,

        lockTime,
        maturityTime,
        launchDate,
        lockDate,
        maturityDate,
        startDate,
        poolEvent,
        poolCreatedEvent,
    } = pool;

    return {
        title: poolEvent?.title,
        symbol: poolEvent?.symbol,
        logoUrl: poolEvent?.logoUrl,

        prizeAmount: poolEvent?.prizeAmount,
        usdPrizeAmount: poolEvent?.usdPrizeAmount,
        minimumStake: poolEvent?.minimumStake,

        isMatured,
        isLocked,
        isStarted,

        lockTime,
        maturityTime,
        launchDate,
        lockDate,
        maturityDate,
        startDate,

        stakeApr: poolEvent?.stakeApr,
        potentialCollabReward: poolEvent?.potentialCollabReward,
        enhanedReward: poolEvent?.enhanedReward,

        ranks: poolEvent?.rankDistributions,
        percentages: poolEvent?.percentageDistributions,

        sizeAllocation: poolEvent?.sizeAllocation,
        poolType: poolEvent?.poolType,
        id: poolCreatedEvent?.Pool?.toLowerCase(),
        dbId: id,
    };
};
export const parsePredictorPool = (_pool: PredictionPool | null, offchainPool: PredictionPool): PredictionPool => {
    const {
        symbol,

        launchDate,
        lockDate,
        maturityDate,
        sizeAllocation,
        poolType,
        id,
        dbId,
        stakeApr,
        logoUrl,
        prizeAmount,
        usdPrizeAmount,
        potentialCollabReward,
        enhanedReward,
        percentages,
        ranks,
        minimumStake,
    } = offchainPool;
    let pool;

    if (!_pool) {
        pool = {
            totalStaked: 0,
        } as PredictionPool;
    } else {
        pool = { ..._pool };
    }

    const { totalStaked } = pool;

    const status = getPoolStatus(offchainPool);

    const size = Math.floor((Number(parseTokenValue(totalStaked) || 0) / Number(sizeAllocation)) * 100);

    const label =
        status === "Open" ? labels.sort((a, b) => b.value - a.value).find((item) => Number(size) >= item.value) : {};

    return {
        dbId,
        id,
        title: symbol?.split("/")[0]?.toUpperCase(),
        symbol,
        logoUrl,

        pairCoin: { sub: poolType || "", sup: logoUrl || symbol || "" },
        status: status,
        size: size >= 100 ? 100 : size,
        ranks: ranks,
        percentages: percentages,
        sizeAllocation: Number(sizeAllocation),
        totalStaked: Number(parseTokenValue(totalStaked)) || 0,
        launchDate: new Date((launchDate || 0) * 1000).getTime(),
        maturityDate: new Date((maturityDate || 0) * 1000).getTime(),
        lockDate: new Date((lockDate || 0) * 1000).getTime(),
        label: label,

        minimumStake: Number(minimumStake),
        stakeApr,
        potentialCollabReward,
        enhanedReward,
        prizeAmount,
        usdPrizeAmount,
    };
};

export const parseStakePredictorPool = (stake: Stake, offchainPool: PredictionPool): Stake => {
    if (!stake) {
        return {} as Stake;
    }

    const { id, value, pricePrediction } = stake;

    const pool = offchainPool ? parsePredictorPool(null, offchainPool) : ({ id: stake?.pool } as PredictionPool);

    return {
        id,
        idx: stake?.idx,
        pool: pool,
        stake: value ? parseTokenValue(value) : 0,
        pricePrediction: pricePrediction ? parsePriceValue(pricePrediction) : 0,
        finalPrice: "",
        position: "",
    };
};
