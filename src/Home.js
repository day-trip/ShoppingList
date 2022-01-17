import {Navbar} from "./Navbar";
import {Redirect} from "react-router-dom";
import sendToLogin from "./sendToLogin";

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
            <div className="container text-center">
                <h2 className="mb-lg-5">Keep track of everything you need to buy from any device!</h2>
            </div>
        </>
    )
}

export default Home;