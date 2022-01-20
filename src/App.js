import './style/bootstrap.css';
import './style/App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-telephone-input/css/default.css'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginCallback from "./LoginCallback";
import Home from "./Home";
import Shops from "./Shops";
import Items from "./Items";
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
                    <Route path="/share">
                        <Share/>
                    </Route>
                    <Route path="/callback">
                        <LoginCallback/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
