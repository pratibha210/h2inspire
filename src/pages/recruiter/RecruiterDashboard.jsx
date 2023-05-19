import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  agencySelfJobAssignDeclne,
  jobslistByStatus,
  uploadResume
} from "../../api/api";
import "../employer/EmployerDashboard.css";
import Loader from "@mui/material/CircularProgress";
import chat from "../../assets/imgs/chat.svg";
import notificationimg from "../../assets/imgs/notification-on.svg";
import iconimg from "../../assets/imgs/icon.png";
import dropdownsamll from "../../assets/imgs/dropdown-small.svg";
import lockIcon from "../../assets/imgs/lock.svg";
function RecruiterDashboard() {
  const [jobPostings, setJobPostings] = useState([]);
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
const navigate = useNavigate();
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
      if(resp?.response?.status == 401){
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

  const onFileChange = (event,id) => {
    onFileUpload(event.target.files[0],id);
  };

  // On file upload (click the upload button)
  const onFileUpload = async (data,id) => {
    console.log(data, "data");
    const formData = new FormData();
    formData.append("resume", data);
    console.log(data);
    await uploadResume(formData,id)
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
                                                <img src={iconimg}/>
                                            </div>
                                            <div class="job-company">
                                                <h4 class="job-title">{e?.job?.job_name}</h4>
                                                <div class="job-location">
                                                    <div class="company-name">{e?.job?.designation}</div>
                                                    <span>
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14.75 7.5C14.75 9.72306 13.2968 11.9167 11.649 13.656C10.8456 14.504 10.0388 15.1992 9.43176 15.6826C9.27222 15.8096 9.12703 15.9216 9 16.0174C8.87297 15.9216 8.72778 15.8096 8.56824 15.6826C7.96117 15.1992 7.15436 14.504 6.35095 13.656C4.70324 11.9167 3.25 9.72306 3.25 7.5C3.25 5.97501 3.8558 4.51247 4.93414 3.43414C6.01247 2.3558 7.47501 1.75 9 1.75C10.525 1.75 11.9875 2.3558 13.0659 3.43414C14.1442 4.51247 14.75 5.97501 14.75 7.5Z" stroke="#FFB800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M10.25 7.5C10.25 8.19036 9.69036 8.75 9 8.75C8.30964 8.75 7.75 8.19036 7.75 7.5C7.75 6.80964 8.30964 6.25 9 6.25C9.69036 6.25 10.25 6.80964 10.25 7.5Z" stroke="#FFB800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>  
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
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8 16C12.4172 16 16 12.4172 16 8C16 3.58285 12.4172 0 8 0C3.58285 0 0 3.58285 0 8C0 12.4172 3.58285 16 8 16ZM7.42855 3.42858C7.42855 3.11428 7.6857 2.85713 8 2.85713C8.3143 2.85713 8.57145 3.11428 8.57145 3.42858V7.72572L11.2143 9.84001C11.46 10.0372 11.5 10.3971 11.3029 10.6429C11.1914 10.7829 11.0257 10.8571 10.8571 10.8571C10.7314 10.8571 10.6057 10.8171 10.5 10.7314L7.64288 8.44573C7.50859 8.33714 7.4286 8.1743 7.4286 8V3.42858H7.42855Z" fill="#5682ED"></path>
                                                        </svg>                                                        
                                                    </span>
                                                    {moment(e.createdAt).fromNow()}
                                                </li>
                                                {e?.job?.hide_compensation == false && (
                                                <li>
                                                    <span>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 1.3999H4C1.6 1.3999 0 2.5999 0 5.3999V10.9999C0 13.7999 1.6 14.9999 4 14.9999H12C14.4 14.9999 16 13.7999 16 10.9999V5.3999C16 2.5999 14.4 1.3999 12 1.3999ZM4.8 12.7999H2.4C2.072 12.7999 1.8 12.5279 1.8 12.1999C1.8 11.8719 2.072 11.5999 2.4 11.5999H4.8C5.128 11.5999 5.4 11.8719 5.4 12.1999C5.4 12.5279 5.128 12.7999 4.8 12.7999ZM8 10.5999C6.67201 10.5999 5.6 9.5279 5.6 8.1999C5.6 6.8719 6.67201 5.7999 8 5.7999C9.328 5.7999 10.4 6.8719 10.4 8.1999C10.4 9.5279 9.328 10.5999 8 10.5999ZM13.6 4.7999H11.2C10.872 4.7999 10.6 4.5279 10.6 4.1999C10.6 3.8719 10.872 3.5999 11.2 3.5999H13.6C13.928 3.5999 14.2 3.8719 14.2 4.1999C14.2 4.5279 13.928 4.7999 13.6 4.7999Z" fill="#5682ED"></path>
                                                        </svg>                                                         
                                                    </span>
                                                    {e?.job?.min_compensation} - {e?.job?.max_compensation}{" "}
                                                    {e?.job?.compensation_type.toUpperCase()}
                                                </li>
                                                )}
                                                <li>
                                  <span>
                                    <svg
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
                                    </svg>
                                  </span>
                                 
                                  {e?.job?.must_have_skills.join(", ")}
                                </li>
                                            </ul>
                                            <p onClick={()=> navigate("/recruiter/candidate-form?id="+e?._id+"&jobId="+e?.job?._id)}  class="word-btm-disable"><span> <img src={lockIcon}/></span>Submit</p>
                                            {/* <a href="#" class="message">
                                                <img src={chat}/>
                                            </a> */}
                                        </div>
                                    </div>
                                    {e?.candidates?.length > 0 &&
                                    <div class="box-bottom">
                                        <div class="view-candate collapsed" data-bs-toggle="collapse" data-bs-target={'#Demo'+i} >View My {e?.candidates?.length} Candidates <span><img src={dropdownsamll}/></span></div>

                                        <div id={'Demo'+i} class="candidate-box collapse">
                                            <ul class="candidate-list">
                                            {e?.candidates?.map((item)=>{
                                              return(

                                             
                                                <li>
                                                    <div class="box">
                                                        <div class="profile-details-header">
                                                            <div class="logo">
                                                            <img src="/src/assets/imgs/profile.svg" />
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
                                                                  <p onClick={()=> navigate("/recruiter/candidate-chat?id="+item?._id)}>
                                                                      <img src={chat}/>
                                                                  </p>
                                                                  <p className="upload-design">
                                                                  <input accept="application/pdf" defaultValue={selectedFile} type="file" onChange={(e)=>onFileChange(e,item?._id)}/>
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

                            )})) : (
                <p>No Jobs found !!</p>
                )}
            
                        </ul>
          </div>
        </>
      )}
    </>
  );
}

export default RecruiterDashboard;
