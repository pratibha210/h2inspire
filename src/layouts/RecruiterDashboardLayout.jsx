import React, { useEffect, useState } from "react";
import { RecruiterSidebarConfig } from "./SidebarConfig";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/auth";
// import { useLocalStorage } from '../hooks/useStorage';
import { recruiterAccountDetails } from "../api/api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Loader from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import archive1 from "../assets/imgs/archive.svg";
import profile1 from "../assets/imgs/profile.svg";
import notification2 from "../assets/imgs/notification.png";

import notification1 from "../assets/imgs/notification-on.svg";





function RecruiterDashboardLayout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  // const user = JSON.parse(localStorage.getItem("AUTH_USER"))

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [user, setUser] = useState({});
  const token = localStorage.getItem("AUTH_USER")
    ? JSON.parse(localStorage.getItem("AUTH_USER"))
    : "";

  // console.log(token,"toke");

  /* Agency details API call function */
  const recruiterDetails = async () => {
    await recruiterAccountDetails(token?._id)
      .then((res) => {
        const { response } = res;
        if (response?.status == 500) {
          localStorage.clear();
          navigate("/");
        } else if (res?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }

        if (response?.data.error === true) {
          // setErrorMessage(response?.data.message);
        } else {
          setUser(res?.data?.data);
        }
      })
      .catch((err) => {
        // console.log(err, "err");
      });
  };

  useEffect(() => {
    recruiterDetails();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const gotoChangePassword = () => {
    setAnchorEl(null);
    navigate("/recruiter/change-password");
  };

  const gotoProfile = () => {
    setAnchorEl(null);
    navigate("/agency/profile");
  };

  return (
    <>
      <section className="dashboard-wrap">
        <div className="desh-header">
          <Link to={"/"} className="dash-logo">
            <img src="/src/assets/imgs/logo.png" />
          </Link>
          <div className="rest-nav">
            <div className="menu-bar">
              <div className="cross">
                <i className="fa-solid fa-xmark"></i>
              </div>
              <ul>
                <li>
                  <a href="#">PACKAGES</a>
                </li>
              </ul>
            </div>
            <a href="#" className="noticication">
              <img className="off" src={notification1} />
              <img
                style={{ display: "none" }}
                className="on"
                src={notification2}
              />
            </a>
            <div className="profile">
              <div className="pro-image" onClick={handleClick}>
                <img src={profile1} />
              </div>
              <div className="profile-details">
                {token?.name && <span className="name">{user?.name}</span>}

                {user?.email && <span className="email">{user?.email}</span>}
              </div>
            </div>
            <div className="ham">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="dash-body">
          <div className="inner-wrap">
            <div className="left-panel">
              <div className="sidebar-close">
                <i className="fa-solid fa-xmark"></i>
              </div>
              <h2>Job Status</h2>

              <ul>
                {RecruiterSidebarConfig &&
                  RecruiterSidebarConfig.map((val, index) => (
                    <li key={index}>
                      <NavLink to={val.path} key={index}>
                        <img src={val.icon} />
                        <span>{val.title}</span>
                      </NavLink>
                    </li>
                  ))}

                <li>
                  <a
                    href="#"
                    onClick={() => {
                      auth.logout();
                    }}
                  >
                    <img src={archive1} />
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="right-panel">
              <Outlet />
            </div>
          </div>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* <MenuItem onClick={gotoProfile}>Profile</MenuItem> */}
          <MenuItem onClick={gotoChangePassword}>Change password</MenuItem>
          {/* <MenuItem onClick={logout}>Logout</MenuItem> */}
        </Menu>
      </section>
    </>
  );
}

export default RecruiterDashboardLayout;
