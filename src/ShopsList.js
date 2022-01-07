import {Component, createRef} from "react";
import sendRequest from "./requests";

class ShopsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopNames: null,
            inputInsideState: {}
        }
        this.onClick = this.onClick.bind(this);
        this.addRef = createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        for (let i = 0; i < this.state.shopNames.length; i++) {
            this.processInput(i);
        }
    }

    componentDidMount() {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/shop/get", {}, (res) => {
            this.setState({
                shopNames: JSON.parse(JSON.parse(res).body)
            });
        }, window.location.href);
        document.addEventListener("click", this.onClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.onClick);
    }

    deleteList(listName) {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/shop/delete", {shop: listName}, (res) => {
            const copy = [...this.state.shopNames];
            const index = copy.indexOf(listName);
            if (index > -1) {
                copy.splice(index, 1);
            }
            this.setState({
                shopNames: copy
            })
        }, window.location.href);
    }

    openList(listName) {
        window.location.href = "items/" + listName;
    }

    saveList(input) {
        const new_val = input.value;
        const old_val = this.state.shopNames[input.id];
        if (new_val !== old_val) {
            sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/shop/edit", {shop: old_val, new_shop: new_val}, (res) => {
                const copy = [...this.state.shopNames];
                const index = copy.indexOf(old_val);
                if (index !== -1) {
                    copy[index] = new_val;
                }
                this.setState({
                    shopNames: copy
                })
            }, window.location.href);
        }
    }

    processInput(inputElem) {
        this.state.inputInsideState = {
            ...this.state.inputInsideState,
            [inputElem]: false
        };
    }

    onClick(event) {
        if (event.type === 'click') {
            for (const [key, value] of Object.entries(this.state.inputInsideState)) {
                const realKey = document.getElementById(key);
                const inside = realKey.contains(event.target);
                if (inside) {
                    this.state.inputInsideState = {...this.state.inputInsideState, [key]: true};
                } else {
                    if (value) {
                        this.state.inputInsideState = {...this.state.inputInsideState, [key]: false};
                        this.saveList(realKey);
                    }
                }
            }
        }
    }

    add() {
        const val = this.addRef.current.value;
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/shop/add", {shop: val}, (res) => {
            this.setState({
                shopNames: [...this.state.shopNames, val]
            })
            this.addRef.current.value = "";
        }, window.location.href);
    }

    render() {
        if (this.state.shopNames === null) {
            return (
                <div>
                    <p>Loading lists...</p>
                </div>
            )
        }

        return (
            <div className="w-100">
                <div className="navbar navbar-expand-lg navbar-light bg-light mb-lg-5">
                    <div className="container">
                        <a className="navbar-brand">My shopping lists</a>
                        <ul className="navbar-nav ms-md-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/signout">Sign Out</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="form-group m-auto w-50">
                    <div className="input-group mb-2">
                        <input ref={this.addRef} type="text" className="form-control add_new" placeholder="Add new store"/>
                        <button className="btn btn-primary button_big_font" type="button" onClick={() => {this.add()}}>+</button>
                    </div>

                    {this.state.shopNames.map(((value, index) => {
                        return (
                            <div className="input-group mb-2" key={value}>
                                <button className="btn btn-primary" type="button" onClick={() => {
                                    this.openList(value)
                                }}>&gt;</button>
                                <input type="text" className="form-control"
                                       defaultValue={value} id={index}/>
                                <button className="btn btn-secondary button_big_font" type="button" onClick={() => {
                                    this.deleteList(value)
                                }}>&times;</button>
                            </div>
                        )
                    }))}
                </div>
            </div>
        )
    }
}

export default ShopsList;