import React,{useEffect, useState} from 'react'
import { SidebarConfig } from "./SidebarConfig";
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
// import { useLocalStorage } from '../hooks/useStorage';
import { agencyAccountDetails,inviteMultipleRecruiter } from '../api/api';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";

import Loader from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AdminDashboardLayout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true })
  }

const user = JSON.parse(localStorage.getItem("AUTH_USER"))

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);


const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
const gotoChangePassword=()=>{
  setAnchorEl(null);
  navigate("/agency/change-password")
}

const gotoProfile=()=>{
  setAnchorEl(null);
  navigate("/agency/profile")
}

  ////// selct multiple agency function //////

  const [modalopen, setModalOpen] = React.useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [selectButton, setSelectButton] = useState(false);

  const handleModalOpen = (e) => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setErrormsg("");
  };


  const inviteAgencyFunc = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    if (!formdata.get("email")) return false;

    const body = {
      email: formdata
        .get("email")
        ?.split("|")
        .map((e) => e.trim()),
      callback: window.location.origin + "/recruiter/login"
    };
    setSelectButton(true);
    const resp = await inviteMultipleRecruiter(body);
    console.log("Agency resp  >>>>>>>>>> ", resp);
    if (resp?.data?.error == false) {
      handleModalClose();
      setSelectButton(false);
      // setAgencyList(resp?.data?.data);
    } else {
      setErrormsg(resp?.data?.message);
      setSelectButton(false);
    }


  }
  // const navLinkStyles = ({ isActive }) => {
  //   return {
  //     color: isActive ? '#0c7698' : '#000',
  //     textDecoration: isActive ? 'none' : 'none',
  //     width: '100%'
  //   }
  // }

  return (

    <>
      {/* <Outlet />
      <button onClick={() => logout()}>logout</button>
      <br />

      {SidebarConfig && SidebarConfig.map((val, index) => (
        <NavLink to={val.path} style={navLinkStyles} key={index}>
          <button style={{
            background: (location.pathname === val.path)? '#a3d4ff' : '#fff'
          }}>
            {val.title}
          </button>
        </NavLink>
      ))} */}

      <section className="dashboard-wrap">
        <div className="desh-header">
            <Link to={'/'} className="dash-logo">
              <img src="/src/assets/imgs/logo.png" />
            </Link>
            <div className="rest-nav">
                <div className="menu-bar">
                    <div className="cross"><i className="fa-solid fa-xmark"></i></div>
                    <ul>
                    <li><a href="#" onClick={() => handleModalOpen()}>INVITE RECRUITER</a></li>
                        <li><a href="#">BROWSE JOBS</a></li>
                        <li><a href="#">EMPLOYERS</a></li>
                        <li><a href="#">PACKAGES</a></li>
                    </ul>
                </div>
                <a href="#" className="noticication">
                    <img className="off" src="/src/assets/imgs/notification-on.svg" />
                    <img style={{display: 'none'}} className="on" src="/src/assets/imgs/notification.png" />
                </a>
                <div className="profile">
                    <div className="pro-image" onClick={handleClick}>
                   
                        <img src="/src/assets/imgs/profile.svg" />
                   
                    </div>
                    <div className="profile-details">
                    {user?.name && 
                          <span className="name">{user?.name}</span>
                        }
                        {user?.email && 
                          <span className="email">{user?.email}</span>
                        }


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
                { SidebarConfig && SidebarConfig.map((val, index) => (
               
                  <li key={index}>
                    <NavLink to={val.path} key={index} >
                      <img src={val.icon} />
                      <span>{val.title}</span>
                    </NavLink>
                  </li>

                ))}

                  <li>
                      <a href="#" onClick={() => {
                        auth.logout()
                      }}>
                          <img src="/src/assets/imgs/archive.svg" />
                          <span>Log Out</span>
                      </a>
                  </li>
              </ul>
            </div>
          
            <Modal
          open={modalopen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={(e) => inviteAgencyFunc(e)}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Assign multiple Rcruiter by email id
              </Typography>

              <FormControl sx={{ m: 1, width: 300 }}>
                <h4 className="form-heading">Email (use '|' separator)</h4>

                <div className="mb-3">

                  <input
                    required
                    type="text"
                    className="input-style2"
                    id="agency email"
                    placeholder=""
                    name="email"

                  />
                </div>
              </FormControl>
              <span className="text-danger mx-3">{errormsg}</span>
              <button
                type="submit"

                className="full-width-btm loginBtnLoader"
              >
                {selectButton == true ? (
                  <Loader className="btnLoader" />
                ) : (
                  "Save"
                )}
              </button>
            </Box>
          </form>
        </Modal>
            <div className="right-panel">
              <Outlet />
            </div>
          </div>
        </div>
        {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={gotoProfile}>Profile</MenuItem>
        <MenuItem onClick={gotoChangePassword}>Change password</MenuItem>
      </Menu> */}
      </section>
    </>
  )
}

export default AdminDashboardLayout