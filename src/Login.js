import sendToLogin from "./sendToLogin";

const Login = () => {
    sendToLogin("/shops");
    return (
        <>
            <p>login</p>
        </>
    )
}

export default Login;