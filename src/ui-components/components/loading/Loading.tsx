/* eslint-disable react-hooks/exhaustive-deps */
import { useRestProps } from "hooks/useRestProps";
import React, { useEffect, useRef, useState } from "react";
import { LoadingProps } from "./Loading.interface";
import "./Loading.scss";
import { useLoading } from "./useLoading";

const Loading = ({ size = 200, thickness = "7px", children, theme = "orange", ...rest }: LoadingProps) => {
    const radial = size / 2;
    const ref = useRef(null);
    const { applyTo } = useRestProps(rest);
    const { calculateStyle } = useLoading(radial);
    const [childrenStyle, setChildrenStyle] = useState({
        visibility: "hidden" as React.CSSProperties,
    });

    useEffect(() => {
        setChildrenStyle(calculateStyle(ref));
    }, [children]);

    return (
        <div {...applyTo({ className: `ui-loading ${theme}-theme` })}>
            <svg className="ui-loading-svg" height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    <radialGradient id="g">
                        <stop
                            stopColor={theme === "orange" ? "#FF6702" : theme === "purple" ? "#811FCC" : "#FF6702"}
                            offset="0.1"
                        />
                        <stop
                            stopColor={theme === "orange" ? "#FFA005" : theme === "purple" ? "#811FCC" : "#FFA005"}
                            offset="0.8"
                        />
                    </radialGradient>
                </defs>

                <circle
                    className="ui-loading-circle-animate"
                    fill="url(#g)"
                    strokeWidth={thickness}
                    stroke={theme === "orange" ? "#ef8913" : theme === "purple" ? "#811FCC" : "#ef8913"}
                    cx={radial}
                    cy={radial}
                    r={0.9 * radial}
                ></circle>
            </svg>
            <div ref={ref} className="ui-loading-children" style={childrenStyle as React.CSSProperties}>
                {children}
            </div>
        </div>
    );
};

export default Loading;
