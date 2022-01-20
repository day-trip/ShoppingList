import {Navbar, ToggledContent} from "./Navbar";
import Link from "./Link";
import {useState} from "react";
import {Redirect} from "react-router-dom";

const Share = () => {
    const [redirect, setRedirect] = useState(null);

    if (redirect) {
        return (
            <Redirect to={redirect}/>
        )
    }

    return (
        <>
            <Navbar>
                <a className="navbar-brand">My PLACEHOLDER shopping list</a>
                <ToggledContent>
                    <ul className="navbar-nav ms-md-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href="/shops" set={setRedirect}>My Lists</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/" set={setRedirect} callback={() => {localStorage.removeItem("token");}}>Signout</Link>
                        </li>
                    </ul>
                </ToggledContent>
            </Navbar>

            <div className="container">

            </div>
        </>
    )
}

export default Share;