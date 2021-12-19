const useTime = () => {
    const format = (epoch: number) => {
        const allowedIndexes = [1, 2, 3, 4];

        return new Date(epoch)
            .toUTCString()
            .split(" ")
            .filter((item, index) => item && allowedIndexes.includes(index))
            .concat("UTC")
            .map((item, index, array) => {
                if (index === 0) {
                    return `${array[1]},`;
                }
                if (index === 1) {
                    return `${array[0]},`;
                }
                if (index === 2) {
                    return `${array[2]},`;
                }
                if (index === 3) {
                    const time = item?.split(":");
                    return `${time[0]}:${time[1]}`;
                }

                return item;
            })
            .join(" ");
    };

    return { format };
};

export { useTime };
