import React from "react";

const useRestProps = (rest: any = {}) => {
    const applyTo = ({ className = "", style = {} as React.CSSProperties }) => {
        const { className: restClassName = "", style: restStyle = {}, fontFamily, ...others } = rest;

        style = { ...style, ...restStyle };

        if (fontFamily) {
            style.fontFamily = fontFamily;
        }

        return {
            style,
            className: `${className} ${restClassName}`.trim(),
            ...others,
        };
    };

    return { applyTo };
};

export { useRestProps };
