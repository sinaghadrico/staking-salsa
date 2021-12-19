/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, ButtonWidth } from "ui-components";
import { useWebWallet } from "hooks/use-web-wallet/useWebWallet";
import { FC, useEffect } from "react";
import { ReactGAM } from "services/google-anlytics";
import { useGlobalDispatch } from "states/globalContext";
import "./ConnectWallet.scss";

export interface ConnectWalletProps {
    children?: React.ReactNode;
    type?: string;
    theme?: string;
}

const ConnectWallet: FC<ConnectWalletProps> = ({ children, type = "button", theme = "orange" }: ConnectWalletProps) => {
    const globalDispatch = useGlobalDispatch();
    const { active } = useWebWallet();

    useEffect(() => {
        !active && type === "popup" && globalDispatch({ type: "setWalletOptions", value: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, type]);

    return !active ? (
        <>
            <div className={"connect-wallet connect-wallet-" + type}>
                {type === "button" && (
                    <Button
                        width={ButtonWidth.FIT_PARENT}
                        onClick={() => {
                            ReactGAM().trackEvent("click", "connect wallet");
                            globalDispatch({ type: "setWalletOptions", value: true });
                        }}
                        theme={theme}
                    >
                        Connect Wallet
                    </Button>
                )}
            </div>
            {type === "popup" && <>{children}</>}
        </>
    ) : (
        <>{children}</>
    );
};
ConnectWallet.defaultProps = {};
export default ConnectWallet;
