/* eslint-disable @typescript-eslint/no-unused-vars */
import TimerElement from "../timer-element/TimerElement";
import { TimerElementLabel } from "../timer-element/TimerElement.enum";
import React, { memo, useRef } from "react";
import { TimerElementsProps } from "./TimerElements.interface";
import "./TimerElements.scss";
import { useTimerElements } from "./useTimerElements";

const TimerElements = memo(
    ({ elements, labels, mode, fix, size, visibility, description, useCharInstead }: TimerElementsProps) => {
        const ref = useRef(null);
        const { getStyle } = useTimerElements();

        return (
            <div
                ref={ref}
                className={`ui-timer-elements ui-timer-elements-${mode}`}
                style={{ ...getStyle(ref, size), visibility }}
            >
                {Object.keys(elements)
                    .filter((item: any) => labels?.includes(item))
                    .map((elementName: string, index: number, array) => (
                        <TimerElement
                            key={`timer-element-key-${index}`}
                            name={elementName}
                            value={elements[elementName]}
                            fix={fix}
                            mode={mode}
                            useCharInstead={useCharInstead}
                            className={index === array.length - 1 ? "" : "ui-timer-after-symbol"}
                        />
                    ))}
                <p className="ui-timer-description">{description}</p>
            </div>
        );
    },
);

export default TimerElements;
