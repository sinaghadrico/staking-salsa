import { CurrencyUnit } from "./Currency.enum";

export interface CurrencyProps {
    value: number | string;
    unit: CurrencyUnit | string;
    size?: string;
    color?: string;
    decimal?: number;

    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly fontName?: string;
}
