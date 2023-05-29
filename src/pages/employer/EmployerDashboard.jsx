import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { allJobPostingsByEmployer } from "../../api/api";
import "./EmployerDashboard.css";
import Loader from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import work from "../../assets/imgs/work.svg";
import jobs from "../../assets/imgs/jobs.svg";
import declined from "../../assets/imgs/declined.svg";
import jobLoc from "../../assets/imgs/jobLoc.svg";
import jobContent from "../../assets/imgs/jobContent.svg";
import jobContent2 from "../../assets/imgs/jobContent2.svg";
import jobContent3 from "../../assets/imgs/jobContent3.svg";
import jobContent4 from "../../assets/imgs/jobContent4.svg";

function EmployerDashboard() {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  // useEffect(()=>{
  //     setTimeout(()=>{
  //         setLoading(false)
  //     },5000)
  // },[])

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      // You can await here
      const resp = await allJobPostingsByEmployer();
      console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.response?.status == 500) {
        localStorage.clear();
        navigate("/");
      }
      if (resp?.data?.error == false) {
        setLoading(false);
        setJobPostings(resp?.data?.data);
      }
      // ...
    }
    fetchData();
  }, []);

  function createMarkup(val) {
    return { __html: val };
  }

  // console.log("jobPostings >>>>>>>> ", jobPostings);
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
                  <img src={work} />
                </div>
                <h3>Total no of jobs posted</h3>
                <span className="count">{jobPostings.length}</span>
              </div>
            </li>
            <li>
              <div className="dash-box">
                <div className="icon">
                  <img src={jobs} />
                </div>
                <h3>No of open jobs</h3>
                <span className="count">
                  {jobPostings.filter((e) => e.status == "1").length}
                </span>
              </div>
            </li>
            <li>
              <div className="dash-box">
                <div className="icon">
                  <img src={declined} />
                </div>
                <h3>No of closed jobs</h3>
                <span className="count">
                  {jobPostings.filter((e) => e.status == "2").length}
                </span>
              </div>
            </li>
            <li>
              <div className="dash-box">
                <div className="icon">
                  <img src={declined} />
                </div>
                <h3>No of draft jobs</h3>
                <span className="count">
                  {jobPostings.filter((e) => e.status == "3").length}
                </span>
              </div>
            </li>
          </ul>
          <div className="recent-jobsection">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="dash-heading">Latest open jobs</h3>
              {/* <div className="short">
                        Sort By:
                        <select className="form-select">
                            <option>Select Matched</option>
                            <option>Recently Matched</option>
                            <option>Recently Matched</option>
                            <option>Recently Matched</option>
                        </select> 
                    </div> */}
            </div>
            <ul className="job-list job-list__single">
              {jobPostings.length ? (
                jobPostings
                  .filter((e) => e.status == "1")
                  .map((e, i) => {
                    return (
                      <li key={i}>
                        <div className="job-box">
                          <div className="job-header">
                            <div className="logo">
                              <img
                                src={e?.employer?.employer_image}
                                alt="Employer image"
                              />
                            </div>
                            <div className="job-company">
                              <h4>{e.job_name}</h4>
                              <div className="job-location">
                                <span>

                                  <img src={jobLoc} alt="job location" />
                                </span>
                                <h5>{e.job_location.join(", ")}</h5>
                              </div>
                            </div>
                            <div className="button-holder">
                              {/* <a href="#" className="light-btm blue-light m-3">Edit</a>
                                                <a href="#" className="light-btm red-light">Close</a> */}
                            </div>
                          </div>
                          <div className="job-content">
                            <h2>{e.designation}</h2>
                            {/* {e.job_description} */}
                            <div
                              dangerouslySetInnerHTML={createMarkup(
                                e.job_description
                              )}
                            />
                            <ul>
                              <li>
                                <span>
                                 
                                  <img src={jobContent} alt="job-content" />
                                </span>
                                {moment(e.createdAt).fromNow()}
                              </li>
                              {e.hide_compensation &&
                              e.hide_compensation == true ? (
                                <>{null}</>
                              ) : (
                                <li>
                                  <span>
                                   
                                    <img src={jobContent2} alt="job-content2" />
                                  </span>
                                  {e.min_compensation} - {e.max_compensation}{" "}
                                  {e?.compensation_type.toUpperCase()}
                                </li>
                              )}
                              <li>
                                <span>
                               
                                  <img src={jobContent3} alt="job-content3" />
                                </span>
                                {e.min_work_exp} - {e.max_work_exp} years
                                experience
                              </li>
                              <li>
                                <span>
                                  
                                  <img src={jobContent4} alt="job-content4" />
                                </span>
                                {e.must_have_skills.join(", ")}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    );
                  })
              ) : (
                <p>No data found !!</p>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default EmployerDashboard;
