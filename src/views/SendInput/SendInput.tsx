import React from "react";

import { ISendInputProps } from "utils/types";
import { Button } from "components/Button";

import styles from "./SendInputStyles.module.scss";

export const SendInput: React.FC<ISendInputProps> = ({
  onClick,
  onChange,
  onKeyPress,
  value,
}) => {
  return (
    <div className={styles.sendInputContainer}>
      <textarea
        onKeyPress={onKeyPress}
        value={value}
        onChange={onChange}
        cols={3}
        className={styles.sendInput}
      />
      <Button onClick={onClick}>Отправить</Button>
    </div>
  );
};
