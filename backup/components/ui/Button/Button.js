import cn from "classnames";
import React, { forwardRef, useRef } from "react";
import mergeRefs from "react-merge-refs";

const Button = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = "flat",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    ...rest
  } = props;
  const ref = useRef(null);

  const rootClassName = cn(
    'cursor-pointer focus:outline-secondary bg-primary transition ease-in-out duration-150 font-semibold',
    {
      'py-2 transform-none normal-case': variant === "slim",
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
