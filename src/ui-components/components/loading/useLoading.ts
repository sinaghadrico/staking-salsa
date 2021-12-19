/* eslint-disable react-hooks/rules-of-hooks */
import { useInjection } from "hooks/useInjection";

const { injectStyle } = useInjection();

const useLoading = (radial: number) => {
    const calculateStyle = (ref: any) => {
        return {
            visibility: "visible" as React.CSSProperties,
            top: `calc(50% - ${ref?.current?.offsetHeight / 2}px)`,
            left: `calc(50% - ${ref?.current?.offsetWidth / 2}px)`,
        };
    };

    const addAnimationToDOM = () => {
        const ratio = Math.PI * radial;
        const spinnerAnimation = `
      @keyframes spinner-animation {
        100% {
          stroke-dasharray: ${0.8 * radial} ${1.5 * ratio};
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: ${0.9 * ratio};
          stroke-dashoffset: ${0.9 * ratio};
        }
        0% {
          stroke-dasharray: ${0.8 * radial} ${1.5 * ratio};
          stroke-dashoffset: ${1.8 * ratio};
        }
      }
    `;

        injectStyle(spinnerAnimation, "spinner-animation");
    };

    addAnimationToDOM();

    return { calculateStyle };
};

export { useLoading };
