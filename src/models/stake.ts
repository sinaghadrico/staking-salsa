import { BigNumberish } from "ethers";
import { PredictionPool } from "./predictionPool";

export interface StakeData {
    stakes: any[];
    total: number;
}
export class Stake {
    id!: string;
    idx!: number;
    poolId?: string;
    pool?: PredictionPool;
    stake?: string | number;
    pricePrediction?: string | number;
    pricePrediction1?: string | number;
    pricePrediction2?: string | number;
    finalPrice?: number | string = "---";
    position?: number | string = "---";
    rewards?: number | string = "---";
    priceRewards?: number | string = "---";
    roi?: string | number;
    _amount?: BigNumberish;
    _pricePrediction1?: BigNumberish;
    _pricePrediction2?: BigNumberish;
    value?: string | number;
    poolAddr?: string;
}
