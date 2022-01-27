import {RefObject, useEffect, useState} from "react";

const usePersistentState = (key: string, initialValue: any) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) || initialValue);
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState]
}

const useFitText = (text: RefObject<HTMLHeadingElement>, compressor: number) => {
    const [size, setSize] = useState(0)

    useEffect(() => {
        const listener = () => {
            setSize(Math.min(Math.max(text.current.parentElement.clientWidth / compressor, 0), text.current.parentElement.clientHeight));
        }
        window.addEventListener('resize', listener);
        listener();
        return () => {
            window.removeEventListener('resize', listener);
        }
    });

    return () => (size + "px");
}

export {
    usePersistentState,
    useFitText
};