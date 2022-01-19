import {useRef, useState} from "react";
import Shop from "./Shop";
import {Backend} from "./Backend";
import {Navbar, ToggledContent} from "./Navbar";
import {disableIfEmpty, runOnEnter} from "./validation";

const Shops = () => {
    const [shops, setShops] = useState(null);
    const addInputReference = useRef();
    const addButtonReference = useRef();
    if (shops === null) {
        Backend.getLists((res) => {
            setShops(res);
        })
    }

    const add = () => {
        if (addInputReference.current && addInputReference.current.value) {
            const value = addInputReference.current.value;
            addInputReference.current.value = "";
            setShops([...shops, [Backend.createList(value), value]]);
            addInputReference.current.focus();
            disableIfEmpty(addInputReference, addButtonReference)();
            // TODO:   MAKE BUTTON DISABLE AFTER PRESS AND MAKE ENTER KEY
        }
    }

    return (
        <>
            <Navbar>
                <a href="/shops" className="navbar-brand">My shopping lists</a>
                <ToggledContent>
                    <ul className="navbar-nav ms-md-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/signout">Sign Out</a>
                        </li>
                    </ul>
                </ToggledContent>
            </Navbar>

            <div className="container">
                <div className="input-group mb-2">
                    <input ref={addInputReference} onChange={disableIfEmpty(addInputReference, addButtonReference)} onKeyDown={runOnEnter(add)} type="text" className="form-control add_new" placeholder="Add new store"/>
                    <button ref={addButtonReference} className="btn btn-primary button_big_font disabled shadow-none" type="button" onClick={add}>+</button>
                </div>

                {shops === null ? (
                    <p>Loading lists...</p>
                ) : shops.length === 0 ? (
                    <p>You do not have any lists.</p>
                ) : ((shops.map(((value, index) => {
                    return <Shop key={value[0]} shopID={value[0]} shopName={value[1]} onDelete={() => {
                        const copy = [...shops];
                        copy.splice(index, 1)
                        setShops(copy);
                    }
                    } onEdit={(newValue) => {
                        const copy = [...shops];
                        copy[index][1] = newValue;
                        setShops(copy);
                    }} />
                }))))}
            </div>
        </>
    )
}

export default Shops;