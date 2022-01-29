import React from "react";
import "./SendInputStyles.scss"
import Button from "../../components/Button";
import { ISendInputProps } from "../../utils/types";

const SendInput: React.FC<ISendInputProps> = ({onClick, onChange, onKeyPress, value}) => {
    return (
        <div className="SendInputContainer">
            <textarea onKeyPress={onKeyPress} value={value} onChange={onChange} cols={3} className="SendInput" />
            <Button onClick={onClick}>Отправить</Button>
        </div>
    )
}

export default SendInput