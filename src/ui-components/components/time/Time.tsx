import { useRestProps } from "hooks/useRestProps";
import React from "react";
import { TimeProps } from "./Time.interface";
import "./Time.scss";
import { useTime } from "./useTime";

const Time = ({ epoch, ...rest }: TimeProps) => {
    const { applyTo } = useRestProps(rest);
    const { format } = useTime();

    return (
        <div {...applyTo({ className: "ui-time" })} data-epoch={epoch}>
            <time className="ui-time-value">{format(epoch)}</time>
        </div>
    );
};

export default Time;
