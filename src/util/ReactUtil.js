import {useEffect, useState} from "react";

const usePersistentState = (key: string, initialValue: any) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) || initialValue);
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState]
}

export {
    usePersistentState
};