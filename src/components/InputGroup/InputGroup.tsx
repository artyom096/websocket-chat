import React from "react";

import { IInputGroupProps } from "../../utils/types";
import "./InputGroupStyles.scss";

const InputGroup: React.FC<IInputGroupProps> = ({
  name,
  value,
  type = "text",
  placeholder = name.toUpperCase(),
  onChange,
}) => {
  return (
    <div className="inputGroupContainer">
      <label htmlFor={name}>{name}</label>
      <input
        className="input"
        placeholder={placeholder}
        id={name}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputGroup;
