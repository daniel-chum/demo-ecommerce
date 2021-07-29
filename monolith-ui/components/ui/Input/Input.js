import React from "react";
import cn from "classnames";
import s from "./Input.module.css"

const Input = (props) => {
  const { className, onChange, label, value, ...rest } = props;

  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('flex flex-col-reverse font-rubik', className)}>
      <input
        className={cn('pl-1 outline-none font-light border-b border-gray-300 focus:border-primary', s.input)}
        onChange={handleOnChange}
        value={value}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
      <label className='pl-1 text-secondary-bright transition duration-300 ease-in-out'>{label}</label>
    </div>
  );
};

export default Input;
