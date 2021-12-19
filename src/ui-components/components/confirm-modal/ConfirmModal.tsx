import React from "react";
import { Loading } from "../loading";
import { Modal } from "../modal";
import { ConfirmModalProps } from "./ConfirmModal.interface";
import { Button, ButtonForm, ButtonWidth } from "../button";

import "./ConfirmModal.scss";

const ConfirmModal = ({
    open,
    onClose,
    iconComponent,
    iconLoadingComponent,
    children,
    description,
    width,
    confirmTitle,
    confirmStyles,
    cancelTitle,
    cancelStyles,
    title,
    onConfirm,
    onCancel,
    isLoading,
    minHeight,
    maxHeight,
    theme = "orange",
}: ConfirmModalProps) => {
    return (
        <Modal
            width={width}
            open={open}
            onClose={onClose}
            isLoading={isLoading}
            iconLoadingComponent={iconLoadingComponent}
            title={title}
            maxHeight={maxHeight}
            minHeight={minHeight}
            className={`ui-confirm-modal ${theme}-theme`}
        >
            {!isLoading ? (
                <React.Fragment>
                    {iconComponent && <div className="ui-confirm-modal-icon">{iconComponent}</div>}
                    <div className="ui-confirm-modal-description">{description}</div>
                    {children}
                    <div className="ui-confirm-modal-footer">
                        {cancelTitle && cancelTitle !== "" && (
                            <Button
                                onClick={onCancel}
                                buttonForm={ButtonForm.SECONDARY}
                                width={ButtonWidth.FIT_PARENT}
                                style={cancelStyles}
                            >
                                {cancelTitle}
                            </Button>
                        )}

                        {confirmTitle && confirmTitle !== "" && (
                            <Button
                                onClick={onConfirm}
                                width={ButtonWidth.FIT_PARENT}
                                style={confirmStyles}
                                theme={theme}
                            >
                                {confirmTitle}
                            </Button>
                        )}
                    </div>
                </React.Fragment>
            ) : (
                <div className="ui-confirm-modal-loading">
                    {iconLoadingComponent ? iconLoadingComponent : <Loading />}
                </div>
            )}
        </Modal>
    );
};
export default ConfirmModal;
