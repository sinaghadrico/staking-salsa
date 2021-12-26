import MobileMenuIcon from "assets/icons/pngs/menu.png";
import { Icon } from "components/icon";
import { Sidebar } from "components/sidebar";
import { useState } from "react";
import "./MobileMenu.scss";

const MobileMenu = () => {
    const [itemVisibility, setItemVisibility] = useState<boolean>(false);

    return (
        <div className="mobile-menu">
            <div onClick={() => setItemVisibility(!itemVisibility)}>
                <Icon alt="mobile-menu" src={MobileMenuIcon} width="24px" height="24px" className="mobile-menu-icon" />
            </div>
            <div
                className={`mobile-menu-backdrop-${itemVisibility ? "visible" : "invisible"}`}
                onClick={() => setItemVisibility(false)}
            ></div>
            <div className={`mobile-menu-container mobile-menu-container-${itemVisibility ? "open" : "close"}`}>
                <div className="mobile-menu-items">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
