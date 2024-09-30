import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(true); 

  const navigate = useNavigate();

  const checkBackendConnection = () => {
    axios
      .get("http://localhost:3000/api/v1/health") 
      .then((res) => {
        if (res.status === 200) {
          setIsBackendConnected(true);
        }
      })
      .catch((err) => {
        setIsBackendConnected(false);
        console.log(err);
        toast.error("Cannot connect to backend server 😞");
      });
  };

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address 😒");
      return;
    }
    setIsloading(true);
    axios
      .post("http://localhost:3000/api/v1/admin/login", {
        username: email,
        otp: password,
      })
      .then((res) => {
        if (res.data.title === "Success" && res.data.status === 200) {
          setIsloading(false);
          document.cookie = `token=${res.data.message}`;
          localStorage.setItem("user", JSON.stringify(res.data.message.user));
          navigate("/dashboard");
          return;
        }
        setIsloading(false);
        setShowOTP(true);
        toast.success(res.data.message + " 😊");
        console.log(res);
      })
      .catch((err) => {
        setIsloading(false);
        setShowOTP(false);
        toast.error(err.response.data.message + " ☹️");
        console.log(err);
      });
  };

  return (
    <div className="bg-primary bg-gradient">
      <div className="container" style={{ height: "100vh" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div>
                    <div className="p-5">
                      <div className="text-center">
                        <img
                          src="logo.png"
                          alt=""
                          width={150}
                          style={{ marginBottom: "20px" }}
                        />
                        <h1 className="h3 text-gray-900 fw-bold">
                          Welcome to the Admin Portal
                        </h1>
                        <p className="fs-6 mb-4 text-secondary">
                          Please Login to your account
                        </p>
                      </div>
                      {!isBackendConnected && (
                        <div className="alert alert-danger">
                          Sorry! Server is not connected. Please try again later 😞
                        </div>
                      )}
                      <form className="user" autoComplete="none">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user fs-6"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter your username"
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="none"
                            disabled={showOTP || !isBackendConnected}
                          />
                        </div>
                        {showOTP && (
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user fs-6"
                              id="exampleInputPassword"
                              placeholder="Enter the OTP sent to your email"
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="none"
                              disabled={isloading}
                            />
                          </div>
                        )}

                        <button
                          onClick={(e) => handleSubmit(e)}
                          className={
                            isloading || !isBackendConnected
                              ? "btn btn-primary btn-user btn-block disabled  fw-bold  fs-6"
                              : "btn btn-primary btn-user btn-block fw-bold  fs-6"
                          }
                        >
                          {isloading ? (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
