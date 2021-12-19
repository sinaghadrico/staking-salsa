import account_logo from "assets/icons/svgs/account.svg";
import totem_logo from "assets/icons/svgs/totem.svg";
import { Icon } from "components/icon";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { ReactGAM } from "services/google-anlytics";
import "./Sidebar.scss";

const Sidebar: FC = () => {
    const history = useHistory() as any;
    const pathname = history?.location?.pathname;
    const activeLink = pathname === "/";
    return (
        <div className="sidebar">
            <ul>
                <li onClick={() => ReactGAM().trackPageView("prediction-list-page")}>
                    <Icon src={totem_logo} link="/prediction-list" className={activeLink ? "active" : ""} />
                </li>

                <li onClick={() => ReactGAM().trackPageView("account-management-page")}>
                    <Icon src={account_logo} link="/account-management" />
                </li>

                {/* <li>
                    <Link to="/example">Example </Link>
                </li> */}
            </ul>
        </div>
    );
};
Sidebar.defaultProps = {};
export default Sidebar;
