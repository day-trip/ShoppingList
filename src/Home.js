import {Navbar} from "./Navbar";
import {Redirect} from "react-router-dom";
import {sendToLogin} from "./util/Backend";

const Home = () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
        return (
            <Redirect to="/shops"/>
        )
    }
    return (
        <>
            <Navbar>
                <a className="navbar-brand">My Shopping Lists</a>
                <ul className="navbar-nav ms-md-auto">
                    <li className="nav-item">
                        <button className="btn btn-primary" onClick={() => {sendToLogin("/shops");}}>{localStorage.getItem("beenHere") ? "Login" : "Get Started"}</button>
                    </li>
                </ul>
            </Navbar>
            <div className="container">
                <h2 className="mb-lg-5 text-center">Keep track of everything you need to buy from any device!</h2>
                <div className="position-relative">
                    <img src="/shops.png" className="border border-1 border-danger rounded-2 w-100 h-100" alt="Shops" />
                    <h4 className="position-absolute start-50 bottom-0 translate-middle-x">Manage all your shops easily from anywhere</h4>
                </div>
            </div>
        </>
    )
}

export default Home;