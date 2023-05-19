import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../../../components/Page";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { agencyForgotPassword, agencyVerifyOtp, agencyResetPassword } from "../../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "@mui/material/CircularProgress";

/* Component for enter Password forgot password   */

const EnterPasswordFunction = (props) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [copyText, setCopyText] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [passloading, setPassloading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState("");
  let { email } = props;
  /* to generate random password button function  */

  function genPassword(){
    setPassloading(true)
    setPassword("")
    var lowercaseAlphabetChar = ("abcdefghijklmnopqrstuvwxyz");
    var uppercaseAlphabetChar = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    var numericChar = (1234567890);
    var specialChar = ("!@#$%^&*()?~/|'><");
    var password = "";
    var pSelection = "";

    var length = 8

    pSelection = lowercaseAlphabetChar + uppercaseAlphabetChar + numericChar + specialChar;
    for (var i = 0; i <= length; i++) {
        password = password + pSelection.charAt(Math.floor(Math.random() * Math.floor(pSelection.length - 1)));
    }
    setTimeout(()=>{
      setPassword(password);
      setPassloading(false)
    },2000)

    return password;
}



  // const onPasswordChange = (e) => {
  //   console.log(e.target.value);
  //   setPassword(e.target.value);
  // };


  /* to copy password function */
  const onCopyPassword = (e) => {
    setCopyText(!copyText);
  };

  /* To  change copy text */
  useEffect(() => {
    if (copyText == true) {
        navigator.clipboard.writeText(password);

    } else {
      setPassword("")
      navigator.clipboard.writeText("");
    }
  }, [copyText]);

  /* to show password button function  */
  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /* to show confirm password button function  */
  const onShowConfirmPass = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  /* To call enter Password API function  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: email,
      new_password: data.get("new_password"),
      confirm_password: data.get("confirm_password"),
    };

    if (userData.new_password !== userData.confirm_password) {
      setErrorMessage("Please enter correct password");
    } else {
      setLoading(true)
    await agencyResetPassword(userData)
      .then((res) => {
        setLoading(false)
        const { response } = res;
        if (response?.data.error === true) {
          setErrorMessage(response?.data.message);
        } else {
          navigate("/agency/login", { replace: true });
        }
      })
      .catch((err) => {
        setLoading(false)
      });
    }
  };

  return (
    <>
      <Page title="Agency Login | hire2inspire">
        <form action="" onSubmit={handleSubmit}>
          <div className=" mt-3 position-relative">
            <input
              required
              defaultValue={password}
              type={showPassword ? "text" : "password"}
              className="input-style2"
              id="new_password"
              placeholder="Generate Password"
              name="new_password"
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
             <div className="view-password"> 
            <i onClick={onShowPassword} class="fa-regular fa-eye-slash"></i>
            {/* <button
              className="blue-button-outline"
              type="button"
              onClick={() => onCopyPassword(password)}
            >
              {copyText ? "Copied" : "Copy"}
            </button> */}
            </div>
          </div>
          {/* <button
            className="blue-button-outline generate-pass generate-pass_fixed"
            type="button"
            onClick={() => genPassword(10)}
          >
             {passloading == true ? (
              <Loader className="genpasbtnLoader"
              />
            ) : (
              " Generate Password"
            )}
          </button> */}
          <div className=" mt-3 position-relative">
            <input
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              required
              type={showConfirmPassword ? "text" : "password"}
              className="input-style2"
              id="confirm_password"
              placeholder="Confirm Password"
              name="confirm_password"
            />
             <div className="view-password"> 
            <i onClick={onShowConfirmPass} class="fa-regular fa-eye-slash"></i>
            </div>
          </div>
          {errorMessage &&  <span className="text-danger mx-3">{errorMessage}</span>}
          <button disabled={loading} type="submit" className="full-width-btm loginBtnLoader">
          {loading == true ? <Loader className="btnLoader" /> : "Submit"} 
          </button>
        </form>
        {/* <span className="sub-login">
          Already have an agency account ?{" "}
          <Link to={"/agency/login"}>Login</Link>
        </span> */}
      </Page>
    </>
  );
};

/* Component for enter otp forgot password   */

const OtpFunction = (props) => {
  let { email, otpFunction, successMessage } = props;
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPasswordFunction, setShowPasswordFunction] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      successMessage = "";
    }, 300);
  }, []);

  /* To call enter otp API function  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: email,
      otp: data.get("otp"),
    };
    setLoading(true)
    await agencyVerifyOtp(userData)
      .then((res) => {
        setLoading(false)
        const { response } = res;
        if (response?.data.error === true) {
          setErrorMessage(response?.data.message);
        } else {
          setShowPasswordFunction(true);
          otpFunction = false;
        }
      })
      .catch((err) => {
        setLoading(false)
      });
  };

  return (
    <>
      {successMessage}
      {showPasswordFunction == false && (
        <Page title="Agency Login | hire2inspire">
          <form action="" onSubmit={handleSubmit}>
            <div className=" mt-3">
              <input
                required
                type={"text"}
                className="input-style2"
                id="otp"
                placeholder="Enter OTP"
                name="otp"
              />
            </div>

            {errorMessage &&  <span className="text-danger mx-3">{errorMessage}</span>}
            <button disabled={loading} type="submit" className="full-width-btm loginBtnLoader">
            {loading == true ? <Loader className="btnLoader" /> : "Submit"} 
            </button>
          </form>
        </Page>
      )}
      {showPasswordFunction == true && <EnterPasswordFunction email={email} />}
    </>
  );
};

/* Component for enter mail forgot password   */
function AgencyForgotPassword() {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [otpFunction, setOtpFunction] = useState(false);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  /* To call Agency register API function  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
    };
    setLoading(true);
    await agencyForgotPassword(userData)
      .then((res) => {
        const { response } = res;
        setLoading(false)
        if (response?.data.error === true) {
          setErrorMessage(response?.data.message);
        } else {
          setEmail(userData?.email);
          setOtpFunction(true);
          setSuccessMessage(res?.data.message);
        }
      })
      .catch((err) => {
        setLoading(false)
      });
  };

  return (
    <>
      {otpFunction == false && (
        <Page title="Agency Login | hire2inspire">
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <input
                required
                type="email"
                className="input-style2"
                id="email"
                placeholder="Corporate Mail Address"
                name="email"
              />
            </div>

            {errorMessage &&  <span className="text-danger mx-3">{errorMessage}</span>}
            <button disabled={loading} type="submit" className="full-width-btm loginBtnLoader">
            {loading == true ? <Loader className="btnLoader" /> : "Submit"} 
            </button>
          </form>
          <span className="sub-login">
            Already have an Agency account ?{" "}
            <Link to={"/agency/login"}>Login</Link>
          </span>
        </Page>
      )}
      {otpFunction == true && (
        <OtpFunction
          email={email}
          otpFunction={otpFunction}
          successMessage={successMessage}
        />
      )}
    </>
  );
}

export default AgencyForgotPassword;
