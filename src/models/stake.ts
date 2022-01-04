export interface StakeData {
    stakes: Stake[];
    total: number;
}
export class Stake {
    id!: string;
    address!: string;
    description!: string;
    logoUrl!: string;
}
