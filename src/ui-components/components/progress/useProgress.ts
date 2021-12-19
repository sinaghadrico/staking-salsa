const useProgress = (
    progressWidth: number,
    percent: number,
    progressColor?: string,
    percentColor?: string,
    theme?: string,
) => {
    const progressStyles = () => {
        const _backgroundColor = progressColor ? progressColor : "#4F545C";
        const styles = {
            backgroundColor: _backgroundColor,
        };
        return styles;
    };

    const percentStyles = () => {
        const ratio = progressWidth / 100;
        const width = percent ? percent * ratio : 0;
        const background = percentColor
            ? percentColor
            : theme === "orange"
            ? "linear-gradient(to left, #FF7B03 0%, #FFA105 100%)"
            : theme === "purple"
            ? "linear-gradient(to left, #811FCC 0%, #864ab4 100%)"
            : "linear-gradient(to left, #FF7B03 0%, #FFA105 100%)";
        const styles = {
            width: `${width}px`,
            background,
        };
        return styles;
    };

    const counterStyles = () => {
        const ratio = progressWidth / 100;
        let width = percent ? percent * ratio : 0;
        width = percent < 95 ? width + 30 : width;

        const styles = {
            width: `${width}px`,
        };
        return styles;
    };
    return { percentStyles, progressStyles, counterStyles };
};
export { useProgress };
