import React from "react";
import "./SendInputStyles.scss";
import Button from "../../components/Button";
import { ISendInputProps } from "../../utils/types";

const SendInput: React.FC<ISendInputProps> = ({
  onClick,
  onChange,
  onKeyPress,
  value,
}) => {
  return (
    <div className="sendInputContainer">
      <textarea
        onKeyPress={onKeyPress}
        value={value}
        onChange={onChange}
        cols={3}
        className="sendInput"
      />
      <Button onClick={onClick}>Отправить</Button>
    </div>
  );
};

export default SendInput;
