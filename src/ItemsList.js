import {Component, createRef} from "react";
import sendRequest from "./requests";
import {useParams, withRouter} from "react-router-dom";

class ItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemNames: null,
            inputInsideState: {},
            shop: props.match.params.name
        }
        this.onClick = this.onClick.bind(this);
        this.addRef = createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        for (let i = 0; i < this.state.itemNames.length; i++) {
            this.processInput(i);
        }
    }

    componentDidMount() {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/item/get", {shop: this.state.shop}, (res) => {
            this.setState({
                itemNames: JSON.parse(JSON.parse(res).body)
            });
        }, window.location.href);
        document.addEventListener("click", this.onClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.onClick);
    }

    deleteList(listName) {
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/item/delete", {
            shop: this.state.shop,
            item: listName
        }, (res) => {
            const copy = [...this.state.itemNames];
            const index = copy.indexOf(listName);
            if (index > -1) {
                copy.splice(index, 1);
            }
            this.setState({
                itemNames: copy
            })
        }, window.location.href);
    }

    saveList(input) {
        const new_val = input.value;
        const old_val = this.state.itemNames[input.id];
        if (new_val !== old_val) {
            sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/item/edit", {
                shop: this.state.shop,
                item: old_val,
                new_item: new_val
            }, (res) => {
                const copy = [...this.state.itemNames];
                const index = copy.indexOf(old_val);
                if (index !== -1) {
                    copy[index] = new_val;
                }
                this.setState({
                    itemNames: copy
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
        sendRequest("https://o0rqxrd4al.execute-api.us-east-1.amazonaws.com/Prod/item/add", {
            shop: this.state.shop,
            item: val
        }, (res) => {
            this.setState({
                itemNames: [...this.state.itemNames, val]
            });
            this.addRef.current.value = "";
        }, window.location.href);
    }

    render() {
        if (this.state.itemNames === null) {
            return (
                <div>
                    <p>Loading items...</p>
                </div>
            )
        }

        return (
            <div className="w-100">
                <div className="navbar navbar-expand-lg navbar-light bg-light mb-lg-5">
                    <div className="container">
                        <a className="navbar-brand">My {this.state.shop} shopping list</a>
                        <ul className="navbar-nav ms-md-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/lists">Back to my lists</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="form-group m-auto w-50">
                    <div className="input-group mb-2">
                        <input ref={this.addRef} type="text" className="form-control add_new" placeholder="Add new item"/>
                        <button className="btn btn-primary" type="button" onClick={() => {
                            this.add()
                        }}>+
                        </button>
                    </div>

                    {this.state.itemNames.map(((value, index) => {
                        return (
                            <div className="input-group mb-2" key={value}>
                                <input type="text" className="form-control" defaultValue={value} id={index}/>
                                <button className="btn btn-secondary" type="button" onClick={() => {
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

export default withRouter(ItemsList);