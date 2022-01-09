import './bootstrap.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Footer from "./Footer";
import ShopsList from "./ShopsList";
import ItemsList from "./ItemsList";
import LoginCallback from "./LoginCallback";
import Signout from "./Signout";
import Home from "./Home";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/lists">
                        <ShopsList/>
                    </Route>
                    <Route path="/items/:name">
                        <ItemsList/>
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
