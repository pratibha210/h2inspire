import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import ScrollButton from '../components/ScrollButton'
import '../layouts/HeaderFooterLayout.css'
import { useSessionStorage, useLocalStorage } from "../hooks/useStorage"
import logo from "../assets/imgs/logo.png";
import profile  from "../assets/imgs/profile.svg";
import header1 from "../assets/imgs/header1.svg";
import header2 from "../assets/imgs/header2.svg";
import header3 from "../assets/imgs/header3.svg";

function HeaderFooterLayout() {
  const [user, setUser, removeUser] = useLocalStorage("AUTH_USER")
  const [userType, setUserType, removeUserType] = useLocalStorage("AUTH_USER_TYPE")

  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage("ACCESS_TOKEN")
  console.log("user", user)
  console.log("user", userType)

  return (
    <>
      {/* <div className="scrollToTopBtn showBtn">
        <i className="fa-solid fa-angle-up"></i>
      </div> */}
      <ScrollButton />

      <header>
          <nav>
              <div className="container container-flex">
                  <div className="logo">
                      <Link to={'/'}>
                        <img src={logo}alt="Logo" />
                      </Link>
                  </div>
                  <div className="bars">
                      <iconify-icon icon="heroicons:bars-3-center-left"></iconify-icon>
                  </div>
                  <div className="nav-right">
                      <div className="times">
                          <iconify-icon icon="prime:times"></iconify-icon>
                      </div>
                      <ul className="list-unstyled p-0 m-0">
                          <li><a href="#">BROWSE JOBS</a></li>
                          <li><a href="#">EMPLOYERS</a></li>
                          <li><a href="#">PACKAGES</a></li>
                      </ul>
                  </div>
                  {(userType == 'agency' || (user && user.name)) &&
                    <Link to = "/agency/dashboard" >
                        <div className="profile">
                            <div className="pro-image">
                                <img src={profile} />
                            </div>
                            <div className="profile-details">
                                <span className="name">{user?.name}</span>
                                <span className="email">{user?.corporate_email}</span>
                            </div>
                        </div>
                    </Link>
                  }

                  {(userType == 'employer' || (user && user.email && user.fname)) &&
                    <Link to = "/employer/dashboard" >
                        <div className="profile">
                            <div className="pro-image">
                                <img src={profile} />
                            </div>
                            <div className="profile-details">
                                <span className="name">{user.fname} {user.lname}</span>
                                <span className="email">{user?.email}</span>
                            </div>
                        </div>
                    </Link>
                  }

                  {!user &&
                    <div className="header-button">
                        <NavLink className="button-style blue-button" to={'/agency/login'}>Agency Sign in <span><i className="fa-solid fa-user-plus"></i></span></NavLink>
                        <NavLink className="button-style dark-blue-button" to={'/employer/login'}>Employer Sign in <span><i className="fa-solid fa-arrow-right-to-bracket"></i></span></NavLink>
                        {/* <NavLink className="button-style dark-blue-button" to={'/recruiter/login'}>Recruiter Sign in <span><i className="fa-solid fa-arrow-right-to-bracket"></i></span></NavLink> */}
                    </div>
                  }
                  

              </div>
          </nav>
      </header>

      <Outlet />

      <footer className="footer">
          <div className="container">
              <div className="row g-3">
                  <div className="col-12 col-lg-4 col-md-6 mb-4 mb-md-0">
                      <div className="footer-content">
                          <a href="#" className="logo">
                              <img src={logo} alt="" />
                          </a>
                          <p>Tower 6 6137 Prestige Shantiniketan Whitefiled Next to Nexus Shantiniketan Mall Bangalore 560048</p>
                          <div className="social">
                              <span>Follow Us</span>
                              <ul>
                                  <li>
                                      <a href="#">
                                          {/* <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M5.01953 5.625L5.29297 3.82812H3.55469V2.65625C3.55469 2.14844 3.78906 1.67969 4.57031 1.67969H5.37109V0.136719C5.37109 0.136719 4.64844 0 3.96484 0C2.53906 0 1.60156 0.878906 1.60156 2.44141V3.82812H0V5.625H1.60156V10H3.55469V5.625H5.01953Z" fill="javascript:void(0)C3CCCD"></path>
                                          </svg>*/}
                                          <img src={header1} alt="header1" />
                                      </a>
                                  </li>
                                  <li>
                                      <a href="#">
                                          {/* <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M2.23714 10V3.31096H0.1566V10H2.23714ZM1.18568 2.41611C1.85682 2.41611 2.39374 1.85682 2.39374 1.18568C2.39374 0.536913 1.85682 0 1.18568 0C0.536913 0 0 0.536913 0 1.18568C0 1.85682 0.536913 2.41611 1.18568 2.41611ZM10.0224 10V6.3311C10.0224 4.54139 9.61969 3.15436 7.51678 3.15436C6.51007 3.15436 5.83893 3.71365 5.5481 4.22819H5.52573V3.31096H3.53468V10H5.61521V6.68904C5.61521 5.81656 5.77181 4.98881 6.84564 4.98881C7.91946 4.98881 7.94183 5.97315 7.94183 6.75615V10H10.0224Z" fill="javascript:void(0)C3CCCD"></path>
                                          </svg>  */}

                                          <img src={header2} alt='' />
                                      </a>
                                  </li>
                                  <li>
                                      <a href="#">
                                          {/* <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M5.01116 2.42188C3.58259 2.42188 2.4442 3.58259 2.4442 4.98884C2.4442 6.41741 3.58259 7.5558 5.01116 7.5558C6.41741 7.5558 7.57812 6.41741 7.57812 4.98884C7.57812 3.58259 6.41741 2.42188 5.01116 2.42188ZM5.01116 6.66295C4.09598 6.66295 3.33705 5.92634 3.33705 4.98884C3.33705 4.07366 4.07366 3.33705 5.01116 3.33705C5.92634 3.33705 6.66295 4.07366 6.66295 4.98884C6.66295 5.92634 5.92634 6.66295 5.01116 6.66295ZM8.27009 2.33259C8.27009 1.99777 8.00223 1.72991 7.66741 1.72991C7.33259 1.72991 7.06473 1.99777 7.06473 2.33259C7.06473 2.66741 7.33259 2.93527 7.66741 2.93527C8.00223 2.93527 8.27009 2.66741 8.27009 2.33259ZM9.96652 2.93527C9.92188 2.1317 9.7433 1.41741 9.16295 0.837054C8.58259 0.256696 7.8683 0.078125 7.06473 0.0334821C6.23884 -0.0111607 3.76116 -0.0111607 2.93527 0.0334821C2.1317 0.078125 1.43973 0.256696 0.837054 0.837054C0.256696 1.41741 0.078125 2.1317 0.0334821 2.93527C-0.0111607 3.76116 -0.0111607 6.23884 0.0334821 7.06473C0.078125 7.8683 0.256696 8.56027 0.837054 9.16295C1.43973 9.7433 2.1317 9.92188 2.93527 9.96652C3.76116 10.0112 6.23884 10.0112 7.06473 9.96652C7.8683 9.92188 8.58259 9.7433 9.16295 9.16295C9.7433 8.56027 9.92188 7.8683 9.96652 7.06473C10.0112 6.23884 10.0112 3.76116 9.96652 2.93527ZM8.89509 7.93527C8.73884 8.3817 8.3817 8.71652 7.95759 8.89509C7.28795 9.16295 5.72545 9.09598 5.01116 9.09598C4.27455 9.09598 2.71205 9.16295 2.06473 8.89509C1.6183 8.71652 1.28348 8.3817 1.10491 7.93527C0.837054 7.28795 0.904018 5.72545 0.904018 4.98884C0.904018 4.27455 0.837054 2.71205 1.10491 2.04241C1.28348 1.6183 1.6183 1.28348 2.06473 1.10491C2.71205 0.837054 4.27455 0.904018 5.01116 0.904018C5.72545 0.904018 7.28795 0.837054 7.95759 1.10491C8.3817 1.26116 8.71652 1.6183 8.89509 2.04241C9.16295 2.71205 9.09598 4.27455 9.09598 4.98884C9.09598 5.72545 9.16295 7.28795 8.89509 7.93527Z" fill="javascript:void(0)C3CCCD"></path>
                                            </svg>                                                 */}

                                            <img src={header3} alt=''/>
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>

                  <div className="col-12 col-lg-2 col-md-6 mb-4 mb-md-0">
                      <div className="footer-content">
                          <h4>Useful Links</h4>
                          <ul className="footer-list">
                              <li><a href="#">Terms & Conditions</a></li>
                              <li><a href="#">Privacy Policy</a></li>
                              <li><a href="#">Cancellation Policy</a></li>
                              <li><a href="#">Payment Policy</a></li>
                          </ul>
                      </div>
                  </div>

                  <div className="col-12 col-lg-2 col-md-6 mb-4 mb-md-0">
                      <div className="footer-content">
                          <h4>Content</h4>
                          <ul className="footer-list">
                              <li><a href="#">Home</a></li>
                              <li><a href="#">About Us</a></li>
                              <li><a href="#">Jobs</a></li>
                              <li><a href="#">Contacts</a></li>
                          </ul>
                      </div>
                  </div>

                  <div className="col-12 col-lg-4 col-md-6">
                      <div className="footer-content footer-social">
                          <h4>Contact Us</h4>
                          <ul className="footer-list">
                              <li><a href="#">Employers : (+91) 76176 43333</a></li>
                              <li><a href="#">Candidate : (+91) 88593 99333</a></li>
                              <li><a href="#">Support@hire2inspire.com</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </footer>

      <div className="footer-btm">
          <div className="container">
              <div className="row">
                  <div className="col-12">
                      © 2021 Hire2Inspire. All rights reserved.
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default HeaderFooterLayout