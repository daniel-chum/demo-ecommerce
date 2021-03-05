import Link from "next/link";
import cn from "classnames";
import { useUI } from "../../ui/context";
import s from "./UserNav.module.css";
import { useAuth } from "../../../lib/hooks/auth";
import DropdownMenu from "../UserNav/DropdownMenu";

const UserNav = ({ className, children, ...props }) => {
  const { openModal } = useUI();

  const { isAuthenticated } = useAuth();

  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <li className={s.item}>
            {isAuthenticated ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.avatarButton}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                Avatar
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNav;
