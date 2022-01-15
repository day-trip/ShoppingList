import {createRef, useState} from "react";
import Item from "./Item";
import Backend from "./Backend";
import {useParams} from "react-router-dom";
import Navbar from "./Navbar";

const Items = () => {
    const [items, setItems] = useState(null);
    const [gotItems, setGotItems] = useState(false);
    const addInputReference = createRef();
    const addButtonReference = createRef();
    const copyButtonReference = createRef();
    let {shopID} = useParams()
    const shopName = localStorage.getItem("shopName") || "error";

    if (!gotItems) {
        Backend.getItems(shopID, (res) => {
            setGotItems(true);
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

    const onAddChange = () => {
        if (addInputReference.current && addButtonReference.current) {
            if (addInputReference.current.value) {
                if (addButtonReference.current.classList.contains("disabled")) {
                    addButtonReference.current.classList.remove("disabled");
                }
            } else {
                if (!addButtonReference.current.classList.contains("disabled")) {
                    addButtonReference.current.classList.add("disabled");
                }
            }
        }
    }

    const copyInviteLink = () => {
        navigator.clipboard.writeText("jcc.lol/join/" + shopID + "?name=" + shopName).then((() => {
            if (copyButtonReference.current) {
                copyButtonReference.current.innerText = "Copied!";
                setTimeout(() => {
                    copyButtonReference.current.innerText = "Copy Invite Link";
                }, 5000);
            }
        }));
    }

    return (
        <>
            <Navbar>
                <a className="navbar-brand">My {shopName} shopping list</a>
                <ul className="navbar-nav ms-md-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/shops">Back to my lists</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/signout">Sign Out</a>
                    </li>
                </ul>
            </Navbar>

            <div className="container">
                <div className="d-flex justify-content-between mb-4">
                    <div>
                        <p>You can send others an invite link so you can collaborate on a shopping list</p>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={copyInviteLink} ref={copyButtonReference} >Copy Invite Link</button>
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-group mb-2">
                        <input ref={addInputReference} onChange={onAddChange} type="text" className="form-control add_new" placeholder="Add new item" />
                        <button ref={addButtonReference} className="btn btn-primary" type="button" onClick={add}>+</button>
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
            </div>
        </>
    )
}

export default Items;