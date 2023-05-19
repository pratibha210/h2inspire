import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../../../components/Page";
import { useAuth } from "../../../context/auth";
import { agencyRegister } from "../../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "@mui/material/CircularProgress";
function AgencyRegister() {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passloading, setPassloading] = React.useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [copyText, setCopyText] = useState(false);
  /* to generate random password button function  */

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
      setPassloading(false)
      setPassword(password);
    }, 3000);

    return password;
}





  const onPasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  /* to copy password function */
  const onCopyPassword = (password) => {
    console.log(password, "password");

    setCopyText(!copyText);
  };

  /* To  change copy text */
  useEffect(() => {
    if (copyText == true) {
      // setPassword(password)
      navigator.clipboard.writeText(password);
    } else {
      setPassword("");
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
    console.log("wetretre");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      name: data.get("name"),
      corporate_email: data.get("corporate_email"),
      agency_estd_year: data.get("agency_estd_year"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
    };
    console.log(userData, "userData");
    if (userData.password !== userData.confirm_password) {
      setErrorMessage("Please enter correct password");
    } else {
      setLoading(true);

      // console.log(userData);
      await agencyRegister(userData)
        .then((res) => {
          setLoading(false);

          const { response } = res;

          if (response?.data.error === true) {
            setErrorMessage(response?.data.message);
          }
          if (res?.data.error == true) {
            setErrorMessage(response?.data.message);
          } else {
            // localStorage.setItem(
            //   "ACCESS_TOKEN",
            //   JSON.stringify(res?.data?.data.accessToken)
            // );
            // localStorage.setItem(
            //   "REFRESH_TOKEN",
            //   JSON.stringify(res?.data?.data.refreshToken)
            // );
            // localStorage.setItem("AUTH_USER", JSON.stringify(res?.data?.user));
            // localStorage.setItem("AUTH_USER_TYPE", JSON.stringify("agency"));
            navigate("/agency/login", { replace: true });
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
      <Page title="Agency Login | hire2inspire">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              required
              type="text"
              className="input-style2"
              id="name"
              placeholder="Name of the Agency"
              name="name"
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              required
              type="email"
              className="input-style2"
              id="corporate_email"
              placeholder="Corporate Mail Address"
              name="corporate_email"
            />
          </div>
          <div className="mb-3 mt-3">
            <input
              required
              type="text"
              className="input-style2"
              id="agency_estd_year"
              placeholder="Agency Established Year"
              name="agency_estd_year"
            />
          </div>

          <div className=" mt-3 position-relative">
            <input
              required
              defaultValue={password}
              type={showPassword ? "text" : "password"}
              className="input-style2"
              id="password"
              onChange={(e) => onPasswordChange(e)}
              placeholder="Generate Password"
              name="password"
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
              </button>
            </div>
          </div>
          <button
            className=" blue-button-outline generate-pass generate-pass_fixed"
            type="button"
            onClick={() => genPassword()}
          >
           {passloading == true ? (
              <Loader className="genpasbtnLoader"
              />
            ) : (
              " Generate Password"
            )}
           
          </button>
          <div className=" mt-3 position-relative">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              className="input-style2"
              id="confirm_password"
              placeholder="Confirm Password"
              name="confirm_password"
              onPaste={(e) => {
                e.preventDefault();
                // return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
            />
             <div className="view-password"> 
            <i onClick={onShowConfirmPass} class="fa-regular fa-eye-slash"></i>
            </div>
          </div>
          {errorMessage &&  <span className="text-danger mx-3">{errorMessage}</span>}
          <button type="submit" disabled={loading} className="full-width-btm loginBtnLoader">
            {loading == true ? (
              <Loader  className="btnLoader"
              />
            ) : (
              "Create account"
            )}
          </button>
        </form>
        <span className="sub-login">
          Already have an agency account ?{" "}
          <Link to={"/agency/login"}>Login</Link>
        </span>
      </Page>
    </>
  );
}

export default AgencyRegister;
