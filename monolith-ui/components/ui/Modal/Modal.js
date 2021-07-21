import { useRef, useEffect, useCallback } from "react";
import Portal from "@reach/portal";
import s from "./Modal.module.css";
import { Logo } from "../../icons";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import cn from "classnames";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'


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
            {logo ? (
              <div className={s.logo}>
                <Logo width="56" height="56" />
              </div>
            ) : null}
            <button
              onClick={() => onClose()}
              aria-label="Close panel"
              className={s.button}
            >
              <FontAwesomeIcon icon={faTimesCircle} className='h-6 text-gray-600 cursor-pointer' />
            </button>
            {children}
          </div>
        </div>
      ) : null}
    </Portal>
  );
};

export default Modal;

// {logo ? <Logo width="56" height="56" /> : null}
