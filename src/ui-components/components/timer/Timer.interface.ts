import { TimerElementLabel } from "../timer-element/TimerElement.enum";
import { TimerShowType } from "./Timer.enum";

export interface TimerProps {
    readonly epoch: number;
    readonly description?: string;
    readonly mode?: TimerShowType;
    readonly labels?: TimerElementLabel[];
    readonly hideSeconds?: boolean;
    readonly autoCountdown?: boolean;
    readonly fix?: number;
    readonly size?: number;
    readonly useCharInstead?: string;

    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly fontName?: string;
}
