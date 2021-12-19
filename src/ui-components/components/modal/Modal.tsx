import React from "react";

import { ModalProps } from "./Modal.interface";
import classnames from "classnames";
import "./Modal.scss";
import { ReactComponent as CloseIcon } from "assets/icons/svgs/close.svg";
import { Loading } from "./../../components/loading";
import useOnClickOutside from "hooks/useOnClickOutside";
import useWindowSize from "hooks/useWindowSize";

const Modal = ({
    open,
    title,
    width,
    isLoading,
    iconLoadingComponent,
    outSideClick,
    onClose,
    style,
    className,
    children,
    minHeight,
    maxHeight,
}: ModalProps) => {
    const ref = React.useRef(null);
    const [show, setShow] = React.useState(open);
    useOnClickOutside(ref, () => {
        if (outSideClick) {
            setShow(false);
            onClose();
        }
        return;
    });

    const window = useWindowSize();

    const calWidth = () => {
        if (window.width < 1000) {
            return "95";
        }
        if (width) {
            return width;
        }
        return "80";
    };
    const _width = calWidth();

    React.useEffect(() => {
        setShow(open);
    }, [open]);
    const handleCloseBtn = () => {
        setShow(false);
        onClose();
    };

    const showHideClassName = show ? "ui-modal-background ui-modal-display" : "ui-modal ui-modal-hide";

    if (!show) return null;
    return (
        <div className={showHideClassName}>
            <div
                ref={ref}
                style={{
                    ...style,
                    width: `${_width}%`,
                }}
                className={classnames(className, "ui-modal-main")}
            >
                {title && (
                    <div className="ui-modal-header">
                        <label>{title}</label>
                        <a>
                            <CloseIcon
                                onClick={handleCloseBtn}
                                fill="#6D7075"
                                style={{ color: "white" }}
                                color={"white"}
                            />
                        </a>
                    </div>
                )}
                <div
                    className="ui-modal-body"
                    style={{
                        maxHeight: maxHeight ? `${maxHeight}px` : "",
                        minHeight: minHeight ? `${minHeight}px` : "",
                    }}
                >
                    {!title && (
                        <div className="ui-modal-header-no-title">
                            <a>
                                <CloseIcon
                                    onClick={handleCloseBtn}
                                    fill="#b6b6b4"
                                    style={{ color: "white" }}
                                    color={"white"}
                                />
                            </a>
                        </div>
                    )}
                    {isLoading ? iconLoadingComponent ? iconLoadingComponent : <Loading /> : children}
                </div>
            </div>
        </div>
    );
};
export default Modal;
