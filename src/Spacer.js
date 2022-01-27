const Spacer = ({height}) => {
    return (
        <div style={{height: height.toString() + "%"}}>

        </div>
    )
}

const MarginSpacer = ({height}) => {
    return (
        <div style={{height: "0", marginBottom: height.toString() + "%"}}/>
    )
}

export {
    Spacer,
    MarginSpacer
};