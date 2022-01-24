import Cleave from 'cleave.js/react';


const PhoneInput = (props) => {
    const update = (event) => {
        const isValid = event.target.rawValue.length === 10;
        props.setValid(isValid);
        if (isValid) {
            props.setPhoneNumber(event.target.rawValue);
        }
    };

    return (
        <>
            <Cleave options={{
                blocks: [3, 3, 4],
                delimiters: [" ", "-"],
                numericOnly: true
            }} className={props.className} placeholder={props.placeholder} onChange={update} type="tel" value={props.children}/>
        </>
    )
}

export default PhoneInput;