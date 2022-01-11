import {createRef} from "react";
import Backend from "./Backend";

const Shop = ({shopID, shopName, onDelete, onEdit}) => {
    const inputReference = createRef();

    const openList = () => {
        window.location.href = "/shop/" + shopID;
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

    return (
        <div className="input-group mb-2">
            <button className="btn btn-primary" type="button" onClick={openList}>&gt;</button>

            <input type="text" className="form-control" defaultValue={shopName} onBlur={onBlur} ref={inputReference}/>

            <button className="btn btn-secondary button_big_font" type="button" onClick={deleteList}>&times;</button>
        </div>
    )
}

export default Shop;