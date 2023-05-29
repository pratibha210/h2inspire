import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { agencySelfJobAssignDeclne, jobslistByStatus } from "../../../api/api";
import "../../employer/EmployerDashboard.css";
import Loader from "@mui/material/CircularProgress";
import jobLoc from "../../../assets/imgs/jobLoc.svg";
import agency2 from "../../../assets/imgs/agency2.svg";
import agency3 from "../../../assets/imgs/agency3.svg";
import agency4 from "../../../assets/imgs/agency4.svg";
import agency5 from "../../../assets/imgs/agency5.svg";

function ArchiveJobs() {
  const [jobPostings, setJobPostings] = useState([]);
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const resp = await jobslistByStatus("3");
      console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.data?.error == false) {
        setJobPostings(resp?.data?.data);
        setFetching(false);
      }
      // ...
    }
    fetchData();
  }, [status, fetching]);

  function createMarkup(val) {
    return { __html: val };
  }

  console.log(jobPostings, "jobPostingsjobPostingsjobPostings");

  async function updateStatus(evt, status, id) {
    evt.preventDefault();
    console.log({ status, id });
    Swal.fire({
      title: "Do you want to close the position?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `Keep it open`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const resp = await agencySelfJobAssignDeclne({ status }, id);
        if (resp?.data?.error == false) {
          Toast.fire({
            icon: resp?.data?.error ? "error" : "success",
            title: resp?.data?.message,
          });
          setFetching(true);
        } else {
          Toast.fire({
            icon: resp?.response?.data?.error ? "error" : "success",
            title: resp?.response?.data?.message,
          });
        }
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

  return (
    <>
      {loading == true ? (
        <div className="contentLoader">
          <Loader className="contentLoaderAnimate" />
        </div>
      ) : (
        <>
          <div className="recent-jobsection">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="dash-heading"> All Archive Jobs</h3>
              {/* <div className="short">
                Sort By:
                <select
                  className="form-select"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={""}> All </option>
                  <option value={"1"}> Active </option>
                  <option value={"2"}> Closed </option>
                  <option value={"3"}> Drafts </option>
                </select>
              </div> */}
            </div>
            <ul className="job-list job-list__single">
              {jobPostings.length ? (
                jobPostings.map((e, i) => {
                  return (
                    <li key={i}>
                      <div className="job-box">
                        <div className="job-header">
                          {/* <div className="logo">
                            <img
                              src={e?.employer?.employer_image}
                              alt="Employer image"
                            />
                          </div> */}
                          <div className="job-company">
                            <h4>
                              {e?.job?.job_name}
                              <span className="text-muted">
                                <small>
                                  {e.status == "1" && "(Active)"}
                                  {e.status == "2" && "(Closed)"}
                                  {e.status == "3" && "(Draft)"}
                                </small>
                              </span>
                            </h4>
                            <div className="job-location">
                              <span>
                                <img src={jobLoc} />
                              </span>
                              <h5> {e?.job?.job_location.join(", ")} </h5>
                            </div>
                          </div>
                          {/* <div className="button-holder">
                            <Link
                              to={`/employer/job-posting?jobId=${e.job?._id}`}
                              className="light-btm blue-light m-3"
                            >
                              Edit
                            </Link>
                            <a
                              href="#"
                              className="light-btm red-light"
                              onClick={(evt) => updateStatus(evt, "2", e.job?._id)}
                            >
                              Close
                            </a>
                          </div> */}
                        </div>
                        <div className="job-content">
                          <h2>{e?.job?.designation}</h2>
                          {/* {e.job_description} */}
                          <div
                            dangerouslySetInnerHTML={createMarkup(
                              e?.job?.job_description
                            )}
                          />
                          <ul>
                            <li>
                              <span>
                                <img src={agency2} />
                              </span>
                              {moment(e.createdAt).fromNow()}
                            </li>
                            {e?.job?.hide_compensation == false && (
                              <li>
                                <span>
                                  <img src={agency3} />
                                </span>
                                {e?.job?.min_compensation} -{" "}
                                {e?.job?.max_compensation}{" "}
                                {e?.job?.compensation_type.toUpperCase()}
                              </li>
                            )}
                            <li>
                              <span>
                                <img src={agency4} />
                              </span>
                              {e?.job?.min_work_exp} - {e?.job?.max_work_exp}{" "}
                              years experience
                            </li>
                            <li>
                              <span>
                                <img src={agency5} />
                              </span>
                              {e?.job?.must_have_skills.join(", ")}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p>No Jobs found !!</p>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default ArchiveJobs;
