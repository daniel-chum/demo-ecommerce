import React from "react";
import cn from "classnames";
import s from "./Input.module.css"

const Input = (props) => {
  const { className, onChange, label, value, fullBorder, ...rest } = props;

  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  const borderStyle  = fullBorder ? 'border' : 'border-b'
  return (
    <div className={cn('flex flex-col-reverse font-rubik')}>
      <input
        className={cn('pl-1 outline-none font-light border-gray-300 focus:border-primary', borderStyle, className, s.input)}
        onChange={handleOnChange}
        value={value}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
      <label className='text-secondary-bright transition duration-300 ease-in-out'>{label}</label>
    </div>
  );
};

export default Input;
