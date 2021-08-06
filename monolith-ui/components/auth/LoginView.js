import { useState } from "react";
import { Button, Input } from "../ui";
import { useUI } from "../ui/context";
import { useAuth } from "../../lib/hooks/auth";

import { PopUp } from "../../components/ui";

const LoginView = () => {
  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setModalView, closeModal } = useUI();
  const { logIn } = useAuth();

  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      setMessage("");
      await logIn(username, password);
      closeModal();
    } catch (errors) {
      console.log(errors.response);
      setMessage(errors.response.data.detail);
      setUsername("");
      setPassword("");
    } finally { setLoading(false) }
  };

  return (
    <div className='flex flex-col justify-between px-3 pt-6 w-72 font-rubik'>
      <form onSubmit={handleLogin} className="contents">
        <div className="flex flex-col space-y-3">
          {message && (
            <div className="text-black border p-3">
              {message}. Did you {` `}
              <a
                className="text-red-600 inline font-bold hover:underline cursor-pointer"
                // onClick={() => setModalView("FORGOT_VIEW")}
              >
                forget your password?
              </a>
            </div>
          )}
          <Input
            type="text"
            label='Username'
            onChange={setUsername}
            value={username}

          />
          <Input
            type="password"
            label="Password"
            onChange={setPassword}
            value={password}
            className='pb-2'
          />

          <Button
            variant="slim"
            type="submit"
          >
            Sign In
          </Button>
          <div className="pt-1 text-center text-sm">
            <span className="text-gray-500">Don't have an account?</span>
            {` `}
            <a
              className="font-bold hover:underline cursor-pointer"
              onClick={() => setModalView("SIGNUP_VIEW")}
            >
              Sign Up
            </a>
          </div>
        </div>
      </form>
      <PopUp display={loading} loader={true}>
        <span className='animate-pulse'>PROCESSING ...</span>
      </PopUp>
    </div>
  );
};

export default LoginView;
