import './bootstrap.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Footer from "./Footer";
import ShopsList from "./ShopsList";
import ItemsList from "./ItemsList";
import LoginCallback from "./LoginCallback";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <h1>The home page is not done yet, just click <a href="/lists">this link</a></h1>
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
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
