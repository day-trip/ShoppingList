import getURLParameter from "./Urls";


const LoginCallback = () => {
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
        window.location.href = next;
    } else {
        window.location.href = "/";
    }
    return (
        <div>
            <h1>Authorized!</h1>
            <p>You should be automatically redirected to the home page, if not, click <a href="/">this</a></p>
        </div>
    )
}

export default LoginCallback;