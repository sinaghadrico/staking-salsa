/* eslint-disable @typescript-eslint/no-unused-vars */
import { TimerElementLabel } from "../timer-element/TimerElement.enum";
import { TimerElements } from "../timer-elements";
import { useRestProps } from "hooks/useRestProps";
import React, { Fragment, useEffect, useState } from "react";
import { TimerShowType } from "./Timer.enum";
import { TimerProps } from "./Timer.interface";
import "./Timer.scss";
import { useTimer } from "./useTimer";

const Timer = ({
    epoch,
    description,
    mode = TimerShowType.COLON,
    labels = [TimerElementLabel.DAY, TimerElementLabel.HOUR, TimerElementLabel.MINUTE, TimerElementLabel.SECOND],
    hideSeconds = false,
    autoCountdown = true,
    fix = 2,
    useCharInstead,
    size = 200,
    ...rest
}: TimerProps) => {
    const { parseEpoch, getDiff, calculateTimeLeft } = useTimer();
    const { applyTo } = useRestProps(rest);
    const [all] = useState(getDiff(epoch) - 1);
    const [elements, setElements] = useState(parseEpoch(epoch));
    const [passed, setPassed] = useState(0);

    const radial = size / 2;
    const ratio = Math.PI * (radial - 7) * 2;

    if (hideSeconds) {
        labels.splice(
            labels.findIndex((value) => value === TimerElementLabel.SECOND),
            1,
        );
    }
    const allowLoopTimer = (elements: any, timeLeft: any) => {
        if (
            elements.day > 0 ||
            elements.hour > 0 ||
            elements.minute > 0 ||
            elements.second > 0 ||
            timeLeft.day > 0 ||
            timeLeft.hour > 0 ||
            timeLeft.minute > 0 ||
            timeLeft.second > 0
        ) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const timeLeft = calculateTimeLeft(epoch);
            if (allowLoopTimer(elements, timeLeft)) {
                setElements(calculateTimeLeft(epoch));
                setPassed((prev) => prev + 1);
            }
        }, 1000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });
    return (
        <div data-epoch={epoch} {...applyTo({ className: "ui-timer" })}>
            {mode === TimerShowType.CIRCULAR_COLON ? (
                <svg
                    className="ui-timer-circular"
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx={`${radial}`} cy={`${radial}`} r={`${radial}`} fill="transparent" />
                    <circle
                        className="ui-timer-circular-circle"
                        fill="transparent"
                        cx={`${radial}`}
                        cy={`${radial}`}
                        r={`${radial - 7}`}
                        stroke="orange"
                        strokeWidth="7"
                        strokeDasharray={`${(passed / all) * ratio} ${ratio}`}
                    />
                </svg>
            ) : (
                <Fragment />
            )}
            <TimerElements
                elements={elements}
                fix={fix}
                size={size}
                mode={mode}
                visibility={"visible"}
                labels={labels}
                description={description}
                useCharInstead={useCharInstead}
            />
        </div>
    );
};

export default Timer;
