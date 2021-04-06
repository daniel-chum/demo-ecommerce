import cn from "classnames";
import s from "./Input.module.css";
import React from "react";

const Input = (props) => {
  const { className, onChange, label, value, ...rest } = props;

  const rootClassName = cn(s.container, {}, className);

  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={rootClassName}>
      <input
        className={s.input}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
      <label className={s.label}>{label}</label>
    </div>
  );
};

export default Input;
