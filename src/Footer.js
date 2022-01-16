import {useEffect, createRef} from "react";

const Footer = () => {
    const topReference = createRef();
    let lastScrollTop = 0;

    const onScroll = () => {
        console.log("here1")
        if (topReference.current) {
            console.log("here2")
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop){
                console.log("down")
                topReference.current.classList.remove("invisible");
            } else {
                console.log("up")
                topReference.current.classList.add("invisible");
            }
            lastScrollTop = st <= 0 ? 0 : st;
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    return (
        <div className="mt-footer container">
            <div className="d-flex justify-content-end">
                {/*<div>
                        <p>Made by <a href="https://jcc.lol">DayTrip</a>.</p>
                    </div>*/}
                <div>
                    <a className="invisible" href="#top" ref={topReference}>Back to top</a>
                </div>
            </div>
        </div>
    )
}

/*const Footer = () => {
    return (
        <div className="mt-footer container">
            <div className="d-flex justify-content-end">
                {/!*<div>
                    <p>Made by <a href="https://jcc.lol">DayTrip</a>.</p>
                </div>*!/}
                <div>
                    <a className="float-end" href="#top">Back to top</a>
                </div>
            </div>
        </div>
    )
}*/

export default Footer;