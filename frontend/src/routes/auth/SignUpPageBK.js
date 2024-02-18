import axios from "axios";
import React, { useState, useContext } from "react";
import { user } from "../../providers/UserProvider";
import { useNavigate, Link } from "react-router-dom";

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(user);
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      alert("Fill all Columns first.");
    } else {
      try {
        const res = await axios.post("/auth/register", {
          firstName,
          lastName,
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
    <section
      style={{
        border: "1px black solid",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span className="text-primary">for your business</span>
              </h1>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label">First name</label>
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label">Last name</label>
                          <input
                            type="text"
                            id="form3Example2"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
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
                        id="form3Example4"
                        className="form-control"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      onClick={signUpHandler}
                    >
                      Sign up
                    </button>
                    <Link to="/auth/login">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                        style={{ marginLeft: "1vh" }}
                      >
                        Sign In
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
