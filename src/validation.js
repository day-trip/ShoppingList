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

export {
    disableIfEmpty
};