import {createRef, useState} from "react";
import {Backend} from "./util/Backend";
import {Redirect} from "react-router-dom";

const Shop = ({shopID, shopName, onDelete, onEdit}) => {
    const [redirect, setRedirect] = useState(null);
    const inputReference = createRef();

    const openList = () => {
        localStorage.setItem("shopName", shopName);
        setRedirect("/shop/" + shopID);
    }

    const saveList = (target) => {
        if (target.value !== shopName) {
            onEdit(target.value);
            Backend.updateList(shopID, target.value);
        }
    }

    const deleteList = () => {
        onDelete();
        Backend.deleteList(shopID)
    }

    const onBlur = () => {
        saveList(inputReference.current);
    }

    if (redirect) {
        return (
            <Redirect to={redirect}/>
        )
    }

    return (
        <div className="input-group mb-2">
            <button className="btn btn-primary shadow-none" type="button" onClick={openList}>&gt;</button>

            <input type="text" className="form-control" defaultValue={shopName} onBlur={onBlur} ref={inputReference}/>

            <button className="btn btn-secondary button_big_font shadow-none" type="button" onClick={deleteList}>&times;</button>
        </div>
    )
}

export default Shop;