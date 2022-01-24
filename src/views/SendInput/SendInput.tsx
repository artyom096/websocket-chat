import React from "react";
import "./SendInputStyles.scss"
import Button from "../../components/Button";

const SendInput = () => {
    return (
        <div className="SendInputContainer">
            <textarea cols={3} className="SendInput" />
            <Button>Отправить</Button>
        </div>
    )
}

export default SendInput