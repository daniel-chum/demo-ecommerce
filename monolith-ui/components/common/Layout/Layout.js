import cn from "classnames";
import dynamic from "next/dynamic";
import s from "./Layout.module.css";
import { useUI } from "../../../components/ui/context";
import Navbar from "../../common/Navbar/Navbar";
import { Modal, LoadingDots } from "../../ui";

import LoginView from "../../../components/auth/LoginView";

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: () => <Loading />,
};

const SignUpView = dynamic(
  () => import("../../../components/auth/SignUpView"),
  dynamicProps
);

// const ForgotPassword = dynamic(
//   () => import("@components/auth/ForgotPassword"),
//   dynamicProps
// );

const Layout = ({ children }) => {
  const { displayModal, closeModal, modalView } = useUI();

  return (
    <div className={cn(s.root)}>
      <Navbar />
      <main className="fit">{children}</main>

      <Modal logo={true} open={displayModal} onClose={closeModal}>
        {modalView === "LOGIN_VIEW" && <LoginView />}
        {modalView === "SIGNUP_VIEW" && <SignUpView />}
        {modalView === "FORGOT_VIEW" && <ForgotPassword />}
      </Modal>
    </div>
  );
};

export default Layout;
