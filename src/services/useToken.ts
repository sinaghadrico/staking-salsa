import { parseTokenValue } from "utils/convert";
import { useTokenContract } from "./contracts";

import { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";

export const useToken = () => {
    const TokenContract = useTokenContract();

    const notification = useNotification();

    const getBalance = (account: any) => {
        return TokenContract?.balanceOf(account)
            .then((balance: any) => {
                return parseTokenValue(balance);
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    return {
        getBalance,
        contract: TokenContract || false,
    };
};
