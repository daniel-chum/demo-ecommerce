import { useUI } from "../../ui/context";
import { useAuth } from "../../../lib/hooks/auth";
import DropdownMenu from "../UserNav/DropdownMenu";
import { User } from "../../icons";
import s from "./UserNav.module.css";

const UserNav = ({ className, children, ...props }) => {
  const { openModal } = useUI();

  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu />
      ) : (
        <button
          className={s.user}
          aria-label="Menu"
          onClick={() => openModal()}
        >
          <User />
          SIGN IN
        </button>
      )}
    </>
  );
};

export default UserNav;
