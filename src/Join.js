import Navbar from "./Navbar";
import {useParams} from "react-router-dom";
import getURLParameter from "./Urls";
import {useState} from "react";
import Backend from "./Backend";

const Join = () => {
    const {shopID} = useParams();
    const name = getURLParameter("name");
    const [joining, setJoining] = useState(false);

    const join = () => {
        if (!joining) {
            setJoining(true);
            Backend.joinList(shopID, () => {
                window.location.href = "/shop/" + shopID;
            })
        }
    }

    return (
        <>
            <Navbar>
                <a className="navbar-brand">Join</a>
                <ul className="navbar-nav ms-md-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/shops">Back to my lists</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/signout">Sign Out</a>
                    </li>
                </ul>
            </Navbar>

            <div className="container text-center">
                <h1>Joining list {name}!</h1>
                {joining ? <p>Joining...</p> : <button className="btn btn-primary" onClick={join}>Continue</button>}
            </div>
        </>
    )
}

export default Join;