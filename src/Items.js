import {useRef, useState} from "react";
import Item from "./Item";
import {Backend} from "./Backend";
import {useParams} from "react-router-dom";
import {Navbar, ToggledContent} from "./Navbar";
import {disableIfEmpty, runOnEnter} from "./validation";

let PHONE_CODES = {"Bangladesh": "+880", "Belgium": "+32", "Burkina Faso": "+226", "Bulgaria": "+359", "Bosnia and Herzegovina": "+387", "Wallis and Futuna": "+681", "Saint Barthelemy": "+590", "Brunei": "+673", "Bolivia": "+591", "Bahrain": "+973", "Burundi": "+257", "Benin": "+229", "Bhutan": "+975", "Botswana": "+267", "Samoa": "+685", "Bonaire, Saint Eustatius and Saba ": "+599", "Brazil": "+55", "Belarus": "+375", "Belize": "+501", "Russia": "+7", "Rwanda": "+250", "Serbia": "+381", "East Timor": "+670", "Reunion": "+262", "Turkmenistan": "+993", "Tajikistan": "+992", "Romania": "+40", "Tokelau": "+690", "Guinea-Bissau": "+245", "Guatemala": "+502", "Greece": "+30", "Equatorial Guinea": "+240", "Guadeloupe": "+590", "Japan": "+81", "Guyana": "+592", "French Guiana": "+594", "Georgia": "+995", "United Kingdom": "+44", "Gabon": "+241", "El Salvador": "+503", "Guinea": "+224", "Gambia": "+220", "Greenland": "+299", "Gibraltar": "+350", "Ghana": "+233", "Oman": "+968", "Tunisia": "+216", "Jordan": "+962", "Croatia": "+385", "Haiti": "+509", "Hungary": "+36", "Hong Kong": "+852", "Honduras": "+504", "Venezuela": "+58", "Palestinian Territory": "+970", "Palau": "+680", "Portugal": "+351", "Svalbard and Jan Mayen": "+47", "Paraguay": "+595", "Iraq": "+964", "Panama": "+507", "French Polynesia": "+689", "Papua New Guinea": "+675", "Peru": "+51", "Pakistan": "+92", "Philippines": "+63", "Pitcairn": "+870", "Poland": "+48", "Saint Pierre and Miquelon": "+508", "Zambia": "+260", "Western Sahara": "+212", "Estonia": "+372", "Egypt": "+20", "South Africa": "+27", "Ecuador": "+593", "Italy": "+39", "Vietnam": "+84", "Solomon Islands": "+677", "Ethiopia": "+251", "Somalia": "+252", "Zimbabwe": "+263", "Saudi Arabia": "+966", "Spain": "+34", "Eritrea": "+291", "Montenegro": "+382", "Moldova": "+373", "Madagascar": "+261", "Saint Martin": "+590", "Morocco": "+212", "Monaco": "+377", "Uzbekistan": "+998", "Myanmar": "+95", "Mali": "+223", "Macao": "+853", "Mongolia": "+976", "Marshall Islands": "+692", "Macedonia": "+389", "Mauritius": "+230", "Malta": "+356", "Malawi": "+265", "Maldives": "+960", "Martinique": "+596", "Mauritania": "+222", "Uganda": "+256", "Tanzania": "+255", "Malaysia": "+60", "Mexico": "+52", "Israel": "+972", "France": "+33", "British Indian Ocean Territory": "+246", "Saint Helena": "+290", "Finland": "+358", "Fiji": "+679", "Falkland Islands": "+500", "Micronesia": "+691", "Faroe Islands": "+298", "Nicaragua": "+505", "Netherlands": "+31", "Norway": "+47", "Namibia": "+264", "Vanuatu": "+678", "New Caledonia": "+687", "Niger": "+227", "Norfolk Island": "+672", "Nigeria": "+234", "New Zealand": "+64", "Nepal": "+977", "Nauru": "+674", "Niue": "+683", "Cook Islands": "+682", "Ivory Coast": "+225", "Switzerland": "+41", "Colombia": "+57", "China": "+86", "Cameroon": "+237", "Chile": "+56", "Cocos Islands": "+61", "Canada": "+1", "Republic of the Congo": "+242", "Central African Republic": "+236", "Democratic Republic of the Congo": "+243", "Czech Republic": "+420", "Cyprus": "+357", "Christmas Island": "+61", "Costa Rica": "+506", "Curacao": "+599", "Cape Verde": "+238", "Cuba": "+53", "Swaziland": "+268", "Syria": "+963", "Sint Maarten": "+599", "Kyrgyzstan": "+996", "Kenya": "+254", "South Sudan": "+211", "Suriname": "+597", "Kiribati": "+686", "Cambodia": "+855", "Comoros": "+269", "Sao Tome and Principe": "+239", "Slovakia": "+421", "South Korea": "+82", "Slovenia": "+386", "North Korea": "+850", "Kuwait": "+965", "Senegal": "+221", "San Marino": "+378", "Sierra Leone": "+232", "Seychelles": "+248", "Kazakhstan": "+7", "Singapore": "+65", "Sweden": "+46", "Sudan": "+249", "Djibouti": "+253", "Denmark": "+45", "Germany": "+49", "Yemen": "+967", "Algeria": "+213", "United States": "+1", "Uruguay": "+598", "Mayotte": "+262", "United States Minor Outlying Islands": "+1", "Lebanon": "+961", "Laos": "+856", "Tuvalu": "+688", "Taiwan": "+886", "Turkey": "+90", "Sri Lanka": "+94", "Liechtenstein": "+423", "Latvia": "+371", "Tonga": "+676", "Lithuania": "+370", "Luxembourg": "+352", "Liberia": "+231", "Lesotho": "+266", "Thailand": "+66", "Togo": "+228", "Chad": "+235", "Libya": "+218", "Vatican": "+379", "United Arab Emirates": "+971", "Andorra": "+376", "Afghanistan": "+93", "Iceland": "+354", "Iran": "+98", "Armenia": "+374", "Albania": "+355", "Angola": "+244", "Argentina": "+54", "Australia": "+61", "Austria": "+43", "Aruba": "+297", "India": "+91", "Azerbaijan": "+994", "Ireland": "+353", "Indonesia": "+62", "Ukraine": "+380", "Qatar": "+974", "Mozambique": "+258"};
PHONE_CODES = Object.keys(PHONE_CODES).sort().reduce(
    (obj, key) => {
        obj[key] = PHONE_CODES[key];
        return obj;
    },
    {}
);

const Items = () => {
    const [items, setItems] = useState(null);
    const [country, setCountry] = useState(localStorage.getItem("countryDefault") || "United States");
    const addInputReference = useRef();
    const addButtonReference = useRef();
    const sendInputReference = useRef();
    const sendButtonReference = useRef();
    let {shopID} = useParams()
    const shopName = localStorage.getItem("shopName") || "error";

    if (document.title) {
        document.title = shopName + " shopping list";
    }

    if (items === null) {
        Backend.getItems(shopID, (res) => {
            setItems(res);
        })
    }

    const add = () => {
        if (addInputReference.current && addInputReference.current.value) {
            const value = addInputReference.current.value;
            addInputReference.current.value = "";
            setItems([...items, value]);
            Backend.createItem(shopID, value);
            addInputReference.current.focus();
            disableIfEmpty(addInputReference, addButtonReference)();
        }
    }

    const sendList = () => {
        const number = PHONE_CODES[country] + sendInputReference.current.value;
        localStorage.setItem("countryDefault", country);
        localStorage.setItem("phoneDefault", sendInputReference.current.value);
        Backend.sendList(shopID, shopName, number);
        console.log("NUMBER: " + number);
    }

    return (
        <>
            <Navbar>
                <a href={"/shop/" + shopID} className="navbar-brand">My <span className="text-danger">{shopName}</span> list</a>
                <ToggledContent>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/share">Share</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-md-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/shops">My Lists</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/signout">Sign Out</a>
                        </li>
                    </ul>
                </ToggledContent>
            </Navbar>

            <div className="container">
                <div className="input-group">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{country}</button>
                    <ul className="dropdown-menu">
                        {Object.keys(PHONE_CODES).map(item => {
                            return <button key={item} className="dropdown-item d-flex justify-content-between" type="button" onClick={() => {setCountry(item)}}>
                                <p>{item}</p>
                                <p className="lead">{PHONE_CODES[item]}</p>
                            </button>
                        })}
                    </ul>
                    <input ref={sendInputReference} onChange={disableIfEmpty(sendInputReference, sendButtonReference)} onKeyDown={runOnEnter(sendList)} className="form-control" placeholder="Phone number" type="tel" onKeyPress={(event) => {if (isNaN(event.key)) {event.preventDefault()}}} defaultValue={localStorage.getItem("phoneDefault") || ""}/>
                    <button ref={sendButtonReference} className="btn btn-primary disabled shadow-none" type="button" onClick={sendList}>Send List</button>
                </div>

                <hr/>

                <div className="input-group mb-2">
                    <input ref={addInputReference} onChange={disableIfEmpty(addInputReference, addButtonReference)} onKeyDown={runOnEnter(add)} type="text" className="form-control add_new" placeholder="Add new item" autoFocus={true} />
                    <button ref={addButtonReference} className="btn btn-primary disabled shadow-none" type="button" onClick={add}>+</button>
                </div>

                {items === null ? (
                    <p>Loading items...</p>
                ) : items.length === 0 ? (
                    <p>You do not have any items.</p>
                ) : (
                    items.map(((value, index) => {
                        return <Item key={value} listID={shopID} itemName={value} onDelete={() => {
                            const copy = [...items];
                            copy.splice(index, 1)
                            setItems(copy);
                        }
                        } onEdit={(newValue) => {
                            const copy = [...items];
                            copy[index] = newValue;
                            setItems(copy);
                        }} />
                    })))}
            </div>
        </>
    )
}

export default Items;