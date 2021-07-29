import { useState } from "react";

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
  const [message, setMessage] = useState("");

  const { signUp } = useAuth();
  const { setModalView, closeModal } = useUI();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      setMessage("");
      await signUp({
        username: username,
        email: '',
        first_name: firstName,
        last_name: lastName,
        password: password,
        password2: password2
      });
      closeModal();
    } catch ( errors ) {
      let errorMessage = JSON.stringify(errors.response.data).replace(/[{"}]/g,"").replace(":", ": ").replace("password2", "Confirm Password")
      setMessage(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSignup} className="w-96 pt-6 px-3 font-rubik">
      <div className="relative flex flex-col space-y-4">
        {message && (
          <div className="text-black border border-primary p-3">{message}</div>
        )}
        <Input
          type="username"
          label="Username"
          onChange={setUsername}
        />
        <Input
          type="password"
          label="Password"
          onChange={setPassword}
        />
        <Input
          type="password"
          label="Confirm Password"
          onChange={setPassword2}
        />
        <Input
          label="First Name (Optional)"
          onChange={setFirstName}
        />
        <Input
          label="Last Name (Optional)"
          onChange={setLastName}
        />
        <Button
          variant="slim"
          type="submit"
        >
          Sign Up
        </Button>
        <span className="pt-1 text-center text-sm">
          <span className="text-gray-800">Do you have an account?</span>
          {` `}
          <a
            className="font-bold hover:underline cursor-pointer"
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
