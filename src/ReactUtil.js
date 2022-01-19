import {useEffect, useState} from "react";

const usePersistentState = (key: string, initialValue: any) => {
    const [state, setState] = useState(localStorage.getItem(key) || initialValue);
    useEffect(() => {
        localStorage.setItem(key, state);
    }, [key, state]);
    return [state, setState]
}

export {
    usePersistentState
};