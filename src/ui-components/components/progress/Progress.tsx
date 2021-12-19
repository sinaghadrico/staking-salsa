import React from "react";
import { ProgressProps } from "./Progress.interface";
import { useProgress } from "./useProgress";
import classnames from "classnames";
import "./Progress.scss";
import useElementSize from "hooks/useElementSize";

const Progress = ({
    percent,
    label,
    progressColor,
    percentColor,
    style,
    className,
    theme = "orange",
}: ProgressProps) => {
    const progressBarRef = React.useRef(null);

    const { width } = useElementSize(progressBarRef);
    const { percentStyles, progressStyles, counterStyles } = useProgress(
        width,
        percent,
        progressColor,
        percentColor,
        theme,
    );
    const _percentStyles = percentStyles();
    const _progressStyles = progressStyles();
    const _counterStyles = counterStyles();
    return (
        <div style={style} className={classnames(className, "ui-progress-bar")}>
            {!label && (
                <div style={_counterStyles} className="ui-progress-bar-value">
                    {percent}
                    <span>&#37;</span>
                </div>
            )}
            <div ref={progressBarRef} className="ui-progress-bar-container" style={_progressStyles}>
                <div className="ui-progress-bar-container-size" style={_percentStyles}></div>
            </div>
            {label && <div className="ui-progress-bar-label">{label}</div>}
        </div>
    );
};

export default Progress;
