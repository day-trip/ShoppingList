import sendRequest from "./requests";

class Backend {
    static API_ENDPOINT = "https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/";

    static createList(listName) {
        const shopID = (Date.now() * 50).toFixed();
        sendRequest(this.API_ENDPOINT + "shop/add", {shopName: listName, shopId: shopID}, null, window.location.href);
        return shopID;
    }

    static updateList(listID, newListName) {
        sendRequest(this.API_ENDPOINT + "shop/edit", {shop: listID, newName: newListName}, null, window.location.href);
    }

    static deleteList(listID) {
        sendRequest(this.API_ENDPOINT + "shop/delete", {shop: listID}, null, window.location.href);
    }

    static getLists(callback) {
        sendRequest(this.API_ENDPOINT + "shop/get", {}, (res) => {
            callback(JSON.parse(JSON.parse(res).body))
        }, window.location.href);
    }



    static getItems(listID, callback) {
        sendRequest(this.API_ENDPOINT + "item/get", {shop: listID}, (res) => {
            callback(JSON.parse(JSON.parse(res).body))
        }, window.location.href);
    }

    static createItem(listID, itemName) {
        sendRequest(this.API_ENDPOINT + "item/add", {shop: listID, item: itemName}, null, window.location.href);
    }

    static deleteItem(listID, itemName) {
        sendRequest(this.API_ENDPOINT + "item/delete", {shop: listID, item: itemName}, null, window.location.href);
    }

    static updateItem(listID, itemName, newItemName) {
        sendRequest(this.API_ENDPOINT + "item/edit", {shop: listID, item: itemName, newItem: newItemName}, null, window.location.href);
    }
}

function sendToLogin(next) {
    window.localStorage.setItem("next", next || window.location.href);
    window.location.href = "https://jcclol.auth.us-east-1.amazoncognito.com/login?client_id=33vptobuge4u71evls6c12ru5b&response_type=token&scope=email+openid+phone&redirect_uri=https://jcc.lol/callback";
}

export {
    Backend,
    sendToLogin
};
