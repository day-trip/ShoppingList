import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import {sendToLogin} from "./util/Backend";

const Home = () => {
    const [pagePart, setPagePart] = useState(0);

    useEffect(() => {
        document.body.classList.add("bg-primary");
        document.body.style.height = "100vh";
        setTimeout(() => {setPagePart(1)}, 2700)
        setTimeout(() => {setPagePart(2)}, 6750)
        return () => {
            document.body.classList.remove("bg-primary");
            document.body.style.removeProperty("height");
        }
    }, []);

    useEffect(() => {
        if (pagePart === 2) {
            document.body.classList.remove("bg-primary");
        }
    }, [pagePart]);

    if (localStorage.getItem("beenHere")) {
        return (
            <Redirect to="/shops"/>
        )
    }

    return (
        <>
            {pagePart === 0 ? (
                <Home1/>
            ) : (pagePart === 1 ? (
                <Home2/>
            ) : (
                <Home3/>
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

const Home3 = () => {
    return (
        <>
            <div style={{height: "10%", display: "flex", alignItems: "center"}}>

            </div>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <h1 style={{margin: "auto", color: "black"}}>Keep track of everything you need to buy from any device!</h1>
            </div>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <h2 style={{margin: "auto", color: "black"}}>Send lists by text message to anybody quickly and easily!</h2>
            </div>
            <div style={{height: "20%", display: "flex", alignItems: "center"}}>
                <button style={{margin: "auto"}} className="btn btn-primary btn-lg animate__animated animate__fadeIn" onClick={() => {sendToLogin("/shops")}}>Get started now</button>
            </div>
            <div style={{height: "30%", display: "flex", alignItems: "center"}}>

            </div>
        </>
    )
}

export default Home;