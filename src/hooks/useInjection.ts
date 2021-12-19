const useInjection = () => {
    const injectStyle = (style: any, id: string) => {
        if (document.getElementById(id) !== null) {
            return;
        }

        const styleElement = document.createElement("style");
        styleElement.id = id;

        document.head.appendChild(styleElement);

        if (styleElement.sheet) {
            styleElement.sheet.insertRule(style, styleElement.sheet.cssRules.length);
        }
    };

    return { injectStyle };
};

export { useInjection };
