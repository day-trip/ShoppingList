import Navbar from "./Navbar";

const Share = () => {
    return (
        <>
            <Navbar>
                <a className="navbar-brand">My PLACEHOLDER shopping list</a>
                <ul className="navbar-nav ms-md-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/shops">My lists</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/signout">Sign Out</a>
                    </li>
                </ul>
            </Navbar>

            <div className="container">

            </div>
        </>
    )
}

export default Share;