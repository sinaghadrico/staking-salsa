export interface ModalProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    className?: string;
    style?: any;
    title?: string;
    outSideClick?: boolean;
    isLoading?: boolean;
    iconLoadingComponent?: any;
    width?: string;
    maxHeight?: string;
    minHeight?: string;
}
