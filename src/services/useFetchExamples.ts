/* eslint-disable @typescript-eslint/no-empty-function */
import type { Example } from "models/example";

/**
 * Simulate fetching Eexampls from a remote source
 */
export function fetchBooks(): Promise<Example[]> {
    return Promise.resolve<Example[]>([
        {
            id: 0,
            title: "The First Title",
            description: "The First Description",
        },
        {
            id: 1,
            title: "The Second Title",
            description: "The Second Description",
        },
    ]);
}

const useFetchExample = () => {
    const get = () => {
        return new Promise((resolve: (response: Example[]) => void, reject) => {
            //Mock Promise
            //use axios and useRequest hook for real data
            fetchBooks()
                .then((response: Example[]) => {
                    resolve(response);
                })

                .catch((error) => {
                    reject(error);
                })
                .then(() => {});
        });
    };

    const create = () => {};

    const getById = () => {};

    const remove = () => {};

    return { get, create, remove, getById };
};

export default useFetchExample;
