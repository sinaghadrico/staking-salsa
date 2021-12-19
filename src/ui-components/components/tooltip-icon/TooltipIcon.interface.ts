import { TooltipIconType } from "./TooltipIcon.enum";

export interface TooltipIconProps {
    readonly icon: TooltipIconType;

    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly fontName?: string;
}
