import {RefObject} from "react";

const disableIfEmpty = (inputRef: RefObject<HTMLInputElement>, buttonRef: RefObject<HTMLButtonElement>) => {
    return () => {
        if (inputRef.current && buttonRef.current) {
            if (inputRef.current.value.trim()) {
                buttonRef.current.classList.remove("disabled");
            } else {
                buttonRef.current.classList.add("disabled");
            }
        }
    };
}

const runOnEnter = (func: CallableFunction) => {
    return (event) => {
        if (event.code === "Enter") {
            func();
        }
    };
}

export {
    disableIfEmpty,
    runOnEnter
};