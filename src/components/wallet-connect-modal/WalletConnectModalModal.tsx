/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Modal } from "ui-components";
import { useGlobalDispatch } from "states/globalContext";
import { WalletConnectModalProps } from "./WalletConnectModal.interface";
import "./WalletConnectModal.scss";

const WalletConnectModal = ({ open }: WalletConnectModalProps) => {
    const dispatch = useGlobalDispatch();

    return (
        <div className="notify-wallet-connect-modal">
            <Modal width="30" maxHeight="100%" open={open} onClose={() => {}} title="Connect wallet to continue">
                <div className="notify-wallet-connect-modal-content">
                    <h2 className="notify-wallet-connect-modal-content-title">
                        In order to see your account details, please connect your wallet first
                    </h2>

                    <div className="notify-wallet-connect-modal-content-actions">
                        <Button
                            onClick={() => {
                                dispatch({ type: "setWalletOptions", value: true });
                            }}
                        >
                            Connect Wallet
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default WalletConnectModal;
