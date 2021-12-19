import { TooltipPosition } from "./Tooltip.enum";

const useTooltip = (position: TooltipPosition, boxDimension: any, pointTo = -1, offset = 0, offsetTop = 0) => {
    const generateStyle = () => {
        const dangleSize = 10;
        const upDownGap = 10;
        const leftRightGap = 15;

        const isSide = ![TooltipPosition.DOWN, TooltipPosition.UP].includes(position);
        const extraSpace = isSide ? dangleSize + leftRightGap : dangleSize + upDownGap;

        const style = {
            [position]: `-${
                extraSpace + (isSide ? 0 : offsetTop) + (isSide ? boxDimension.width : boxDimension.height)
            }px`,
        };

        if (!isSide) {
            const percent = pointTo >= 0 && pointTo <= 100 ? pointTo : 50;

            style.left = `calc(${percent}% - ${boxDimension.width / 2}px + ${offset}px)`;
        }

        return style;
    };

    return { generateStyle };
};

export { useTooltip };
