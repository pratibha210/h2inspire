import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  agencySelfJobAssignDeclne,
  jobslistByStatus,
  uploadResume,

} from "../../../api/api";
import "../../employer/EmployerDashboard.css";
import Loader from "@mui/material/CircularProgress";
import chat from "../../../assets/imgs/chat.svg";
import iconimg from "../../../assets/imgs/icon.png";
import dropdownsamll from "../../../assets/imgs/dropdown-small.svg";
import lockIcon from "../../../assets/imgs/lock.svg";
import jobLoc from "../../../assets/imgs/jobLoc.svg";
import agency2 from "../../../assets/imgs/agency2.svg";
import agency3 from "../../../assets/imgs/agency3.svg";
import agency4 from "../../../assets/imgs/agency4.svg";
import agency5 from "../../../assets/imgs/agency5.svg";
import profile1 from "../../../assets/imgs/profile.svg";
function WorkingonJobsPage() {
  const [jobPostings, setJobPostings] = useState([]);
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
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
      const resp = await jobslistByStatus("1");
      console.log("resp  >>>>>>>>>> ", resp);
      if (resp?.response?.status == 401) {
        localStorage.clear();
        navigate("/")
      }
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

  // console.log(jobPostings,"jobPostingsjobPostingsjobPostings");

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
  const [selectedFile, setSelectedFile] = useState("");

  const onFileChange = (event, id) => {
    onFileUpload(event.target.files[0], id);
  };

  // On file upload (click the upload button)
  const onFileUpload = async (data, id) => {
    console.log(data, "data");
    const formData = new FormData();
    formData.append("resume", data);
    console.log(data);
    await uploadResume(formData, id)
      .then((resp) => {
        const { data } = resp;

        if (resp?.data?.error == false) {
          Toast.fire({
            icon: resp?.data?.error ? "error" : "success",
            title: resp?.data?.message,
          });
          setFetching(true);
          setSelectedFile(data.name);
        } else {
          Toast.fire({
            icon: resp?.response?.data?.error ? "error" : "success",
            title: resp?.response?.data?.message,
          });

        }
      })
      .catch((err) => {
        console.log(err, "err");
      });

  };
  // Function will execute on click of button
  const onButtonClick = (data) => {
    // using Java Script method to get PDF file
    console.log("data >>> ", data);
    fetch(data, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `FileName.pdf`,
        );
        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
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
              <h3 className="dash-heading">
                All Working on Jobs
              </h3>

            </div>

            <ul class="working-list">
              {jobPostings.length ? (
                jobPostings.map((e, i) => {
                  return (

                    <li key={i}>
                      <div class="working-box">
                        <div class="box-header">
                          <div class="profile-details-header">
                            <div class="logo">
                              <img src={iconimg} />
                            </div>
                            <div class="job-company">
                              <h4 class="job-title">{e?.job?.job_name}</h4>
                              <div class="job-location">
                                <div class="company-name">{e?.job?.designation}</div>
                                <span>
                                  <img src={jobLoc} alt="job location" />
                                </span>
                                <h5>{e?.job?.job_location.join(", ")}</h5>
                              </div>
                            </div>
                          </div>
                          <div class="other-details">
                            {/* <a href="#" class="noticication icon-box">
                                                <img class="off" src={notificationimg}/>
                                            </a> */}
                            <ul class="info-list">
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
                                  {e?.job?.min_compensation} - {e?.job?.max_compensation}{" "}
                                  {e?.job?.compensation_type.toUpperCase()}
                                </li>
                              )}
                              <li>
                                <span>
                                  <img src={agency4} />
                                </span>

                                {e?.job?.must_have_skills.join(", ")}
                              </li>
                            </ul>
                            <p onClick={() => navigate("/agency/submit-candidate?id=" + e?._id + "&jobId=" + e?.job?._id)} class="word-btm-disable"><span> <img src={lockIcon} /></span>Submit</p>
                            {/* <a href="#" class="message">
                                                <img src={chat}/>
                                            </a> */}
                          </div>
                        </div>
                        {e?.candidates?.length > 0 &&
                          <div class="box-bottom">
                            <div class="view-candate collapsed" data-bs-toggle="collapse" data-bs-target={'#Demo' + i} >View My {e?.candidates?.length}  Candidates <span><img src={dropdownsamll} /></span></div>

                            <div id={'Demo' + i} class="candidate-box collapse">
                              <ul class="candidate-list">
                                {e?.candidates?.map((item) => {
                                  return (


                                    <li>
                                      <div class="box">
                                        <div class="profile-details-header">
                                          <div class="logo">
                                            <img src={profile1} />
                                          </div>
                                          <div class="job-company">
                                            <a href="" class="job-title">{item?.fname} {item?.lname}</a>
                                            <div class="job-location">
                                              <h5>Restored {moment(item?.createdAt).format("MMM DD, YYYY")}</h5>
                                            </div>
                                          </div>
                                          <div class="review">
                                            <a href={item?.resume} download="resume.pdf" target="_blank">Review</a>

                                            <div className="icon-list">
                                              <p onClick={() => navigate("/agency/candidate-chat?id=" + item?._id)}>
                                                <img src={chat} />
                                              </p>

                                              <p className="upload-design">
                                                <input accept="application/pdf" defaultValue={selectedFile} type="file" onChange={(e) => onFileChange(e, item?._id)} />
                                                <i class="fa-solid fa-upload"></i>
                                              </p>

                                              {/* <p onClick={()=>onButtonClick(item?.resume)}>
                                                                  <i class="fa-solid fa-download"></i>
                                                                  </p> */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                        }
                      </div>
                    </li>

                  )
                })) : (
                <p>No Jobs found !!</p>
              )}

            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default WorkingonJobsPage;
