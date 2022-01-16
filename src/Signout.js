import {Redirect} from "react-router-dom";

const Signout = () => {
    localStorage.removeItem("token");
    return (
        <Redirect to="/"/>
    )
}

export default Signout;