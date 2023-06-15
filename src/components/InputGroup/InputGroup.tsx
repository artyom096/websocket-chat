import React from "react";

import { IInputGroupProps } from "utils/types";

import styles from "./InputGroupStyles.module.scss";

export const InputGroup: React.FC<IInputGroupProps> = ({
  name,
  value,
  type = "text",
  placeholder = name.toUpperCase(),
  onChange,
}) => {
  return (
    <div className={styles.inputGroupContainer}>
      <label htmlFor={name}>{name}</label>
      <input
        className={styles.input}
        placeholder={placeholder}
        id={name}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
