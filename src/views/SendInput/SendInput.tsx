import React from "react";
import "./SendInputStyles.scss"
import Button from "../../components/Button";

interface ISendInputProps {
    value: string;
    onClick: () => void;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const SendInput: React.FC<ISendInputProps> = ({onClick, onChange, value}) => {
    return (
        <div className="SendInputContainer">
            <textarea value={value} onChange={onChange} cols={3} className="SendInput" />
            <Button onClick={onClick}>Отправить</Button>
        </div>
    )
}

export default SendInput