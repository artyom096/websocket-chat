import React from "react"
import { IInputGroupProps } from "../../utils/types"
import "./InputGroupStyles.scss"

const InputGroup: React.FC<IInputGroupProps> = ({type = "text", name, onChange, value, placeholder = name.toUpperCase()}) => {
    return (
        <div className="InputGroupContainer">
            <label htmlFor={name}>
                {name}
            </label>
            <input
                className="Input"
                placeholder={placeholder}
                id={name}
                type={type}
                onChange={onChange}
                value={value}/>
        </div>
    )
}

export default InputGroup