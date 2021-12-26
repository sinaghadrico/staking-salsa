/* eslint-disable @typescript-eslint/no-unused-vars */
import { PairCoinProps } from "./PairCoin.interface";
import "./PairCoin.scss";

import { ReactComponent as AdaLogo } from "assets/icons/coins/ada.svg";
import { ReactComponent as BtcLogo } from "assets/icons/coins/btc.svg";
import { ReactComponent as DotLogo } from "assets/icons/coins/dot.svg";
import { ReactComponent as FoxLogo } from "assets/icons/coins/fox.svg";
import { ReactComponent as LtcLogo } from "assets/icons/coins/ltc.svg";
import { ReactComponent as TotemLogo } from "assets/icons/coins/totem.svg";
import { ReactComponent as WlfLogo } from "assets/icons/coins/wolf.svg";
import { ReactComponent as OwlLogo } from "assets/icons/coins/owl.svg";
import { ReactComponent as WbnbLogo } from "assets/icons/coins/wbnb.svg";
import { ReactComponent as AtlantisLogo } from "assets/icons/coins/atlantis.svg";
import { Icon } from "components/icon";

const getIcon = (coin?: string) => {
    switch (coin?.toLowerCase()) {
        case "ada":
            return AdaLogo;
        case "btc":
            return BtcLogo;
        case "dot":
            return DotLogo;
        case "fox":
            return FoxLogo;
        case "ltc":
            return LtcLogo;
        case "totem":
            return TotemLogo;
        case "wolf":
            return WlfLogo;
        case "owl":
            return OwlLogo;
        case "bnb":
            return WbnbLogo;
        case "featured":
            return AtlantisLogo;
        default:
            return BtcLogo;
    }
};
const PairCoin = ({ supCoin, subCoin, size = 24 }: PairCoinProps) => {
    const SubIcon: any = subCoin?.includes("http") ? null : getIcon(subCoin);

    const SupIcon: any = supCoin?.includes("http") ? null : getIcon(supCoin);
    const cssSize = `${size}px`;
    const translateSup = supCoin && subCoin ? `translate(${-1 * 32}px, -4px)` : `translate(0px)`;
    const translateSub = supCoin && subCoin ? `translate(${24 - 24 / 5}px, 0px)` : `translate(0px)`;

    return (
        <span className="pair-coin">
            {subCoin && subCoin?.includes("http") ? (
                <Icon
                    src={subCoin}
                    style={{
                        width: 24,
                        height: 24,
                        transform: translateSub,
                        marginLeft: "-4px",
                        marginTop: "-4px",
                    }}
                />
            ) : (
                subCoin && <SubIcon style={{ width: 24, height: 24, transform: translateSub }} />
            )}
            {supCoin && supCoin?.includes("http") ? (
                <Icon
                    src={supCoin}
                    style={{
                        width: 24,
                        height: 24,
                        transform: translateSup,
                        marginLeft: "-4px",
                        marginTop: "-4px",
                    }}
                />
            ) : (
                supCoin && <SupIcon style={{ width: 32, height: 32, transform: translateSup }} />
            )}
        </span>
    );
};

export default PairCoin;
