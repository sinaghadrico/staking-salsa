import axios from "axios";
import { offchain, stats } from "utils/configs";
export type ProjectTypeName = "predictor";
export type RequestTypeName = "offchain" | "stats";

export interface ProjectName {
    predictor: string;
}

const useRequest = (projectType: ProjectTypeName = "predictor", requestType: RequestTypeName = "offchain") => {
    const _offchain: ProjectName = offchain;
    const _stats: ProjectName = stats;
    const endpoint = requestType === "stats" ? _stats[projectType] : _offchain[projectType];
    const request = axios.create({
        baseURL: endpoint,
        timeout: 10000,
    });
    request.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                return error;
            }
            return Promise.reject(error.response);
        },
    );

    const get = (arg: any) => {
        return request.get(arg).catch(() => {
            return {};
        });
    };

    const post = (arg: any, body: any) => {
        return request.post(arg, body);
    };

    const all = axios.all;
    const spread = axios.spread;

    return { request, get, post, all, spread };
};

export default useRequest;
