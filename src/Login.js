import {sendToLogin} from "./Backend";

const Login = () => {
    return sendToLogin("/shops");
}

export default Login;