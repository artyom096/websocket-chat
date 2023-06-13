import React from "react";

import { IButtonProps } from "../../utils/types";
import "./ButtonStyles.scss";

const Button: React.FC<IButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button onClick={onClick} className="button" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
