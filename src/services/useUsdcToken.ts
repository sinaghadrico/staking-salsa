import { parseTokenValue } from "utils/convert";
import { useUsdContract } from "./contracts";

import { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";

export const useUsdcToken = () => {
    const usdContract = useUsdContract();

    const notification = useNotification();

    const getBalance = (account: any) => {
        return usdContract
            ?.balanceOf(account)
            .then((balance: any) => {
                return parseTokenValue(balance);
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    return {
        getBalance,
        contract: usdContract || false,
    };
};
