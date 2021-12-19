/* eslint-disable prefer-const */
const validNumberRegex = new RegExp("^[0-9]+$");

const extractNumbers = (str: string): string[] => {
    const string = str + "";
    return string.match(/\d+/g) || [];
};
const parseValueToNumber = (value: string): string => {
    return value?.indexOf(",") >= 0 ? value?.replaceAll(",", "") : value;
};

const formatNumberWithCommas = (_value: any = ""): string => {
    let value = _value?.toString();
    // return value?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    if ([null, undefined].includes(value)) {
        return "";
    }
    if (value?.startsWith(".")) {
        return "0.";
    }

    const [firstPart = "", ...parts] = value.toString().split(".");
    const formatted = firstPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return [formatted, ...(parts || [])].join(".");
};
const isValidNumber = (value: any): boolean => {
    let _value = value.toString();
    _value = _value?.indexOf(",") >= 0 ? _value?.replaceAll(",", "") : _value;
    if (_value === "00") {
        return false;
    }
    _value = _value?.indexOf(".") >= 0 ? _value?.replace(".", "") : _value;

    const dotIndex = value?.toString()?.indexOf(".");
    const realDecimal = dotIndex > 0 ? value?.toString()?.substring(dotIndex + 1).length : 0;

    if (_value === "") {
        return true;
    } else if (realDecimal > 2) {
        return false;
    } else {
        return validNumberRegex.test(_value);
    }
};

export { extractNumbers, parseValueToNumber, formatNumberWithCommas, isValidNumber };
