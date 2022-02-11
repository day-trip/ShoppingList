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

function App() {
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
