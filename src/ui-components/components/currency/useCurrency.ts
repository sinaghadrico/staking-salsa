import { CurrencyUnit } from "./Currency.enum";

export const useCurrency = () => {
    const determineUnitPosition = (unit: CurrencyUnit | string): string => {
        if (unit === CurrencyUnit.DOLLAR) {
            return "pre";
        }

        return "post";
    };

    const normalizeUnit = (unit: CurrencyUnit | string): string => {
        switch (unit) {
            case CurrencyUnit.DOLLAR:
                return `$`;
            default:
                // add space before unit
                return ` ${unit.toString()}`;
        }
    };

    const format = (value: string | number = 0, decimal = 0): string => {
        const dotIndex = value?.toString()?.indexOf(".");
        const realDecimal = decimal === 0 && dotIndex > 0 ? value.toString().substring(dotIndex + 1).length : decimal;
        const decimalValue = Number(value).toFixed(realDecimal);

        return Number(decimalValue).toLocaleString("en", {
            useGrouping: true,
            minimumFractionDigits: 0,
            maximumFractionDigits: Math.min(realDecimal, 8),
        });
    };

    const grouping = (value: string | number): string => {
        const stringValue = value.toString().replaceAll(",", "");
        const [firstPart = "", ...parts] = stringValue.toString().split(".");
        const formatted = firstPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return [formatted, ...(parts || [])].join(".");
    };

    const make = (value: string | number, unit: CurrencyUnit | string, decimal = 0): string => {
        const formattedValue = format(value, decimal);
        const normalizedUnit = normalizeUnit(unit);
        const unitPosition = determineUnitPosition(unit);

        if (unitPosition === "pre") {
            return `<span class="ui-currency-pre-unit" 
  ">${normalizedUnit}</span><span>${formattedValue}</span>`;
        }

        return `<span>${formattedValue}</span><span class="ui-currency-after-unit" style="
    color: gray;
">${normalizedUnit}</span>`;
    };

    const makeRaw = (value: string | number, unit: CurrencyUnit | string, decimal = 0): string => {
        const formattedValue = format(value, decimal);
        const normalizedUnit = normalizeUnit(unit);
        const unitPosition = determineUnitPosition(unit);

        if (unitPosition === "pre") {
            return `${normalizedUnit}${formattedValue}`;
        }

        return `${formattedValue}${normalizedUnit}`;
    };

    return {
        determineUnitPosition,
        format,
        grouping,
        makeRaw,
        make,
    };
};
