import React from "react";
export interface ProgressProps {
    percent: number;
    label?: React.ReactNode;
    progressColor?: string;
    percentColor?: string;
    style?: object;
    className?: string;
    theme?: string;
}
