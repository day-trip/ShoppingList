import getURLParameter from "./Urls";
import {Redirect} from "react-router-dom";


const LoginCallback = () => {
    localStorage.setItem("beenHere", "1");
    const token = getURLParameter("access_token")
    if (token === null) {
        return (
            <div>
                <h1>Uh oh, a strange error has occurred. Try logging in again.</h1>
            </div>
        )
    }
    window.localStorage.setItem("token", token);
    const next = window.localStorage.getItem("next");

    if (next !== null && next !== undefined) {
        window.localStorage.removeItem("next");
        return (
            <Redirect to={next}/>
        )
    }

    return (
        <Redirect to="/"/>
    )
}

export default LoginCallback;