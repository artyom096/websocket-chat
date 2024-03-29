import React from "react";

import { IButtonProps } from "utils/types";

import styles from "./ButtonStyles.module.scss";

export const Button: React.FC<IButtonProps> = ({
  children,
  disabled,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
};
