import { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/users-slice";
import { AppDispatch, RootState } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [verifiedError, setVerifiedError] = useState<string>("");
  const errorMessage = useSelector((state: RootState) => state.users.errorLogin);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const payl = useSelector((state: RootState) => state.users.payl);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
      if (
        payl !== null &&
        payl?.is_verified === 1 &&
        !errorMessage &&
        !storedUser
        ) {
          localStorage.setItem("user", JSON.stringify(payl));
          navigate(-1);
        } else if (payl?.is_verified === 0  && !errorMessage && !storedUser) {
        setVerifiedError("Confirm Email Verification");
      }

  }, [payl, navigate, errorMessage]);

  function loginUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(login({ user })).then(()=>{
      setUser({ email: "", password: "" });
    })

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerifiedError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [verifiedError]);

  return (
    <div className="form-bd">
      <div className="form-wrapper">
        <div className="form-container">
          <h1>Log In</h1>
          <form onSubmit={loginUser}>
            <div className="form-control">
              <input
                type="text"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
                value={user.email}
                required
                placeholder="Email"
              />
            </div>

            <div className="form-control">
              <input
                type="password"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, password: e.target.value }))
                }
                value={user.password}
                required
                placeholder="Password"
              />
            </div>

            {errorMessage ? (
              <p className="error-message">{errorMessage?.slice(6)}</p>
            ) : (
              ""
            )}

            <button className="login-btn">Login</button>
            <p className="text">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
      {verifiedError && (
        <div className="verify">
          <p>{verifiedError}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
