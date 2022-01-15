const getURLParameter = (paramName) => {
    const url = window.location.href.replace("#", "?");
    const params = url.substring(url.indexOf("?") + 1, url.length);
    const vars = params.split("&");
    for (const param of vars) {
        const split = param.split("=");
        if (split[0] === paramName) {
            return split[1];
        }
    }
    return null;
}

export default getURLParameter;