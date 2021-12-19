/* eslint-disable react-hooks/exhaustive-deps */
import { TooltipIcon } from "../tooltip-icon";
import { TooltipIconType } from "../tooltip-icon/TooltipIcon.enum";
import { useRestProps } from "hooks/useRestProps";
import React, { useEffect, useRef, useState } from "react";
import { TooltipPosition } from "./Tooltip.enum";
import { TooltipProps } from "./Tooltip.interface";
import "./Tooltip.scss";
import { useTooltip } from "./useTooltip";

const Tooltip = ({
    title,
    description,
    children,
    position = TooltipPosition.UP,
    pointTo = -1,
    offset = 0,
    offsetTop = 0,
    icon = TooltipIconType.QUESTION,
    ...rest
}: TooltipProps) => {
    const { applyTo } = useRestProps(rest);
    const ref = useRef(null);
    const [boxDimension, setBoxDimension] = useState({
        width: 0,
        height: 0,
        initialized: false,
    });
    const { generateStyle } = useTooltip(position, boxDimension, pointTo, offset, offsetTop);

    const initializeBoxDimension = (ref: any) => {
        const { offsetHeight: height, offsetWidth: width } = ref.current;

        setBoxDimension({ height, width, initialized: true });
    };

    useEffect(() => {
        if (ref && ref.current && !boxDimension.initialized) {
            initializeBoxDimension(ref);
        }
    }, [ref, ref.current]);

    return (
        <div {...applyTo({ className: "ui-tooltip" })}>
            <div className="ui-tooltip-children">
                <div ref={ref} className={`ui-tooltip-box ui-tooltip-box-${position}`} style={generateStyle()}>
                    <span className="ui-tooltip-box-title">{title}</span>
                    <span className="ui-tooltip-box-description">{description}</span>
                </div>
                {children || <TooltipIcon icon={icon} />}
            </div>
        </div>
    );
};

export default Tooltip;
