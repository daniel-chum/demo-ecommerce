import dynamic from "next/dynamic";
import { useUI } from "../../../components/ui/context";
import Navbar from "../../common/Navbar/Navbar";
import Footer from "../../common/Footer/Footer";
import { Modal } from "../../ui";

import LoginView from "../../../components/auth/LoginView";

const SignUpView = dynamic(
  () => import("../../../components/auth/SignUpView"),
);

// const ForgotPassword = dynamic(
//   () => import("@components/auth/ForgotPassword"),
//   dynamicProps
// );

const Layout = ({ children }) => {
  const { displayModal, closeModal, modalView } = useUI();

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Modal logo={true} open={displayModal} onClose={closeModal}>
        {modalView === "LOGIN_VIEW" && <LoginView />}
        {modalView === "SIGNUP_VIEW" && <SignUpView />}
        {modalView === "FORGOT_VIEW" && <ForgotPassword />}
      </Modal>
    </div>
  );
};

export default Layout;
