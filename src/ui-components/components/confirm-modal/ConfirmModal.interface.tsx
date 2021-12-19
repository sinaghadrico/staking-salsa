export interface ConfirmModalProps {
    children?: React.ReactNode;
    open: boolean;
    onClose: () => void;
    iconComponent?: any;
    iconLoadingComponent?: any;
    width?: string;
    description: string;
    confirmTitle: any;
    confirmStyles?: any;
    onConfirm?: () => void;
    onCancel?: () => void;
    cancelTitle: string;
    cancelStyles?: any;
    isLoading?: boolean;
    title?: string;
    theme?: string;
    minHeight?: string;
    maxHeight?: string;
}
