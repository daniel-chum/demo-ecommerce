import { useEffect, useState, useCallback } from "react";
import { Info } from "../icons/";
import { useUI } from "../../components/ui/context";
import { Button, Input } from "../../components/ui";
import { useAuth } from "../../lib/hooks/auth";

const SignUpView = () => {
  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { signup } = useAuth();
  const { setModalView, closeModal } = useUI();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }

    try {
      setLoading(true);
      setMessage("");
      await signup({
        username,
        firstName,
        lastName,
        password,
      });
      setLoading(false);
      closeModal();
    } catch ({ errors }) {
      setMessage(errors[0].message);
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
    <form onSubmit={handleSignup} className="w-80 px-3">
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-red border border-red p-3">{message}</div>
        )}
        <Input placeholder="First Name" onChange={setFirstName} />
        <Input placeholder="Last Name" onChange={setLastName} />
        <Input type="username" placeholder="Username" onChange={setUsername} />
        <Input type="password" placeholder="Password" onChange={setPassword} />
        <span className="text-accents-8">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" className="text-gray-800" />
          </span>{" "}
          <span className="text-gray-800 text-sm">
            <strong>Info</strong>: Passwords must be longer than 7 chars and
            include numbers.{" "}
          </span>
        </span>
        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Sign Up
        </Button>
        <span className="pt-1 text-center text-sm">
          <span className="text-gray-800">Do you have an account?</span>
          {` `}
          <a
            className="text-gray-800 font-bold hover:underline cursor-pointer"
            onClick={() => setModalView("LOGIN_VIEW")}
          >
            Log In
          </a>
        </span>
      </div>
    </form>
  );
};

export default SignUpView;
