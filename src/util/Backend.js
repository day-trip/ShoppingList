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
            if (callback) {
                callback(xhr.responseText);
            }
        }
    };

    xhr.send(typeof data === "string" ? data : JSON.stringify(data));
}

class Backend {
    // TODO: if user has more than one MAC address then load from backend, else load from cache
    static API_ENDPOINT = "https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/";

    static createList(listName) {
        const shopID = (Date.now() / 20).toFixed();
        sendRequest(this.API_ENDPOINT + "shop/add", {shopName: listName, shopId: shopID}, null, window.location.pathname);
        return shopID;
    }

    static updateList(listID, newListName) {
        sendRequest(this.API_ENDPOINT + "shop/edit", {shop: listID, newName: newListName}, null, window.location.pathname);
    }

    static deleteList(listID) {
        sendRequest(this.API_ENDPOINT + "shop/delete", {shop: listID}, null, window.location.pathname);
    }

    static getLists(callback) {
        const cacheLists = localStorage.getItem("lists");
        if (cacheLists) {
            callback(JSON.parse(cacheLists));
        }
        sendRequest(this.API_ENDPOINT + "shop/get", {}, (res) => {
            const lists = JSON.parse(res).body;
            localStorage.setItem("lists", lists);
            callback(JSON.parse(lists));
        }, window.location.pathname);
    }



    static getItems(listID, callback) {
        const cacheItems = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : {};
        if (cacheItems[listID.toString()]) {
            callback(cacheItems[listID.toString()]);
        }
        sendRequest(this.API_ENDPOINT + "item/get", {shop: listID}, (res) => {
            const items = JSON.parse(JSON.parse(res).body);
            cacheItems[listID.toString()] = items;
            localStorage.setItem("items", JSON.stringify(cacheItems));
            callback(items);
        }, window.location.pathname);
    }

    static createItem(listID, itemName) {
        sendRequest(this.API_ENDPOINT + "item/add", {shop: listID, item: itemName}, null, window.location.pathname);
    }

    static deleteItem(listID, itemName) {
        sendRequest(this.API_ENDPOINT + "item/delete", {shop: listID, item: itemName}, null, window.location.pathname);
    }

    static updateItem(listID, itemName, newItemName) {
        sendRequest(this.API_ENDPOINT + "item/edit", {shop: listID, item: itemName, newItem: newItemName}, null, window.location.pathname);
    }



    static sendList(listID, listName, phoneNumber) {
        sendRequest(this.API_ENDPOINT + "shop/send", {shopId: listID, shopName: listName, phoneNumber: phoneNumber}, null, window.location.pathname);
    }
}

function sendToLogin(next) {
    window.localStorage.setItem("next", next || window.location.pathname);
    window.location.href = "https://jcclol.auth.us-east-1.amazoncognito.com/login?client_id=33vptobuge4u71evls6c12ru5b&response_type=token&scope=email+openid+phone+aws.cognito.signin.user.admin&redirect_uri=https://jcc.lol/callback";
}

export {
    Backend,
    sendToLogin,
    sendRequest
};
