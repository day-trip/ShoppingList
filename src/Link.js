const Link = (props) => {
    return (
        <a href="/" className={props.className} onClick={(event) => {
            if (props.callback) {
                props.callback();
            }
            props.set(props.href);
            event.preventDefault();
        }}>{props.children}</a>
    )
}

export default Link;