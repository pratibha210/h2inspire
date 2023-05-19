import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { useAuth } from "../../context/auth";
import { employerRegister } from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "@mui/material/CircularProgress";

function EmployerRegister() {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [passloading, setPassloading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [copyText, setCopyText] = useState(false);
  /* to generate random password button function  */
  const textInput = React.useRef();

  // const resetInput = () => (textInput.current.value = "");
  function genPassword(){
    setPassloading(true);
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
    setTimeout(() => {
      setPassloading(false);

      setPassword(password);
    }, 3000);

    return password;
}


  useEffect(() => {
    console.log(password, "password");
  }, [password]);

  /* to copy password function */
  const onCopyPassword = () => {
    setCopyText(!copyText);
  };

  /* To  change copy text */
  useEffect(() => {
    if (copyText == true) {
      navigator.clipboard.writeText(password);
    } else {
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

  /* To call Employer register API function  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      fname: data.get("fname"),
      lname: data.get("lname"),
      mobile: data.get("mobile"),
      email: data.get("email"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
    };

    if (userData.password !== userData.confirm_password) {
      setErrorMessage("Please enter correct password");
    } else {
      setLoading(true);
      // console.log(userData);
      await employerRegister(userData)
        .then((res) => {
          const { response } = res;
          setLoading(false);
          if (response?.data.error === true) {
            setErrorMessage(response?.data.message);
          } else {
            navigate("/employer/login", { replace: true });
          }
        })
        .catch((err) => {
          setLoading(false);
          // console.log(err, "err");
        });
    }
  };

  return (
    <>
      <Page title="Employer Login | hire2inspire">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="input-style2"
              id="fname"
              placeholder="First name of the Employer"
              name="fname"
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="input-style2"
              id="lname"
              placeholder="Last name of the Employer"
              name="lname"
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              maxLength={10}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
             
              className="input-style2"
              id="mobile"
              placeholder="Phone number of the Employer"
              name="mobile"
            />
          </div>
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
          <div className=" mt-3 position-relative">
            <input
              ref={textInput}
              required
              defaultValue={password}
              type={showPassword ? "text" : "password"}
              className="input-style2"
              id="password"
              placeholder="Generate Password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
            />
            <div className="view-password">
              <i onClick={onShowPassword} class="fa-regular fa-eye-slash"></i>
              <button
                className="blue-button-outline"
                type="button"
                onClick={() => onCopyPassword(password)}
              >
                {copyText ? "Copied" : "Copy"}
              </button>{" "}
            </div>
          </div>
          <div className="mt-3">
            <button
              className=" blue-button-outline generate-pass generate-pass_fixed"
              type="button"
              onClick={() => genPassword(10)}
            >
              {passloading == true ? (
                <Loader className="genpasbtnLoader" />
              ) : (
                "Generate Password"
              )}
            </button>
          </div>

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
              <i
                onClick={onShowConfirmPass}
                class="fa-regular fa-eye-slash"
              ></i>
            </div>
          </div>
          {errorMessage && (
            <span className="text-danger mx-3">{errorMessage}</span>
          )}
          <button
            disabled={loading}
            type="submit"
            className="full-width-btm loginBtnLoader"
          >
            {loading == true ? (
              <Loader className="btnLoader" />
            ) : (
              "Create account"
            )}
          </button>
        </form>
        <span className="sub-login">
          Already have an employer account ?{" "}
          <Link to={"/employer/login"}>Login</Link>
        </span>
      </Page>
    </>
  );
}

export default EmployerRegister;
