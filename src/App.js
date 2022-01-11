import './bootstrap.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Footer from "./Footer";
import LoginCallback from "./LoginCallback";
import Signout from "./Signout";
import Home from "./Home";
import Shops from "./Shops";
import Items from "./Items";

function App() {
    return (
        <Router>
            <div className="App">
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
                    <Route path="/signout">
                        <Signout/>
                    </Route>
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
