import React from "react";
import "./ButtonStyles.scss"

interface IButtonProps {
    children: React.ReactChild | string;
    disabled?: boolean;
    onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({children, disabled, onClick}) => {
    return (
        <button onClick={onClick} className="Button" disabled={disabled}>
            {children}
        </button>
    )
}

export default Button