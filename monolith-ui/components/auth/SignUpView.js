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

  const { signUp } = useAuth();
  const { setModalView, closeModal } = useUI();

  const handleSignup = async (e) => {
    e.preventDefault();

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
        <Button
          variant="slim"
          type="submit"
          loading={loading}
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
