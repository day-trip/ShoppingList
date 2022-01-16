import sendRequest from "./requests";

class Backend {
    static createList(listName, callback) {
        const shopID = ((new Date(2020, 4, 29, 22, 0, 0, 0) * 3) / 50).toFixed(); // Has to be in "jiffies", not ms
        callback(shopID);
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/shop/add", {shopName: listName, shopId: shopID}, null, window.location.href);
    }

    static updateList(listID, newListName) {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/shop/edit", {shop: listID, newName: newListName}, null, window.location.href);
    }

    static deleteList(listID) {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/shop/delete", {shop: listID}, null, window.location.href);
    }

    static getLists(callback) {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/shop/get", {}, (res) => {
            callback(JSON.parse(JSON.parse(res).body))
        }, window.location.href);
    }



    static getItems(listID, callback) {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/item/get", {shop: listID}, (res) => {
            callback(JSON.parse(JSON.parse(res).body))
        }, window.location.href);
    }

    static createItem(listID, itemName) {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/item/add", {shop: listID, item: itemName}, null, window.location.href);
    }

    static deleteItem(listID, itemName) {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/item/delete", {shop: listID, item: itemName}, null, window.location.href);
    }

    static updateItem(listID, itemName, newItemName) {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/item/edit", {shop: listID, item: itemName, newItem: newItemName}, null, window.location.href);
    }



    static joinList(listID, callback) {
        setTimeout(callback, 3000);
    }
}

export default Backend;