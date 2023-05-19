
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { useAuth } from "../../context/auth";
import { recruiterChangePassword } from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "@mui/material/CircularProgress";


function RecuiterChangePassword() {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [copyText, setCopyText] = useState(false);
  /* to generate random password button function  */

  function genPassword(passwordLength = 10) {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var specialChars = "+@#^&*()[]";
    var password = "";
    for (var i = 0; i <= passwordLength / 2; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      var randomSpcialchars = Math.floor(Math.random() * specialChars.length);

      password += chars.substring(randomNumber, randomNumber + 1);
      password += specialChars.substring(
        randomSpcialchars,
        randomSpcialchars + 1
      );
    }
    setTimeout(()=>{
      setPassword(password);
    },3000)
    return password;
  }

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

  /* to show old password button function  */
  const onShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };


  /* to show old password button function  */
  const onShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
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
      old_password: data.get("old_password"),
      new_password: data.get("new_password"),
    };
    

    if (userData.new_password !== data.get("confirm_password")) {
      setErrorMessage("Please enter correct password");
    } else {
      // console.log(userData);
      setLoading(true)
      await recruiterChangePassword(userData)
        .then((res) => {
          console.log(res,"ressss");
          setLoading(false);
          const { data } = res;
          if(res.response?.data?.error == true){
            setErrorMessage(data.message);
          }
         if (data.error === true) {
            setErrorMessage(data.message);
          } else {
            navigate(-1, { replace: true });
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
      <Page title="Recruiter Login | hire2inspire">
        <form action="" onSubmit={handleSubmit}>
          <div className=" mt-3 position-relative">
            <input
              required
              type={showOldPassword ? "text" : "password"}
              className="input-style2"
              id="old_password"
              placeholder="Enter old password"
              name="old_password"
            />
             <div className="view-password">  
            <i onClick={onShowOldPassword} class="fa-regular fa-eye-slash"></i>
            </div>
          </div>

          <div className=" mt-3 position-relative">
            <input
              required
              // value={password}
              // defaultValue={password}
              type={showNewPassword ? "text" : "password"}
              className="input-style2"
              id="new_password"
              placeholder="Enter new password"
              name="new_password"
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
            <i onClick={onShowNewPassword} class="fa-regular fa-eye-slash"></i>
            </div>
            {/* <button
              className="blue-button-outline"
              type="button"
              onClick={() => onCopyPassword(password)}
            >
              {copyText ? "Coped" : "Copy"}
            </button> */}
          </div>
          {/* <button
            className="blue-button-outline"
            type="button"
            onClick={() => genPassword(10)}
          >
            Generate Password
          </button> */}
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
                return false;
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
          <button disabled={loading} type="submit" className="full-width-btm loginBtnLoader">
          {loading == true ? <Loader className="btnLoader" /> : "Save changes"}   
          </button>
        </form>
      </Page>
    </>
  );
}

export default RecuiterChangePassword;
