import { parseTokenValue } from "utils/convert";
import { useTSTContract } from "./contracts";

import { getErrorMessage } from "hooks/use-web-wallet/useWebWallet";
import useNotification from "hooks/useNotification";

export const useTSTToken = () => {
    const TSTContract = useTSTContract();

    const notification = useNotification();

    const getBalance = (account: any) => {
        return TSTContract?.balanceOf(account)
            .then((balance: any) => {
                return parseTokenValue(balance);
            })
            .catch((error: any) => {
                notification.error(getErrorMessage(error));
            });
    };

    return {
        getBalance,
        contract: TSTContract || false,
    };
};
