import { useRestProps } from "hooks/useRestProps";

import { CurrencyProps } from "./Currency.interface";
import "./Currency.scss";
import { useCurrency } from "./useCurrency";

const Currency = ({ value, unit, decimal = 0, size = "14px", color = "white", ...rest }: CurrencyProps) => {
    const { applyTo } = useRestProps(rest);
    const { make } = useCurrency();
    const currencyValue = make(value, unit, decimal);

    return (
        <p
            {...applyTo({
                className: "ui-currency",
                style: { fontSize: size, color },
            })}
        >
            <span dangerouslySetInnerHTML={{ __html: currencyValue }} />
        </p>
    );
};

export default Currency;
