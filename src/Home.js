import sendToLogin from "./sendToLogin";

const Home = () => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
        window.location.href = "/lists";
    }
    return (
        <div>
            <h1 className="mb-2">Welcome to Shopping Lists!</h1>
            <h2 className="mb-4">You can easily maintain all the things you need to buy in a simple way.</h2>
            <h3 className="mb-3">All you have to do to get started is sign in with Google!</h3>
            <button className="btn btn-primary" onClick={() => {sendToLogin("/lists")}}>Login</button>
        </div>
    )
}

export default Home;