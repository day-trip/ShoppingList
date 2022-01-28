import {useEffect, useRef, useState} from "react";
import {sendToLogin} from "./util/Backend";
import {Spacer} from "./Spacer";
import {useFitText} from "./util/ReactUtil";

const Home = () => {
    const [pagePart, setPagePart] = useState(localStorage.getItem("beenHere") ? 2 : 0);

    useEffect(() => {
        window.requestAnimationFrame(() => {document.body.style.height = "100vh";});
        return () => {
            document.body.classList.remove("bg-primary");
            window.requestAnimationFrame(() => {document.body.style.removeProperty("height");});
        }
    }, []);

    useEffect(() => {
        if (pagePart === 0) {
            document.body.classList.add("bg-primary");
            setTimeout(() => {setPagePart(1)}, 2700);
            setTimeout(() => {setPagePart(2)}, 6750);
        }
        if (pagePart === 2) {
            document.body.classList.remove("bg-primary");
        }
    }, [pagePart]);

    return (
        <>
            {pagePart === 0 ? (
                <Home1/>
            ) : (pagePart === 1 ? (
                <Home2/>
            ) : (
                <Home3 beenHere={localStorage.getItem("beenHere")}/>
            ))}
        </>
    )
}

const Home1 = () => {
    const ref = useState(useRef());
    const getFontSize = useFitText(ref, 25);

    return (
        <>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <h1 ref={ref} style={{margin: "auto", color: "white", fontSize: getFontSize()}} className="animate__animated animate__fadeIn">Keep track of everything you need to buy from any device!</h1>
            </div>
            <div style={{height: "60%", display: "flex", alignItems: "center"}}>
                <img style={{margin: "auto", maxHeight: "100%", maxWidth: "100%"}} className="animate__animated animate__fadeIn" src="/listdemo.png" alt="Shops Demo" />
            </div>
            <Spacer height={20}/>
        </>
    )
}

const Home2 = () => {
    const ref = useState(useRef());
    const ref1 = useState(useRef());
    const getFontSize = useFitText(ref, 25);
    const getFontSize1 = useFitText(ref1, 35);

    return (
        <>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <h1 ref={ref} style={{margin: "auto", color: "white", fontSize: getFontSize()}}>Keep track of everything you need to buy from any device!</h1>
            </div>
            <div style={{height: "60%", display: "flex", alignItems: "center"}}>
                <img style={{margin: "auto", maxHeight: "100%", maxWidth: "100%"}} className="animate__animated animate__fadeIn" src="/senddemo.png" alt="Send Demo" />
            </div>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <h2 ref={ref1} style={{margin: "auto", color: "white", fontSize: getFontSize1()}} className="animate__animated animate__fadeIn">Send lists by text message to anybody quickly and easily!</h2>
            </div>
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

    /*return (
        <div style={{height: "100%", width: "100%", display: "table"}}>
            <div style={{display: "table-cell", height: "100%", verticalAlign: "middle", textAlign: "center"}} className="debug">
                <h1>Keep track of everything you need to buy from any device!</h1>
                <MarginSpacer height={7}/>
                <h2>Send lists by text message to anybody quickly and easily!</h2>
                <MarginSpacer height={11}/>
                <button className="btn btn-primary btn-lg animate__animated animate__fadeIn" onClick={() => {sendToLogin("/shops")}}>{beenHere ? "Login" : "Get started now"}</button>
            </div>
        </div>
    )*/

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
                <button ref={ref2} style={{margin: "auto", padding: (getFontSize2() / 2) + "px", fontSize: getFontSize2() + "px", borderRadius: (getFontSize2() / 75) + "rem"}} className={"btn btn-primary animate__animated animate__fadeIn"} onClick={() => {sendToLogin("/shops")}}>{beenHere ? "Login" : "Get started now"}</button>
            </div>
            <Spacer height={20}/>
        </>
    )
}

export default Home;