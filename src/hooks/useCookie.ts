const useCookie = () => {
    const reduceCookieToObject = (): { [key: string]: string } => {
        const cookies = document.cookie.split(";").reduce((obj: { [key: string]: string }, nextCookie: string) => {
            const [key, value] = nextCookie.split("=");

            if (key && value) {
                return Object.assign(obj, { [key.trim()]: value });
            }

            return obj;
        }, {});

        return cookies;
    };

    const addCookie = (key: string, value: string) => {
        document.cookie = `${key}=${value};`;
    };

    const getCookie = (key: string) => {
        const cookies = reduceCookieToObject();

        return cookies[key];
    };

    return { addCookie, getCookie };
};

export { useCookie };
