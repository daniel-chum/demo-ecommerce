import cn from "classnames";
import React, { forwardRef, useRef } from "react";
import mergeRefs from "react-merge-refs";
import s from "./Button.module.css";
import { LoadingDots } from "../../ui";

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
    s.root,
    {
      [s.slim]: variant === "slim",
      [s.loading]: loading,
      [s.disabled]: disabled,
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
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </button>
  );
});

export default Button;
