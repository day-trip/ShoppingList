const disableIfEmpty = (inputRef, buttonRef) => {
    return () => {
        if (inputRef.current && buttonRef.current) {
            if (inputRef.current.value) {
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