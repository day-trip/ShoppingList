import sendToLogin from "./sendToLogin";


const sendRequest = (url, data, callback, next) => {
    const token = window.localStorage.getItem("token");
    if (!token) {
        sendToLogin(next);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", token);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 403 || xhr.status === 401) {
                localStorage.removeItem("token");
                sendToLogin(next);
            }
            console.log(xhr.responseText);
            if (callback) {
                callback(xhr.responseText);
            }
        }
    };

    xhr.send(typeof data === "string" ? data : JSON.stringify(data));
}

export default sendRequest;