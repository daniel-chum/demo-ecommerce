import { useUI } from "../../ui/context";
import { useAuth } from "../../../lib/hooks/auth";
import UserMenu from "./UserMenu";
import s from "./UserNav.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserNav = ({ className, children, ...props }) => {
  const { openModal } = useUI();

  const { isAuthenticated, cart, user, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <UserMenu cart={cart} user={user} logout={logout}/>
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
