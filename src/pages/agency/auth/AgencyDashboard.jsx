import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@mui/material/CircularProgress";
import { agencyAccountDetails, agenciesDashboardData } from "../../../api/api";
import moment from "moment-timezone";
import Swal from "sweetalert2";
import "./agencydashboard.css";
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
        setTimeout(()=>{
          setLoading(false);
        },5000);
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
        setTimeout(()=>{
          setLoading(false);
        },5000);
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
    // setTimeout(() => {
      agencyDetailsFunction();
      getAgencyDashboardFunction();
    
    // }, 5000);
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
                <h3>No of Active Jobs</h3>
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
                      <div className="job-box dash-job-box">
                        <div className="job-box-header">
                          <div className="logo">
                            <img src={icon1} />
                          </div>
                          <div className="job-company">
                            <h4>{e?.job?.job_name}</h4>
                            <div className="job-location">
                              <span>
                           
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
                                
                                  <img src={agency3} />
                                </span>
                                {e?.job?.min_compensation} - {e?.job?.max_compensation}{" "}
                                {e?.job?.compensation_type.toUpperCase()}
                              </li>
                            )}
                            {e?.job?.candidates?.length > 0 && 
                            <li>
                              <span>
                                
                                <img src={agency4} />
                              </span>
                             {e?.job?.candidates?.length > 0 && e?.job?.candidates?.length + " Active Candidates"}
                            </li>
                            }
                            <li>
                              <span>
                              
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
