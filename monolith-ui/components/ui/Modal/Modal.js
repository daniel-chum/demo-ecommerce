import { useRef, useEffect, useCallback } from "react";
import Portal from "@reach/portal";
import s from "./Modal.module.css";
import { Cross, Logo } from "../../icons";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import cn from "classnames";

const Modal = ({ children, open, onClose, logo, width, height }) => {
  const ref = useRef();

  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") {
        return onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current);
        window.addEventListener("keydown", handleKey);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      clearAllBodyScrollLocks();
    };
  }, [open, handleKey]);

  return (
    <Portal>
      {open ? (
        <div className={s.root}>
          <div className={cn(s.modal, width, height)} role="dialog" ref={ref}>
            <div className={s.logo}>
              {logo ? <Logo width="56" height="56" /> : null}
            </div>
            <button
              onClick={() => onClose()}
              aria-label="Close panel"
              className={s.button}
            >
              <Cross className="h-6 w-6" />
            </button>
            {children}
          </div>
        </div>
      ) : null}
    </Portal>
  );
};

export default Modal;
