import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@mui/material/CircularProgress";
import { agencyAccountDetails, agenciesDashboardData } from "../../../api/api";
import moment from "moment-timezone";
import Swal from "sweetalert2";
import workIcon from "../../../assets/imgs/work.svg";
import jobsIcon from "../../../assets/imgs/jobs.svg";
import declinedIcon from "../../../assets/imgs/declined.svg";
import icon1 from "../../../assets/imgs/icon.png";
import agency1 from "../../../assets/imgs/agency1.svg";
import agency2 from "../../../assets/imgs/agency2.svg";
import agency3 from "../../../assets/imgs/agency3.svg";
import agency4 from "../../../assets/imgs/agency4.svg";
import agency5 from "../../../assets/imgs/agency5.svg";





function AgencyDashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("AUTH_USER");
  const [loading, setLoading] = React.useState(true);
  const [dashboardData, setDashboardData] = useState({});
  /////// Agency details function ////////////
  const agencyDetailsFunction = async () => {
    await agencyAccountDetails(user?._id)
      .then((res) => {
        if (res?.response?.status == 500) {
          localStorage.clear();
          navigate("/");
        }else if (res?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
        if (res?.data?.data) {
          localStorage.setItem("AUTH_USER", JSON.stringify(res?.data?.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //////////////////// get dashboard data ////////////
  const getAgencyDashboardFunction = async () => {
    await agenciesDashboardData(user?._id)
      .then((res) => {
        // console.log(res, "ressssssss");
        if (res?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
        if (res?.data) {
          setDashboardData(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function createMarkup(val) {
    return { __html: val };
  }
  useEffect(() => {
    setTimeout(() => {
      agencyDetailsFunction();
      getAgencyDashboardFunction();
      setLoading(false);
    }, 5000);
  }, [user]);





  return (
    <>
      {loading == true ? (
        <div className="contentLoader">
          <Loader className="contentLoaderAnimate" />
        </div>
      ) : (
        <>
          <div className="toogle-btm">
            <i className="fa-solid fa-filter"></i>
            Filter
          </div>
          <ul className="job-count">
            <li>
              <div className="dash-box">
                <div className="icon">
                  <img src={workIcon} />
                </div>
                <h3>No of working on Jobs</h3>
                <span className="count">
                  {dashboardData?.counts?.workingJobs}
                </span>
              </div>
            </li>
            <li>
              <div className="dash-box">
                <div className="icon">
                  <img src={jobsIcon} />
                </div>
                <h3>No of Pending Jobs</h3>
                <span className="count">
                  {dashboardData?.counts?.pendingJobs}
                </span>
              </div>
            </li>
            <li>
              <div className="dash-box">
                <div className="icon">
                  <img src={declinedIcon} />
                </div>
                <h3>No of Declined Jobs</h3>
                <span className="count">
                  {dashboardData?.counts?.declinedJobs}
                </span>
              </div>
            </li>
            {/* <li>
              <div className="dash-box">
                <div className="icon">
                  <img src="/src/assets/imgs/jobs.svg" />
                </div>
                <h3>No of Archived Jobs</h3>
                <span className="count">{dashboardData?.counts?.workingJobs}</span>
              </div>
            </li> */}
          </ul>
          <div className="recent-jobsection">
            {/* <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="dash-heading">Recent Jobs</h3>
          <div className="short">
            Sort By:
            <select className="form-select">
              <option>Select Matched</option>
              <option>Recently Matched</option>
              <option>Recently Matched</option>
              <option>Recently Matched</option>
            </select>
          </div>
        </div> */}
            <ul className="job-list job-list__single">
              {dashboardData?.data?.length > 0 &&
                dashboardData?.data?.map((e, i) => {
                  return (
                    <li key={i}>
                      <div className="job-box">
                        <div className="job-header">
                          <div className="logo">
                            <img src={icon1} />
                          </div>
                          <div className="job-company">
                            <h4>{e?.job?.job_name}</h4>
                            <div className="job-location">
                              <span>
                                {/* <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14.75 7.5C14.75 9.72306 13.2968 11.9167 11.649 13.656C10.8456 14.504 10.0388 15.1992 9.43176 15.6826C9.27222 15.8096 9.12703 15.9216 9 16.0174C8.87297 15.9216 8.72778 15.8096 8.56824 15.6826C7.96117 15.1992 7.15436 14.504 6.35095 13.656C4.70324 11.9167 3.25 9.72306 3.25 7.5C3.25 5.97501 3.8558 4.51247 4.93414 3.43414C6.01247 2.3558 7.47501 1.75 9 1.75C10.525 1.75 11.9875 2.3558 13.0659 3.43414C14.1442 4.51247 14.75 5.97501 14.75 7.5Z"
                                    stroke="#FFB800"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M10.25 7.5C10.25 8.19036 9.69036 8.75 9 8.75C8.30964 8.75 7.75 8.19036 7.75 7.5C7.75 6.80964 8.30964 6.25 9 6.25C9.69036 6.25 10.25 6.80964 10.25 7.5Z"
                                    stroke="#FFB800"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg> */}
                                <img src={agency1} />
                              </span>
                              <h5>{e?.job?.job_location.join(", ")}</h5>
                            </div>
                           
                          </div>
                         
                        </div>
                        <div className="job-content">
                          <h2>{e?.job?.designation}</h2>
                          <div
                            dangerouslySetInnerHTML={createMarkup(
                              e?.job?.job_description
                            )}
                          />
                          <div className="job-footer mb-4">
                            <div className="job-short">
                              {/* <span>Full Time</span>
                              <span>Part Time</span> */}
                            </div>
                          </div>

                          <ul>
                            <li>
                              <span>
                                {/* <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 16C12.4172 16 16 12.4172 16 8C16 3.58285 12.4172 0 8 0C3.58285 0 0 3.58285 0 8C0 12.4172 3.58285 16 8 16ZM7.42855 3.42858C7.42855 3.11428 7.6857 2.85713 8 2.85713C8.3143 2.85713 8.57145 3.11428 8.57145 3.42858V7.72572L11.2143 9.84001C11.46 10.0372 11.5 10.3971 11.3029 10.6429C11.1914 10.7829 11.0257 10.8571 10.8571 10.8571C10.7314 10.8571 10.6057 10.8171 10.5 10.7314L7.64288 8.44573C7.50859 8.33714 7.4286 8.1743 7.4286 8V3.42858H7.42855Z"
                                    fill="#5682ED"
                                  ></path>
                                </svg> */}
                                <img  src={agency2}/>
                              </span>
                              {moment(e.createdAt).fromNow()}
                            </li>
                            {e?.job?.hide_compensation &&
                              e?.job?.hide_compensation == true ? (
                              <>{null}</>
                            ) : (
                              <li>
                                <span>
                                  {/* <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 1.3999H4C1.6 1.3999 0 2.5999 0 5.3999V10.9999C0 13.7999 1.6 14.9999 4 14.9999H12C14.4 14.9999 16 13.7999 16 10.9999V5.3999C16 2.5999 14.4 1.3999 12 1.3999ZM4.8 12.7999H2.4C2.072 12.7999 1.8 12.5279 1.8 12.1999C1.8 11.8719 2.072 11.5999 2.4 11.5999H4.8C5.128 11.5999 5.4 11.8719 5.4 12.1999C5.4 12.5279 5.128 12.7999 4.8 12.7999ZM8 10.5999C6.67201 10.5999 5.6 9.5279 5.6 8.1999C5.6 6.8719 6.67201 5.7999 8 5.7999C9.328 5.7999 10.4 6.8719 10.4 8.1999C10.4 9.5279 9.328 10.5999 8 10.5999ZM13.6 4.7999H11.2C10.872 4.7999 10.6 4.5279 10.6 4.1999C10.6 3.8719 10.872 3.5999 11.2 3.5999H13.6C13.928 3.5999 14.2 3.8719 14.2 4.1999C14.2 4.5279 13.928 4.7999 13.6 4.7999Z"
                                      fill="#5682ED"
                                    ></path>
                                  </svg> */}
                                  <img src={agency3} />
                                </span>
                                {e?.job?.min_compensation} - {e?.job?.max_compensation}{" "}
                                {e?.job?.compensation_type.toUpperCase()}
                              </li>
                            )}
                            {e?.job?.candidates?.length > 0 && 
                            <li>
                              <span>
                                {/* <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 1.3999H4C1.6 1.3999 0 2.5999 0 5.3999V10.9999C0 13.7999 1.6 14.9999 4 14.9999H12C14.4 14.9999 16 13.7999 16 10.9999V5.3999C16 2.5999 14.4 1.3999 12 1.3999ZM4.8 12.7999H2.4C2.072 12.7999 1.8 12.5279 1.8 12.1999C1.8 11.8719 2.072 11.5999 2.4 11.5999H4.8C5.128 11.5999 5.4 11.8719 5.4 12.1999C5.4 12.5279 5.128 12.7999 4.8 12.7999ZM8 10.5999C6.67201 10.5999 5.6 9.5279 5.6 8.1999C5.6 6.8719 6.67201 5.7999 8 5.7999C9.328 5.7999 10.4 6.8719 10.4 8.1999C10.4 9.5279 9.328 10.5999 8 10.5999ZM13.6 4.7999H11.2C10.872 4.7999 10.6 4.5279 10.6 4.1999C10.6 3.8719 10.872 3.5999 11.2 3.5999H13.6C13.928 3.5999 14.2 3.8719 14.2 4.1999C14.2 4.5279 13.928 4.7999 13.6 4.7999Z"
                                    fill="#5682ED"
                                  ></path>
                                </svg> */}
                                <img src={agency4} />
                              </span>
                             {e?.job?.candidates?.length > 0 && e?.job?.candidates?.length + " Active Candidates"}
                            </li>
                            }
                            <li>
                              <span>
                                {/* <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 1.3999H4C1.6 1.3999 0 2.5999 0 5.3999V10.9999C0 13.7999 1.6 14.9999 4 14.9999H12C14.4 14.9999 16 13.7999 16 10.9999V5.3999C16 2.5999 14.4 1.3999 12 1.3999ZM4.8 12.7999H2.4C2.072 12.7999 1.8 12.5279 1.8 12.1999C1.8 11.8719 2.072 11.5999 2.4 11.5999H4.8C5.128 11.5999 5.4 11.8719 5.4 12.1999C5.4 12.5279 5.128 12.7999 4.8 12.7999ZM8 10.5999C6.67201 10.5999 5.6 9.5279 5.6 8.1999C5.6 6.8719 6.67201 5.7999 8 5.7999C9.328 5.7999 10.4 6.8719 10.4 8.1999C10.4 9.5279 9.328 10.5999 8 10.5999ZM13.6 4.7999H11.2C10.872 4.7999 10.6 4.5279 10.6 4.1999C10.6 3.8719 10.872 3.5999 11.2 3.5999H13.6C13.928 3.5999 14.2 3.8719 14.2 4.1999C14.2 4.5279 13.928 4.7999 13.6 4.7999Z"
                                    fill="#5682ED"
                                  ></path>
                                </svg> */}
                                <img src={agency5}/>
                              </span>
                             {e?.job?.must_have_skills.join(", ")}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default AgencyDashboard;
