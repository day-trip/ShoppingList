function sendToLogin(next) {
    if (next !== null && next !== undefined) {
        window.localStorage.setItem("next", next);
    }
    window.location.href = "https://jcclol.auth.us-east-1.amazoncognito.com/login?client_id=33vptobuge4u71evls6c12ru5b&response_type=token&scope=email+openid+phone&redirect_uri=http://localhost:3000/callback";
}

export default sendToLogin;