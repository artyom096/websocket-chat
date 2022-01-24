import React from "react";
import "./ButtonStyles.scss"

interface IButtonProps {
    children: React.ReactChild | string;
    disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({children, disabled}) => {
    return (
        <button className="Button" disabled={disabled}>
            {children}
        </button>
    )
}

export default Button