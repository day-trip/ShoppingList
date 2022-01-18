import {useRef, useState} from "react";
import Item from "./Item";
import {Backend} from "./Backend";
import {useParams} from "react-router-dom";
import {Navbar, ToggledContent} from "./Navbar";
import {disableIfEmpty} from "./validation";

const Items = () => {
    const [items, setItems] = useState(null);
    const addInputReference = useRef();
    const addButtonReference = useRef();
    const sendInputReference = useRef();
    const sendButtonReference = useRef();
    let {shopID} = useParams()
    const shopName = localStorage.getItem("shopName") || "error";

    if (items === null) {
        Backend.getItems(shopID, (res) => {
            setItems(res);
        })
    }

    const add = () => {
        if (addInputReference.current && addInputReference.current.value) {
            const value = addInputReference.current.value;
            addInputReference.current.value = "";
            setItems([...items, value]);
            Backend.createItem(shopID, value);
        }
    }

    const sendList = () => {
        console.log("sending list.");
    }

    return (
        <>
            <Navbar>
                <a href={"/shop/" + shopID} className="navbar-brand">My <span className="text-danger">{shopName}</span> list</a>
                <ToggledContent>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/share">Share</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-md-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/shops">My Lists</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signout">Sign Out</a>
                        </li>
                    </ul>
                </ToggledContent>
            </Navbar>

            <div className="container">
                <div className="input-group mb-4">
                    <input ref={sendInputReference} onChange={disableIfEmpty(sendInputReference, sendButtonReference)} type="tel" className="form-control" placeholder="Phone number" />
                    <button ref={sendButtonReference} className="btn btn-primary disabled shadow-none" type="button" onClick={sendList}>Send List</button>
                </div>

                <div className="input-group mb-2">
                    <input ref={addInputReference} onChange={disableIfEmpty(addInputReference, addButtonReference)} type="text" className="form-control add_new" placeholder="Add new item" autoFocus={true} />
                    <button ref={addButtonReference} className="btn btn-primary disabled shadow-none" type="button" onClick={add}>+</button>
                </div>

                {items === null ? (
                    <p>Loading items...</p>
                ) : items.length === 0 ? (
                    <p>You do not have any items.</p>
                ) : (
                    items.map(((value, index) => {
                        return <Item key={value} listID={shopID} itemName={value} onDelete={() => {
                            const copy = [...items];
                            copy.splice(index, 1)
                            setItems(copy);
                        }
                        } onEdit={(newValue) => {
                            const copy = [...items];
                            copy[index] = newValue;
                            setItems(copy);
                        }} />
                    })))}
            </div>
        </>
    )
}

export default Items;