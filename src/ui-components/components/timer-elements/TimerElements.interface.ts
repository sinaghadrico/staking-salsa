import { TimerElementLabel } from "../timer-element/TimerElement.enum";
import { TimerShowType } from "../timer/Timer.enum";

export interface TimerElementsProps {
    readonly elements: any;
    readonly mode: TimerShowType;
    readonly labels: TimerElementLabel[];
    readonly fix: number;
    readonly visibility: string;
    readonly description?: string;
    readonly size: number;
    readonly useCharInstead?: string;
}
