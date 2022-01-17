import {useEffect, useState} from "react";

const Footer = () => {
    const [visible, setVisible] = useState(false);
    let lastScrollTop = 0;

    const onScroll = () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop){
            setVisible(false);
        } else {
            if (window.scrollY === 0) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        }
        lastScrollTop = st <= 0 ? 0 : st;
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
                    {visible ? <button className="scroll-top btn btn-primary rounded-pill" onClick={() => {window.scrollTo(0, 0)}}>Back to top</button> : <></>}
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