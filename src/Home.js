import Navbar from "./Navbar";

const Home = () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
        window.location.href = "/shops";
    }
    return (
        <>
            <Navbar>
                <a className="navbar-brand">Shopping Lists</a>
                <ul className="navbar-nav ms-md-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                </ul>
            </Navbar>
            <div className="container text-center">
                <h1 className="display-3 mb-lg-4">Welcome to Shopping Lists!</h1>
                <h2 className="mb-lg-5">You can keep track of everything you need to buy with no problem!</h2>

                <a className="btn btn-primary btn-lg" href="/login">Get started now</a>
            </div>
        </>
    )
}

export default Home;