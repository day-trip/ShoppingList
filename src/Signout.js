const Signout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    return (
        <div>
            <p>You have been logged out successfully! You should be automatically redirected to the home page, if not, click <a href="/">this link</a></p>
        </div>
    )
}

export default Signout;