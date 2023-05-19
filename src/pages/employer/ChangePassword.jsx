
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { useAuth } from "../../context/auth";
import { chnagePassword } from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";


function ChangePassword() {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [copyText, setCopyText] = useState(false);
  /* to generate random password button function  */

  function genPassword(){
    // setPassloading(true);
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
      // setPassloading(false)
      setPassword(password);
    }, 3000);

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
      await chnagePassword(userData)
        .then((res) => {
          console.log(res,"ressss");
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
          // console.log(err, "err");
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
          <button type="submit" className="full-width-btm">
            Save changes
          </button>
        </form>
      </Page>
    </>
  );
}

export default ChangePassword;
