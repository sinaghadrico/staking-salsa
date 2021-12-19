import { useTotemTokenContract } from "./contracts";

import { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";
import { parseTokenValue } from "utils/convert";

export const useTotemToken = () => {
    const totemToken = useTotemTokenContract();

    const notification = useNotification();

    const getBalance = (account: any) => {
        return totemToken
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
        contract: totemToken || false,
    };
};
