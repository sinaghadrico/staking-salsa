import { TimerShowType } from "../timer/Timer.enum";

export interface TimerElementProps {
    readonly name: string;
    readonly value: number;
    readonly mode: TimerShowType;
    readonly fix: number;
    readonly useCharInstead?: string;

    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly fontName?: string;
}
