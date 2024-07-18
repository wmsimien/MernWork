import { useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";

import { setCredentials } from "../../state/auth/authActions";
import AuthContext from "../../context/AuthContext";

//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const clientRef = useRef();
  const errRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const clientSignIn = useSelector((state) => state.clientSignInReducer);

  const errClass = errMsg ? "errmsg" : "offscreen";

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setCredentials(username, password));
      setUsername("");
      setPassword("");
      await getLoggedIn();

      navigate("/", { state: { username, password } });
    } catch (error) {
      if (!error.status) {
        setErrMsg("No server response");
      } else if (error.status === 400) {
        setErrMsg(
          "Client usernane and password are required login credentials."
        );
      } else if (error.status === 401) {
        setErrMsg("Unauthorized.");
        return toast.error(`Not Authorized`, {
          position: "top-center",
        });
      } else {
        setErrMsg(error.data?.message);
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    // set focus on username field
    clientRef.current.focus();
  }, []);

  useEffect(() => {
    // clear error message
    setErrMsg("");
  }, [username, password]);

  return (
    <div className="loginContainer">
      <div className="header">
        <div className="text">Sign In</div>
        <div className="underline"></div>
      </div>
      {/* when error message has focus, screen reader will be able to read message  */}
      <p ref={errRef} className={errClass} aria-live="assertive">
        {errMsg}
      </p>
      <div className="inputs">
        {/* <label htmlFor="user">Username</label> */}
        <div className="input">
          {/* <img src='' alt=''/> */}
          <input
            type="text"
            id="username"
            ref={clientRef}
            autoComplete="off"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* <label htmlFor="password">Password</label> */}
        <div className="input">
          {/* <img src='' alt=''/> */}
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={submitHandler}>
          SignIn
        </button>
      </div>
      <div className="forgot-password">
        <span>
          New user ? <Link to="/register">SignUp Here</Link>
        </span>
        <span>
          Or go Home <Link to="/">Home</Link>
        </span>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Login;
