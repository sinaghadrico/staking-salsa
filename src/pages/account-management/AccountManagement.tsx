import { FC } from "react";

// import { Helmet } from "react-helmet-async";
import "./AccountManagement.scss";

import { AccountPredictor } from "./account-predictor";

const AccountManagement: FC = () => {
    return (
        <>
            {/* <Helmet>
                <title> Account Management </title>
                <meta name="description" content="Account Management" />
            </Helmet> */}
            <div className="account-management">
                <div className="row  ">
                    <div className="col-md-12 ">
                        <AccountPredictor />
                    </div>
                </div>
            </div>
        </>
    );
};
AccountManagement.defaultProps = {};
export default AccountManagement;
