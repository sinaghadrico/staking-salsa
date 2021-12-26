import { ReactComponent as ThreeDots } from "assets/icons/svgs/three-dots.svg";
import { FC, useEffect, useRef, useState } from "react";
import { ReactGAM } from "services/google-anlytics";
import { MenuProps } from "./Menu.interface";
import "./Menu.scss";

const Menu: FC<MenuProps> = ({ items, ...rest }: MenuProps) => {
    const [active, setActive] = useState(false);
    const dropdownMenu = useRef<HTMLInputElement>(null);
    const showMenu = (event: any) => {
        event.preventDefault();
        setActive(true);
    };

    useEffect(() => {
        const closeMenu = (event: any) => {
            if (!dropdownMenu?.current?.contains(event.target)) {
                setActive(false);
                document.removeEventListener("click", closeMenu);
            }
        };
        if (active) {
            return document.addEventListener("click", closeMenu);
        }
    }, [active]);

    return (
        <div className="ui-menu" {...rest}>
            <div>
                <div className={`ui-menu-toggle ${active ? "active" : ""}`} onClick={showMenu}>
                    <ThreeDots />
                </div>
                <div ref={dropdownMenu} className={`ui-menu-list ${active ? "ui-menu-expanded" : "ui-menu-collapsed"}`}>
                    <ul>
                        {items?.map((item: any, index: any) => (
                            <li key={index} onClick={() => ReactGAM().trackEvent("click", "menu-list", item?.label)}>
                                <a target="_blank" rel="noopener noreferrer" href={item?.link} aria-label={item?.label}>
                                    <div className="ui-menu-list-label">{item?.label}</div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;
