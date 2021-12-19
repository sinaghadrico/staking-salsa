const useTimerElements = () => {
    const getStyle = (ref: any, size: number): any => {
        if (ref && ref.current) {
            return {
                fontSize: `${size * 0.18}px`,
                top: `calc(50% - ${ref.current.offsetHeight / 2}px)`,
                left: `calc(50% - ${ref.current.offsetWidth / 2}px)`,
            };
        }
    };

    return { getStyle };
};

export { useTimerElements };
