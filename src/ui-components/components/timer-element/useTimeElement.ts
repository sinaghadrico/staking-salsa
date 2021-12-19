import { TimerShowType } from "../timer/Timer.enum";
import { TimerElementLabel } from "./TimerElement.enum";

const useTimeElement = () => {
    const fixTimeElementValue = (value: number, fix: number): string => {
        const numberOfDigit = value.toString().length;

        if (numberOfDigit < fix) {
            const zero = Array.from(Array(fix - numberOfDigit)).map(() => "0");
            return `${zero.join("")}${value}`;
        }

        return value.toString();
    };

    const fixTimeElementName = (name: string, mode: TimerShowType): string => {
        if (mode === TimerShowType.COMMA) {
            return name[0];
        }

        switch (name) {
            case TimerElementLabel.DAY:
                return "days";
            case TimerElementLabel.HOUR:
                return "hrs";
            case TimerElementLabel.MINUTE:
                return "mins";
            case TimerElementLabel.SECOND:
                return "secs";
            default:
                return "unknow-timer-label";
        }
    };

    return { fixTimeElementValue, fixTimeElementName };
};

export { useTimeElement };
