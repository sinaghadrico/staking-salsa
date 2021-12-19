import { formatUnits } from "@ethersproject/units";
import { BigNumber, BigNumberish } from "ethers";

const expToken = BigNumber.from(10).pow(18);
const expPrice = BigNumber.from(10).pow(8);
// const expIdoToken = BigNumber.from(10).pow(6);

const parseTokenValue = (amount: BigNumberish): number => {
    if (amount === "0x00" || amount === 0) {
        return 0;
    } else {
        // return BigNumber.from(amount).div(expToken).toNumber();

        try {
            return setDigit(parseFloat(formatUnits(amount, 16)) / 100);
        } catch (e) {
            return 0;
        }
    }
};
const parseIdoTokenValue = (amount: BigNumberish): number => {
    // return BigNumber.from(amount).div(expIdoToken).toNumber();

    return setDigit(parseFloat(formatUnits(amount, 4)) / 100);
};
const parsePriceValue = (amount: BigNumberish): number => {
    // return BigNumber.from(amount).div(expPrice).toNumber();

    return setDigit(parseFloat(formatUnits(amount, 6)) / 100);
};

const toTokenValue = (amount: string): BigNumberish => {
    const dotIndex = amount?.toString()?.indexOf(".");
    const realDecimal = dotIndex > 0 ? amount?.toString()?.substring(dotIndex + 1).length : 0;

    const amountTemp = ~~(Number(amount) * Math.pow(10, realDecimal));
    return BigNumber.from(10)
        .pow(18 - realDecimal)
        .mul(amountTemp);
};
const toIdoTokenValue = (amount: string): BigNumberish => {
    const dotIndex = amount?.toString()?.indexOf(".");
    const realDecimal = dotIndex > 0 ? amount?.toString()?.substring(dotIndex + 1).length : 0;

    const amountTemp = ~~(Number(amount) * Math.pow(10, realDecimal));
    return BigNumber.from(10)
        .pow(6 - realDecimal)
        .mul(amountTemp);
};
const toPriceValue = (amount: string): BigNumberish => {
    const dotIndex = amount?.toString()?.indexOf(".");
    const realDecimal = dotIndex > 0 ? amount?.toString()?.substring(dotIndex + 1).length : 0;

    const amountTemp = ~~(Number(amount) * Math.pow(10, realDecimal));

    return BigNumber.from(10)
        .pow(8 - realDecimal)
        .mul(amountTemp);
};

const toBTC = (amount: BigNumberish): number => {
    return parseFloat(formatUnits(amount, 6)) / 100;
};
const toTOTM = (amount: BigNumberish): number => {
    return parseFloat(formatUnits(amount, 15)) / 1000;
};

const setDigit = (value: number): number => {
    return Number(
        Number(value).toLocaleString("en", {
            useGrouping: false,
            minimumFractionDigits: 0,
            maximumFractionDigits: Number(value) > 1 ? 2 : 8,
        }),
    );
};
const untilDays = (to_day: Date = new Date()): number => {
    // One day Time in ms (milliseconds)
    const one_day = 1000 * 60 * 60 * 24;

    // To set present_dates to two variables
    const present_date = new Date();

    // To Calculate next year's to_day if passed already.
    if (present_date.getMonth() === 11 && present_date.getDate() > 25) to_day.setFullYear(to_day.getFullYear() + 1);

    // To Calculate the result in milliseconds and then converting into days
    const Result = Math.round(to_day.getTime() - present_date.getTime()) / one_day;

    // To remove the decimals from the (Result) resulting days value
    const Final_Result = Result.toFixed(0);
    return Number(Final_Result);
};
const untilMinutes = (to_day: Date = new Date()): number => {
    // To set present_dates to two variables
    const present_date = new Date();
    const minutes = parseInt("" + ((Math.abs(to_day.getTime() - present_date.getTime()) / (1000 * 60)) % 60));

    return to_day.getTime() >= present_date.getTime() ? minutes : 0;
};
export {
    toTokenValue,
    toPriceValue,
    toIdoTokenValue,
    parseTokenValue,
    parsePriceValue,
    parseIdoTokenValue,
    toBTC,
    toTOTM,
    untilDays,
    untilMinutes,
    expToken,
    expPrice,
    setDigit,
};
