import { HTMLAttributes } from "react";

export interface LoadingProps extends Pick<HTMLAttributes<any>, "children"> {
    readonly size?: number;
    readonly thickness?: string;

    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly fontName?: string;
    theme?: string;
}
