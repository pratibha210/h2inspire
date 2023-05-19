import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { useAuth } from "../../context/auth";
import { ColorRing } from "react-loader-spinner";
import { recruiterLoginApi } from "../../api/api"
import { useNavigate } from "react-router-dom";
import Loader from "@mui/material/CircularProgress";

function RecruiterLogin() {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  /* to show password button function  */
  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 3000)
  }, [])

  const onPasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    if (!formdata.get("email") && !formdata.get("password")) return false;
    setLoading(true);
    const userData = {
      // type: 'agency',
      email: formdata.get("email"),
      password: password,
    };

    console.log(userData);
    await recruiterLoginApi(userData)
      .then((res) => {
        setLoading(false);
        const { response } = res;
        console.log(res, "resss");

        if (response?.data?.error === true) {
          setErrorMessage(response?.data.message);
        }
        if (res?.data.error == true) {
          setErrorMessage(response?.data.message);
        } else {
          localStorage.setItem(
            "ACCESS_TOKEN",
            JSON.stringify(res?.data?.data.accessToken)
          );
          localStorage.setItem(
            "REFRESH_TOKEN",
            JSON.stringify(res?.data?.data.refreshToken)
          );
          localStorage.setItem("AUTH_USER", JSON.stringify(res?.data?.user));
          localStorage.setItem("AUTH_USER_TYPE", JSON.stringify("recruiter"));
          navigate('/recruiter/dashboard', { replace: true });
        }
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  return (
    <>
      <Page title="Agency Login | hire2inspire">
        {pageLoading == true && (
          <div className="contentLoader">
            <Loader className="contentLoaderAnimate" />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <input
              type="email"
              className="input-style2"
              id="email"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className=" mt-3 position-relative">
            <input
              defaultValue={password}
              type={showPassword ? "text" : "password"}
              className="input-style2"
              id="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onPasswordChange(e)}
            />
            <div className="view-password">
              <i onClick={onShowPassword} className="fa-regular fa-eye-slash"></i>
            </div>
          </div>

          {errorMessage && <span className="text-danger mx-3">{errorMessage}</span>}
          {/* className="full-width-btm loader position-relative" */}
          <button disabled={loading} type="submit" className="full-width-btm loginBtnLoader">
            {" "}
            {loading == true ? <Loader className="btnLoader" /> : "Login"}
          </button>
        </form>

        <span className="sub-login"> <Link to={'/recruiter/forgot-password'}>Forgot Password ?</Link></span>
      </Page>
    </>
  );
}

export default RecruiterLogin;
