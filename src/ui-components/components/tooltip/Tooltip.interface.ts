import { TooltipIconType } from "../tooltip-icon/TooltipIcon.enum";
import { HTMLAttributes } from "react";
import { TooltipPosition } from "./Tooltip.enum";

export interface TooltipProps extends Pick<HTMLAttributes<any>, "children"> {
    readonly title?: string;
    readonly description: string;
    readonly position?: TooltipPosition;
    readonly pointTo?: number;
    readonly offset?: number;
    readonly offsetTop?: number;
    readonly icon?: TooltipIconType;

    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly fontName?: string;
}
