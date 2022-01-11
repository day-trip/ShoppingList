import {createRef} from "react";
import Backend from "./Backend";

const Item = ({listID, itemName, onDelete, onEdit}) => {
    const inputReference = createRef();

    const saveItem = (target) => {
        if (target.value !== itemName) {
            onEdit(target.value);
            Backend.updateItem(listID, itemName, target.value);
        }
    }

    const deleteItem = () => {
        onDelete();
        Backend.deleteItem(listID, itemName);
    }

    const onBlur = () => {
        saveItem(inputReference.current);
    }

    return (
        <div className="input-group mb-2">
            <input type="text" className="form-control" defaultValue={itemName} onBlur={onBlur} ref={inputReference} />
            <button className="btn btn-secondary" type="button" onClick={deleteItem}>&times;</button>
        </div>
    )
}

export default Item;