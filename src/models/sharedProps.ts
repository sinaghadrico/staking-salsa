import React from "react";

export interface SharedProps {
    readonly children?: any;
    readonly key?: string | number;
    readonly className?: string;
    readonly style?: React.CSSProperties;
}
