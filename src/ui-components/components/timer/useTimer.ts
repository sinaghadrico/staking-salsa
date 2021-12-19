const useTimer = () => {
    const factor = 86400; // 1d = 24h * 60m * 60s = 24 * 3600 = 86400 sec

    const getDiff = (epoch: number) => {
        return Number(Number((epoch - new Date().getTime()) / 1000).toFixed(0));
    };

    const safe = (value: number) => {
        return value < 0 || isNaN(value) ? 0 : value;
    };

    const parseEpoch = (epoch: number) => {
        const diff = Number((epoch - new Date().getTime()) / 1000);

        const day = safe(Math.floor(diff / factor));
        const hour = safe(Math.floor((diff % factor) / 3600));
        const minute = safe(Math.floor((diff % 3600) / 60));
        const second = safe(Math.floor(diff % 60));

        return { day, hour, minute, second };
    };

    const tick = (epoch: number, passed: number, setElements: Function, setPassed: Function) => {
        const elements = parseEpoch(epoch - passed);
        const result = Object.values(elements).reduce((sum, next) => sum + next, 0);

        setElements(elements);

        if (result > 0) {
            setTimeout(() => {
                setPassed(passed + 1);
            }, 1000);
        }
    };

    const calculateTimeLeft = (epoch: any) => {
        const difference = +new Date(epoch) - +new Date();
        let timeLeft = { day: 0, hour: 0, minute: 0, second: 0 };

        if (difference > 0) {
            timeLeft = {
                day: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hour: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minute: Math.floor((difference / 1000 / 60) % 60),
                second: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    return {
        getDiff,
        parseEpoch,
        tick,
        calculateTimeLeft,
    };
};

export { useTimer };
