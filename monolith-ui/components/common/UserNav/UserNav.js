import { useUI } from "../../ui/context";
import { useAuth } from "../../../lib/hooks/auth";
import DropdownMenu from "../UserNav/DropdownMenu";
import { User } from "../../icons";
import s from "./UserNav.module.css";

const UserNav = ({ className, children, ...props }) => {
  const { openModal } = useUI();

  const { isAuthenticated } = useAuth();

  return (
    <nav className={className}>
      <div>
        <ul>
          <li>
            {isAuthenticated ? (
              <DropdownMenu />
            ) : (
              <button
                className={s.user}
                aria-label="Menu"
                onClick={() => openModal()}
              >
                <User />
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNav;
