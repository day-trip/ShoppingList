import './bootstrap.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginCallback from "./LoginCallback";
import Signout from "./Signout";
import Home from "./Home";
import Shops from "./Shops";
import Items from "./Items";
import Login from "./Login";
import Share from "./Share";

function App() {
    return (
        <Router>
            <div>
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
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/share">
                        <Share/>
                    </Route>
                    <Route path="/callback">
                        <LoginCallback/>
                    </Route>
                    <Route path="/signout">
                        <Signout/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
