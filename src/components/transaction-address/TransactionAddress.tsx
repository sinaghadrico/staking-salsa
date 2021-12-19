import { FC } from "react";
import "./TransactionAddress.scss";
import { Icon } from "components/icon";
import open_logo from "assets/icons/svgs/open.svg";
interface TransactionAddressProps {
    address: string;
    transactionEndpoint?: string;
    type?: "full" | "half";
}

const TransactionAddress: FC<TransactionAddressProps> = ({
    address,
    transactionEndpoint,
    type = "half",
}: TransactionAddressProps) => {
    const fullAddress =
        address && address?.length
            ? `${address.substr(0, 5)}...${address.substr(address.length - 4, address.length - 1)}`
            : null;
    return (
        <a
            className="ui-transaction-address"
            href={`${transactionEndpoint}/${address}`}
            target="_blank"
            rel="noreferrer"
            aria-label={"tx-address"}
        >
            <span className="ui-transaction-address-value">
                {type === "half" ? (
                    <span className="ui-transaction-address-value-half">{address}</span>
                ) : (
                    <span className="ui-transaction-address-value-full">{fullAddress}</span>
                )}
                <Icon src={open_logo} />
            </span>
        </a>
    );
};

export default TransactionAddress;
