import {useRef, useState} from "react";
import Item from "./Item";
import {Backend} from "./util/Backend";
import {Redirect, useParams} from "react-router-dom";
import {Navbar, ToggledContent} from "./Navbar";
import {disableIfEmpty, runOnEnter} from "./util/Validation";
import Link from "./Link";

const Items = () => {
    const [redirect, setRedirect] = useState(null);
    const [items, setItems] = useState(null);
    const addInputReference = useRef();
    const addButtonReference = useRef();
    const sendInputReference = useRef();
    const sendButtonReference = useRef();
    let {shopID} = useParams()
    const shopName = localStorage.getItem("shopName") || "error";

    if (document.title) {
        document.title = shopName + " shopping list";
    }

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
            addInputReference.current.focus();
            disableIfEmpty(addInputReference, addButtonReference)();
        }
    }

    const sendList = () => {
        if (sendInputReference.current) {
            const number = "+1" + sendInputReference.current.value;
            localStorage.setItem("phoneDefault", sendInputReference.current.value);
            Backend.sendList(shopID, shopName, number);
            sendInputReference.current.value = "";
        }
    }

    if (redirect) {
        return (
            <Redirect to={redirect}/>
        )
    }

    return (
        <>
            <Navbar>
                <a className="navbar-brand">My <span className="text-danger">{shopName}</span> list</a>
                <ToggledContent>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" href="/share" set={setRedirect}>Share</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-md-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href="/shops" set={setRedirect}>My Lists</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/" set={setRedirect} callback={() => {localStorage.removeItem("token");}}>Signout</Link>
                        </li>
                    </ul>
                </ToggledContent>
            </Navbar>

            <div className="container">
                <div className="input-group">
                    <input ref={sendInputReference} onChange={disableIfEmpty(sendInputReference, sendButtonReference)} onKeyDown={runOnEnter(sendList)} className="form-control" placeholder="Phone number" type="tel" onKeyPress={(event) => {if (isNaN(event.key)) {event.preventDefault()}}} defaultValue={localStorage.getItem("phoneDefault") || ""}/>
                    <button ref={sendButtonReference} className="btn btn-primary disabled shadow-none" type="button" onClick={sendList}>Send List</button>
                </div>

                <hr/>

                <div className="input-group mb-2">
                    <input ref={addInputReference} onChange={disableIfEmpty(addInputReference, addButtonReference)} onKeyDown={runOnEnter(add)} type="text" className="form-control add_new" placeholder="Add new item" autoFocus={true} />
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