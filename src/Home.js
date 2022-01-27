import {useEffect, useRef, useState} from "react";
import {sendToLogin} from "./util/Backend";
import {Spacer, MarginSpacer} from "./Spacer";
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
    return (
        <>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <h1 style={{margin: "auto", color: "white"}} className="animate__animated animate__fadeIn">Keep track of everything you need to buy from any device!</h1>
            </div>
            <div style={{height: "60%", display: "flex", alignItems: "center"}}>
                <img style={{margin: "auto", maxHeight: "100%", maxWidth: "95%"}} className="animate__animated animate__fadeIn" src="/listdemo.png" alt="Shops Demo" />
            </div>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>

            </div>
        </>
    )
}

const Home2 = () => {
    return (
        <>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <h1 style={{margin: "auto", color: "white"}}>Keep track of everything you need to buy from any device!</h1>
            </div>
            <div style={{height: "60%", display: "flex", alignItems: "center"}}>
                <img style={{margin: "auto", maxHeight: "100%", maxWidth: "95%"}} className="animate__animated animate__fadeIn" src="/senddemo.png" alt="Send Demo" />
            </div>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <h2 style={{margin: "auto", color: "white"}} className="animate__animated animate__fadeIn">Send lists by text message to anybody quickly and easily!</h2>
            </div>
        </>
    )
}

const Home3 = ({beenHere}) => {
    const ref = useRef();
    const ref1 = useRef();
    const getFontSize = useFitText(ref, 25);
    const getFontSize1 = useFitText(ref1, 35);

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
            <Spacer height={35}/>
            <div style={{height: "10%", display: "flex", alignItems: "center"}}>
                <h1 ref={ref} style={{margin: "auto", color: "black", maxHeight: "100%", fontSize: getFontSize()}}>Keep track of everything you need to buy from any device!</h1>
            </div>
            <div style={{height: "10%", display: "flex", alignItems: "center"}}>
                <h2 ref={ref1} style={{margin: "auto", color: "black", maxHeight: "100%", fontSize: getFontSize1()}}>Send lists by text message to anybody quickly and easily!</h2>
            </div>
            <div style={{height: "10%", display: "flex", alignItems: "center"}}>
                <button style={{margin: "auto"}} className={"btn btn-primary btn-lg animate__animated animate__fadeIn"} onClick={() => {sendToLogin("/shops")}}>{beenHere ? "Login" : "Get started now"}</button>
            </div>
            <Spacer height={35}/>
        </>
    )
}

export default Home;