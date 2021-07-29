import { useRef, useEffect, useCallback } from "react";
import Portal from "@reach/portal";
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
        <div className='fixed flex items-center inset-0 z-50 justify-center z-40 bg-gray-200 bg-opacity-40'>
          <div className={cn('bg-white p-12 border relative', width, height)} role="dialog" ref={ref}>
            {logo &&
              <Logo className='flex justify-center'/>
            }
            <button
              onClick={() => onClose()}
              aria-label="Close panel"
              className='focus:outline-none absolute right-0 top-0 m-6'
            >
              <FontAwesomeIcon icon={faTimesCircle} className='h-6 text-secondary-bright cursor-pointer' />
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
