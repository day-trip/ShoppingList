const Navbar = (props) => {
    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light mb-navbar">
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

const ToggledContent = (props) => {
    return (
        <>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
                {props.children}
            </div>
        </>
    )
}

export {
    Navbar,
    ToggledContent
};