import { FC } from "react";
import { useWebWallet } from "hooks/use-web-wallet/useWebWallet";
import { useGlobalDispatch } from "states/globalContext";
import { Icon } from "components/icon";
import "./AccountDetails.scss";

import { useQuery } from "react-query";
import logo from "assets/icons/svgs/logo.svg";
import { formatNumberWithCommas } from "utils/number";
import { useToken } from "services/useToken";

const AccountDetails: FC = () => {
    const { active, account } = useWebWallet();
    const token = useToken();
    const { data: balance } = useQuery(["token-balance", account], () => token.getBalance(account), {
        enabled: !!token.contract && !!account,
    });

    const globalDispatch = useGlobalDispatch();
    const accountAddress =
        account && account?.length
            ? `${account.substr(0, 5)}...${account.substr(account.length - 4, account.length - 1)}`
            : null;
    return active ? (
        <div className="account-details-wrapper" onClick={() => globalDispatch({ type: "toggleWalletOptions" })}>
            <div className="account-details">
                <div className="account-details-balance">
                    <Icon src={logo} style={{ width: 20 }} /> {formatNumberWithCommas(balance)}
                </div>
            </div>
            <div className="account-details-address">
                {accountAddress} <span></span>
            </div>
        </div>
    ) : null;
};
AccountDetails.defaultProps = {};
export default AccountDetails;
