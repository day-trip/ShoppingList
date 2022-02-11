import './style/bootstrap.css';
import './style/App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'animate.css/animate.css'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginCallback from "./LoginCallback";
import Home from "./Home";
import Shops from "./Shops";
import Items from "./Items";
import './util/Extensions';
import {Amplify} from "aws-amplify";
/*import useWebSocket from "react-use-websocket";
import {useEffect} from "react";*/

function App() {
    /*const {sendMessage, lastMessage, readyState} = useWebSocket("wss://g71egynla2.execute-api.us-east-1.amazonaws.com/production");

    useEffect(() => {
        console.log(readyState);
    }, [readyState, sendMessage]);

    useEffect(() => {
        console.log(lastMessage);
    }, [lastMessage])*/

    Amplify.configure({
        Auth: {
            region: 'us-east-1',

            userPoolId: 'us-east-1_XMBuQDKSm',
            userPoolWebClientId: 'mjm9mlsti9nge4jpg0ao1m80j',

            oauth: {
                domain: 'jcclol.auth.us-east-1.amazoncognito.com',
                scope: ['phone', 'email', 'openid', 'aws.cognito.signin.user.admin'],
                redirectSignIn: "https://jcc.lol/callback",
                responseType: 'token'
            }
        }
    });

    return (
        <Router>
            {/*<button onClick={() => {sendMessage(JSON.stringify({token: localStorage.getItem("token"), action: "echo", message: Date.now().toString()}))}}>Test Me</button>*/}
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/shops">
                    <Shops/>
                </Route>
                <Route path="/shop/:shopID">
                    <Items/>
                </Route>
                <Route path="/callback">
                    <LoginCallback/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
