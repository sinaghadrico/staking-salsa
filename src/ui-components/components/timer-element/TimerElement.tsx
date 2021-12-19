import React, { memo } from "react";
import { TimerElementProps } from "./TimerElement.interface";
import "./TimerElement.scss";
import { useTimeElement } from "./useTimeElement";

const TimerElement = memo(({ name, value, mode, fix, className, useCharInstead }: TimerElementProps) => {
    const { fixTimeElementName, fixTimeElementValue } = useTimeElement();

    return (
        <div className={`ui-timer-element ui-timer-element-${mode}`} key={`ui-timer-${name}`}>
            <span className={className}>{useCharInstead || fixTimeElementValue(value, fix)}</span>
            <b className={className}>{fixTimeElementName(name, mode)}</b>
        </div>
    );
});

export default TimerElement;
