import { useUI } from "../../ui/context";
import { useAuth } from "../../../lib/hooks/auth";
import DropdownMenu from "../UserNav/DropdownMenu";
import s from "./UserNav.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserNav = ({ className, children, ...props }) => {
  const { openModal } = useUI();

  const { isAuthenticated, cart, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu cart={cart} logout={logout}/>
      ) : (
        <button
          className={s.user}
          aria-label="Menu"
          onClick={() => openModal()}
        >
          <FontAwesomeIcon icon={faUser} className='h-5'/>
          SIGN IN
        </button>
      )}
    </>
  );
};

export default UserNav;
