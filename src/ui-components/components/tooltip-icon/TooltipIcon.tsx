import { useRestProps } from "hooks/useRestProps";
import React from "react";
import { TooltipIconType } from "./TooltipIcon.enum";
import { TooltipIconProps } from "./TooltipIcon.interface";

const TooltipIcon = ({ icon, ...rest }: TooltipIconProps) => {
    const { applyTo } = useRestProps(rest);
    const size = 28;
    const dim = 20;

    return (
        <div {...applyTo({ className: "ui-tooltip-icon" })}>
            <svg
                style={{ verticalAlign: "sub", margin: "0 2px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${size} ${size}`}
                width={`${dim}px`}
                height={`${dim}px`}
            >
                <g id="surface46582689">
                    {icon === TooltipIconType.INFO ? (
                        <path
                            stroke="none"
                            fillRule="nonzero"
                            fill="white"
                            fillOpacity="1"
                            d="M 12 2 C 6.476562 2 2 6.476562 2 12 C 2 17.523438 6.476562 22 12 22 C 17.523438 22 22 17.523438 22 12 C 22 6.476562 17.523438 2 12 2 Z M 13 17 L 11 17 L 11 11 L 13 11 Z M 13 9 L 11 9 L 11 7 L 13 7 Z M 13 9 "
                        />
                    ) : (
                        <path
                            stroke="none"
                            fillRule="nonzero"
                            fill="white"
                            fillOpacity="1"
                            d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm2-13c0 .28-.21.8-.42 1L10 9.58c-.57.58-1 1.6-1 2.42v1h2v-1c0-.29.21-.8.42-1L13 9.42c.57-.58 1-1.6 1-2.42a4 4 0 1 0-8 0h2a2 2 0 1 1 4 0zm-3 8v2h2v-2H9z"
                        />
                    )}
                </g>
            </svg>
        </div>
    );
};

export default TooltipIcon;
