import { useEffect, useState, useCallback } from "react";
import { Button, Input } from "../ui";
import { useUI } from "../ui/context";
import { useAuth } from "../../lib/hooks/auth";

const LoginView = () => {
  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { setModalView, closeModal } = useUI();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }

    try {
      setLoading(true);
      setMessage("");
      await login(username, password);
      setLoading(false);
      closeModal();
    } catch (errors) {
      console.log(errors.response);
      setMessage(errors.response.data.detail);
      setLoading(false);
    }
  };

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(password.length < 7 || !validPassword);
    }
  }, [password, dirty]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <form
      onSubmit={handleLogin}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex justify-center pb-12 ">Logo</div>
      <div className="flex flex-col space-y-3">
        {message && (
          <div className="text-red border border-red p-3">
            {message}. Did you {` `}
            <a
              className="text-accent-9 inline font-bold hover:underline cursor-pointer"
              onClick={() => setModalView("FORGOT_VIEW")}
            >
              forgot your password?
            </a>
          </div>
        )}
        <Input
          type="text"
          placeholder="Username"
          onChange={setUsername}
          value={username}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={setPassword}
          value={password}
        />

        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Log In
        </Button>
        <div className="pt-1 text-center text-sm">
          <span className="text-accents-7">Don't have an account?</span>
          {` `}
          <a
            className="text-accent-9 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView("SIGNUP_VIEW")}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginView;
