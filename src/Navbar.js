const Navbar = (props) => {
    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light mb-navbar">
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

export default Navbar;