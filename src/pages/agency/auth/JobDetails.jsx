import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  agencySelfJobAssignDeclne,
  jobsDetails
} from "../../../api/api";
import "./jobdetails.css";
import Loader from "@mui/material/CircularProgress";
import queryString from "query-string";


function JobDetails() {
  const [jobPostings, setJobPostings] = useState({});
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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
  let url = location.search;
  let getCode = queryString.parse(url);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const resp = await jobsDetails(getCode?.id);
      if (resp?.data?.status == "401") {
        localStorage.clear();
        navigate("/");
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
  async function updateStatus(evt, status) {
    evt.preventDefault();
  
    if(status == "1"){
      Swal.fire({
        title: "Do you want to work on this job?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: `Keep it pending`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const resp = await agencySelfJobAssignDeclne({"status": status, "jobId": getCode?.id });
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
        }
        
        else if (result.isDenied) {
        }
      });
    }
    else{
    Swal.fire({
      title: "Do you want to decline the job?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `Keep it pending`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const resp = await agencySelfJobAssignDeclne({"status": status, "jobId": getCode?.id });
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
      }
      
      else if (result.isDenied) {
      }
    });
  }
  }

  return (
    <>
      {pageLoading == true ? (
        <div className="contentLoader">
          <Loader className="contentLoaderAnimate" />
        </div>
      ) : (
        <>
          <div className="recent-jobsection">
            
            <section class="listing-main">
    <div class="container">
        <div class="row g-4">
            <div class="col-12 col-md-9">
                <div class="listing-main-left">
                    <div class="listing-main-heading">
                        {/* <h4 class="listing-main-heading-txt">Job Title</h4> */}
                        <div class="job-designation">
                            <h2>{jobPostings?.job_name}</h2>
                        </div>
                    </div>


                    <div class="job-designation">
                        {/* <h5 class="listing-main-heading-txt">Job Description</h5> */}
                        <div class="job-listing-content">
                            <div class="job-listing-el">
                                <small>Job Designation: </small>
                                <p>{jobPostings?.designation}</p>
                            </div>

                            <div class="job-listing-el">
                                <small>Job Description: </small>
                                <div  dangerouslySetInnerHTML={createMarkup(
                              jobPostings?.job_description
                            )}></div>
                            </div>
                            <div class="job-listing-el">
                                <small>Job Location: </small>
                                <p>{jobPostings?.job_location.join(", ")}</p>
                            </div>
                           

                            
                        </div>
                    </div>


                    <div class="job-designation">
                        <h5 class="listing-main-heading-txt">Salary Information</h5>
                        <div class="job-listing-content">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="job-listing-el">
                                        <small>Min Work: </small>
                                        <p>{jobPostings?.min_work_exp} Years</p>
                                    </div>
        
                                    <div class="job-listing-el">
                                        <small>Max Work: </small>
                                        <p>{jobPostings?.max_work_exp} Years</p>
                                    </div>
                                    {jobPostings?.hide_compensation == false &&
                                    <> 
                                    <div class="job-listing-el">
                                        <small>Min Compensation: </small>
                                        <p>{jobPostings?.min_compensation} {jobPostings?.compensation_type.toUpperCase()}</p>
                                    </div>
        
                                    <div class="job-listing-el">
                                        <small>Max Compensation: </small>
                                        <p>{jobPostings?.max_compensation} {jobPostings?.compensation_type.toUpperCase()}</p>
                                    </div>
                                    </>}
                                </div>
    
                                <div class="col-12 col-md-6">
                                    <div class="job-listing-el">
                                        <small>Peack & Benefits: </small>
                                        <p>{jobPostings?.perk_and_benefits.join(", ") }</p>
                                    </div>
        
                                    <div class="job-listing-el">
                                        <small>Budget: </small>
                                        <p>{jobPostings?.budget}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="job-designation">
                        <h5 class="listing-main-heading-txt">Skill Information</h5>
                        <div class="job-listing-content">
                            <div class="job-listing-el">
                                <small>Must Have Skills: </small>
                                <ul class="list-unstyled p-0 m-0">
                                    <li><p>{jobPostings?.must_have_skills.join(", ")}</p></li>
                                   
                                </ul>
                            </div>

                            <div class="job-listing-el">
                                <small>Good To Have Skills: </small>
                                <ul class="list-unstyled p-0 m-0">
                                    <li><p>{jobPostings?.good_to_have_skills.join(", ")}</p></li>
                                   
                                </ul>
                            </div>

                        </div>
                    </div>


                    <div class="job-designation">
                        <h5 class="listing-main-heading-txt">Edutional Information</h5>
                        <div class="job-listing-content">
                            <div class="job-listing-el">
                                <small>Educational Qualification: </small>
                                <ul class="list-unstyled p-0 m-0">
                                    <li><p>{jobPostings?.educational_qualification.join(", ")}</p></li>
                                  
                                </ul>
                            </div>

                            <div class="job-listing-el">
                                <small>Industries Use: </small>
                                <ul class="list-unstyled p-0 m-0">
                                    <li><p>{jobPostings?.industry.join(", ")}</p></li>
                                   
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div class="job-designation">
                        <h5 class="listing-main-heading-txt">Interview Information</h5>
                        <div class="job-listing-content">
                            <div class="job-listing-el">
                                <small>Interview steps: </small>
                                <ul class="list-unstyled p-0 m-0">
                                    <li><p>{jobPostings?.interview_steps.join(", ")}</p></li>
                                   
                                </ul>
                            </div>

                            <div class="job-listing-el">
                                <small>Screeing questions: </small>
                                <ul class="list-unstyled p-0 m-0">
                                {jobPostings?.screeing_questions?.length > 0 && 
                                jobPostings?.screeing_questions?.map((x,i)=>{
                                  return(

                                    <li><p>{i+1}. {x}</p></li>
                                  )
                                })}
                                   
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div class="col-12 col-md-3 text-center">
                <div class="listing-main-btns">
                    <a href="javascript:void(0)" class="word-btm-disable" onClick={(evt) => updateStatus(evt, "1")}>work on</a>

                    <a href="javascript:void(0)" class="button-style dark-blue-button" onClick={(evt) => updateStatus(evt, "2")}>Decline</a>
                </div>
            </div>
        </div>
    </div>
</section>

          </div>
        </>
      )}
    </>
  );
}

export default JobDetails;
