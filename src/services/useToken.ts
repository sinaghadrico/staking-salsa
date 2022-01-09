import { parseTokenValue } from "utils/convert";
import { useTokenContract } from "./contracts";

import { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";

export const useToken = () => {
    const tokenContract = useTokenContract();

    const notification = useNotification();

    const getBalance = (account: any) => {
        return tokenContract
            ?.balanceOf(account)
            .then((balance: any) => {
                debugger;
                return parseTokenValue(balance);
            })
            .catch((error: any) => {
                return 0;
                notification.error(getErrorMessage(error));
            });
    };

    return {
        getBalance,
        contract: tokenContract || undefined,
    };
};
