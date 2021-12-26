import ido_logo from "assets/icons/svgs/spark.svg";
import classnames from "classnames";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./Icon.scss";
interface IconProps {
    src: string;
    alt?: string;
    link?: string;
    target?: string;
    className?: string;
    style?: any;
    width?: string;
    height?: string;
}
const onImageError = (ev: any) => {
    ev.target.src = ido_logo;
};
const Icon: FC<IconProps> = ({
    src,
    alt = "logo",
    link = "",
    target = "",
    className = "",
    style,
    width,
    height,
}: IconProps) => {
    const href = link.startsWith("http") ? link : `/${link}`;

    return link ? (
        target === "_blank" ? (
            <a
                className={classnames("ui-icon", className)}
                href={href}
                target={target}
                aria-label={alt}
                rel="noopener noreferrer"
            >
                <img
                    alt={alt}
                    src={src}
                    style={style}
                    onError={onImageError}
                    width={width ? `${width}px` : undefined}
                    height={height ? `${height}px` : "auto"}
                />
            </a>
        ) : (
            <NavLink
                to={link}
                replace={false}
                className={classnames("ui-icon", className)}
                target={target}
                activeClassName="active"
                aria-label={alt}
                rel="noopener noreferrer"
            >
                <img
                    alt={alt}
                    src={src}
                    style={style}
                    onError={onImageError}
                    width={width ? `${width}px` : undefined}
                    height={height ? `${height}px` : "auto"}
                />
            </NavLink>
        )
    ) : (
        <span className={classnames("ui-icon", className)}>
            <img
                alt={alt}
                src={src}
                style={style}
                onError={onImageError}
                width={width ? `${width}px` : undefined}
                height={height ? `${height}px` : "auto"}
            />
        </span>
    );
};

export default Icon;
