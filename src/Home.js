import {useEffect, useRef, useState} from "react";
import {Spacer} from "./Spacer";
import {useFitText} from "./util/ReactUtil";
import setDocumentTitle from "./util/DocumentTitle";
import {sendToLogin} from "./util/Backend";

const Home = () => {
    setDocumentTitle("Shopping Lists");

    useEffect(() => {
        window.requestAnimationFrame(() => {document.body.style.height = "100vh";});
        document.body.classList.add("bg-primary");
        return () => {
            document.body.classList.remove("bg-primary");
            window.requestAnimationFrame(() => {document.body.style.removeProperty("height");});
        }
    }, []);

    return (
        <>
            <Home3 beenHere={localStorage.getItem("beenHere")}/>
        </>
    )
}

const Home3 = ({beenHere}) => {
    const [ref] = useState(useRef());
    const [ref1] = useState(useRef());
    const [ref2] = useState(useRef());
    const getFontSize = useFitText(ref, 25);
    const getFontSize1 = useFitText(ref1, 35);
    const getFontSize2 = useFitText(ref2, 55, false);

    const login = () => {
        sendToLogin("/shops");
    }

    return (
        <>
            <Spacer height={30}/>
            <div style={{height: "15%", display: "flex", alignItems: "center"}}>
                <h1 ref={ref} style={{margin: "auto", color: "black", fontSize: getFontSize()}}>Keep track of everything you need to buy from any device!</h1>
            </div>
            <div style={{height: "15%", display: "flex", alignItems: "center"}}>
                <h2 ref={ref1} style={{margin: "auto", color: "black", fontSize: getFontSize1()}}>Send lists by text message to anybody quickly and easily!</h2>
            </div>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <button ref={ref2} style={{margin: "auto", padding: (getFontSize2() / 2) + "px", fontSize: getFontSize2() + "px", borderRadius: (getFontSize2() / 75) + "rem"}} className={"btn btn-primary animate__animated animate__fadeIn"} onClick={login}>{beenHere ? "Login" : "Get started now"}</button>
            </div>
            <Spacer height={20}/>
        </>
    )
}

export default Home;