import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { user } from "../../providers/UserProvider";
import { Link } from "react-router-dom";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const userContext = useContext(user);

  const signInHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Fill all Columns first.");
    } else {
      try {
        const res = await axios.post("http://localhost:5001/api/auth/login", {
          email,
          password,
        });

        userContext.setUser(res.data.user);

        localStorage.setItem("token", res.data.token);

        axios.defaults.headers.common["x-auth-token"] = res.data.token;

        navigate("/", { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
              <div className="form-outline mb-4">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={signInHandler}
              >
                Sign in
              </button>
              <Link to="/auth/register">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  style={{ marginLeft: "1vh" }}
                >
                  Sign Up
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;
