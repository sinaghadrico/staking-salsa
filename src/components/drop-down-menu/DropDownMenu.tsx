import { useState, FC, useRef, useEffect } from "react";
import "./DropDownMenu.scss";
import { ReactComponent as ExpandLogo } from "assets/icons/svgs/expand.svg";

import { DropDownMenuProps } from "./DropDownMenu.interface";

const DropDownMenu: FC<DropDownMenuProps> = ({ items, value, defaultLabel, ...rest }: DropDownMenuProps) => {
    const [active, setActive] = useState(false);
    const dropdownMenu = useRef<HTMLInputElement>(null);
    const showMenu = (event: any) => {
        event.preventDefault();
        setActive(true);
    };

    const closeMenu = (event: any) => {
        if (!dropdownMenu?.current?.contains(event.target)) {
            setActive(false);
            document.removeEventListener("click", closeMenu);
        }
    };
    useEffect(() => {
        if (active) {
            return document.addEventListener("click", closeMenu);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    const selectedValue = items?.find((i) => i.value === value)?.label;

    return (
        <div className="ui-drop-down-menu" {...rest}>
            <div>
                <div className={`ui-drop-down-menu-toggle ${active ? "active" : ""}`} onClick={showMenu}>
                    <span>{(defaultLabel ? defaultLabel : "") + selectedValue} </span>

                    <span
                        className={"ui-collapse" + (active === true ? " ui-collapse-expand" : " ui-collapse-close")}
                        style={{ marginTop: 5, marginLeft: 5 }}
                    >
                        <ExpandLogo />
                    </span>
                </div>
                {active && (
                    <div ref={dropdownMenu} className="ui-drop-down-menu-list">
                        <ul>
                            {items?.map((item: any, index: any) => (
                                <li key={index}>
                                    {item.link && (
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={item?.link}
                                            aria-label={item?.label}
                                        >
                                            <div className="ui-drop-down-menu-list-label">{item?.label}</div>
                                        </a>
                                    )}
                                    {!item.link && (
                                        <a
                                            rel="noopener noreferrer"
                                            aria-label={item?.label}
                                            onClick={() => {
                                                item.onClick();
                                                setActive(false);
                                                document.removeEventListener("click", closeMenu);
                                            }}
                                        >
                                            <div className="ui-drop-down-menu-list-label">{item?.label}</div>
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropDownMenu;
