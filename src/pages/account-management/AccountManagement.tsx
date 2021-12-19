import { FC } from "react";
import { ConnectWallet } from "components/header/connect-wallet";
import { Helmet } from "react-helmet-async";
import "./AccountManagement.scss";

import { AccountPredictor } from "./account-predictor";

const AccountManagement: FC = () => {
    return (
        <ConnectWallet type="popup">
            <Helmet>
                <title> Account Management </title>
                <meta name="description" content="Account Management" />
            </Helmet>
            <div className="account-management">
                <div className="row  ">
                    <div className="col-md-12 ">
                        <AccountPredictor />
                    </div>
                </div>
            </div>
        </ConnectWallet>
    );
};
AccountManagement.defaultProps = {};
export default AccountManagement;
