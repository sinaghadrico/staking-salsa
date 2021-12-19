const useTab = (hasBorder?: boolean, selected?: boolean, className?: string) => {
    const buttonClassName = () => {
        const className = selected ? "ui-tabs-tab-button ui-tabs-button-active" : "ui-tabs-tab-button";
        return className;
    };
    const containerClassName = () => {
        const _className = className ? `ui-tabs-tab-container ${className}` : "ui-tabs-tab-container";

        return _className;
    };
    const tabChildrenClassName = () => {
        const className =
            !hasBorder && selected ? "ui-tabs-tab-children with-background-color" : "ui-tabs-tab-children";
        return className;
    };
    const borderBottomClassName = () => {
        if (!hasBorder) {
            return "";
        }
        const className = selected
            ? "ui-tabs-border-bottom ui-tabs-border-bottom-active"
            : "ui-tabs-border-bottom ui-tabs-border-bottom-inactive";
        return className;
    };
    return {
        tabChildrenClassName,
        borderBottomClassName,
        containerClassName,
        buttonClassName,
    };
};
export default useTab;
