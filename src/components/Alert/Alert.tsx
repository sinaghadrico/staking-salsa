import { useEffect } from "react";
import classnames from "classnames";
import "./Alert.scss";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
    key: string | number;
    title?: string;
    closeText?: string;
    onClose?: () => void;
    className?: string;
    closable?: boolean;
    message?: string;
    showIcon?: boolean;
    icon?: string;
    type?: AlertType;
}
const Alert = ({ title, closeText, onClose, closable, message, showIcon, icon, type = "success" }: AlertProps) => {
    const isClosable = closeText ? true : closable;
    const isShowIcon = icon ? true : showIcon;
    const icons: any = {
        success: {
            iconType: "icon-info",
        },
        error: {
            iconType: "icon-info",
        },
        warning: {
            iconType: "icon-info",
        },
        info: {
            iconType: "icon-info",
        },
    };
    const getIcon = () => {
        if (icon) return icon;
        else {
            return icons[type].iconType;
        }
    };

    const handleClose = () => {
        onClose && onClose();
    };

    useEffect(() => {
        setTimeout(() => {
            closable && onClose && onClose();
        }, 5000);
    }, [closable, onClose]);

    return (
        <>
            <div className={`ui-alert ui-alert-${type}`}>
                {isShowIcon && <i className={classnames("ui-alert-icon", getIcon())} />}
                {title && <span className="ui-alert-title">{title}</span>}
                {message && (
                    <div
                        className="ui-alert-description"
                        dangerouslySetInnerHTML={{
                            __html: message,
                        }}
                    ></div>
                )}
                {isClosable && (
                    <span role="button" className="ui-alert-close-icon" onClick={handleClose}>
                        <i className="icon-cancel color-gray" />
                    </span>
                )}
            </div>
        </>
    );
};

export default Alert;
