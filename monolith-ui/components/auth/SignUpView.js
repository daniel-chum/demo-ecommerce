import { useEffect, useState, useCallback } from "react";
import { Info } from "../icons/";
import { useUI } from "../../components/ui/context";
import { Button, Input } from "../../components/ui";
import { useAuth } from "../../lib/hooks/auth";

const SignUpView = () => {
  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { signUp } = useAuth();
  const { setModalView, closeModal } = useUI();

  const handleSignup = async (e) => {
    e.preventDefault();

    // if (!dirty && !disabled) {
    //   setDirty(true);
    //   handleValidation();
    // }

    try {
      setLoading(true);
      setMessage("");
      await signUp({
        username: username,
        email: '',
        first_name: firstName,
        last_name: lastName,
        password: password,
        password2: password2
      });
      setLoading(false);
      closeModal();
    } catch ( errors ) {
      let errorMessage = JSON.stringify(errors.response.data)
      setMessage(errorMessage);
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
    <form onSubmit={handleSignup} className="w-96 px-3">
      <div className="flex flex-col space-y-4">
        {message && (
          <div className="text-black border border-primary p-3">{message}</div>
        )}
        <Input
          type="username"
          placeholder="Username"
          className="w-full"
          onChange={setUsername}
        />
        <Input
          type="password"
          placeholder="Password"
          className="w-full"
          onChange={setPassword}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          className="w-full"
          onChange={setPassword2}
        />
        <Input
          placeholder="Optional: First Name"
          className="w-full"
          onChange={setFirstName}
        />
        <Input
          placeholder="Optional: Last Name"
          className="w-full"
          onChange={setLastName}
        />
        {/* <span className="text-accents-8">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" className="text-gray-800" />
          </span>{" "}
          <span className="text-gray-800 text-sm">
            <strong>Info</strong>: Passwords must be longer than 7 chars and
            include numbers.{" "}
          </span>
        </span> */}
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
